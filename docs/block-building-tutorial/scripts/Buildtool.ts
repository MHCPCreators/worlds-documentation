import {
  Component,
  PropTypes,
  Entity,
  Player,
  Quaternion,
  Vec3,
  CodeBlockEvents,
  LocalEvent,
  NetworkEvent,
  TextGizmo,
  RaycastGizmo,
  GrabbableEntity,
  AttachableEntity,
  AttachablePlayerAnchor,
  AudioGizmo,
  PlayerDeviceType,
  HapticStrength,
  HapticSharpness,
} from 'horizon/core';
import LocalCamera from 'horizon/camera';

// --- Event Definitions ---
const requestPlayerIdEvent = new NetworkEvent<{ requester: Entity }>('requestPlayerId');
const assignPlayerIdEvent = new NetworkEvent<{ index: number }>('assignPlayerId');
const assignToolToPlayerEvent = new NetworkEvent<{ player: Player }>('assignToolToPlayer');
const requestBlockSpawnEvent = new NetworkEvent<{ position: Vec3; rotation: Quaternion; index: number }>('requestBlockSpawn');
const requestBlockMineEvent = new NetworkEvent<{ position: Vec3 }>('requestBlockMine');

const cycleBlockForwardEvent = new LocalEvent<{ player: Player }>('cycleBlockForward');
const cycleBlockBackwardEvent = new LocalEvent<{ player: Player }>('cycleBlockBackward');
const initiateMineEvent = new LocalEvent<{}>('initiateMine');
const updatePlacementPreviewEvent = new LocalEvent<{}>('updatePlacementPreview');
const placeBlockEvent = new LocalEvent<{}>('placeBlock');
const playPrimaryHapticsEvent = new LocalEvent<{}>('playPrimaryHaptics');
const playSecondaryHapticsEvent = new LocalEvent<{}>('playSecondaryHaptics');

const selectedBlockChangedEvent = new NetworkEvent<{ player: Player; blockName: string }>('selectedBlockChanged');
const toolHoldStateChangedEvent = new NetworkEvent<{ player: Player; isHolding: boolean }>('toolHoldStateChanged');

class BuildToolComponent extends Component<typeof BuildToolComponent> {
  static propsDefinition = {
    playerSpawnPoint: { type: PropTypes.Entity },
    blockAssetNames: { type: PropTypes.StringArray, default: [] },
    playerIdAssigner: { type: PropTypes.Entity },
    blockAssetManager: { type: PropTypes.Entity },
    changeBlockSound: { type: PropTypes.Entity },
    cycleBlockForwardTrigger: { type: PropTypes.Entity },
    cycleBlockBackwardTrigger: { type: PropTypes.Entity },
    raycastGizmo: { type: PropTypes.Entity },
    blockNameDisplay: { type: PropTypes.Entity },
    placementOutline: { type: PropTypes.Entity },
    aimingLaser: { type: PropTypes.Entity },
    raycastHitMarker: { type: PropTypes.Entity },
  };

  private placementRotation: Quaternion = Quaternion.one;
  private isTriggerHeld = false;
  private isInsideBlock = false;
  private selectedBlockIndex = 0;
  private initialRotation: Quaternion = Quaternion.one;
  private initialPosition: Vec3 = Vec3.zero;
  private assignedPlayerId = 0;
  private assignedPlayer: Player | null = null;
  private isHeldInRightHand = false;
  private placementPosition: Vec3 = Vec3.zero;

  override preStart() {
    // Local Event Connections
    this.connectLocalEvent(this.entity, cycleBlockForwardEvent, (data) => this.handleCycleBlockForward(data.player));
    this.connectLocalEvent(this.entity, cycleBlockBackwardEvent, (data) => this.handleCycleBlockBackward(data.player));
    this.connectLocalEvent(this.entity, initiateMineEvent, () => this.mineBlock());
    this.connectLocalEvent(this.entity, updatePlacementPreviewEvent, () => this.updatePlacementPreview());
    this.connectLocalEvent(this.entity, placeBlockEvent, () => this.placeBlock());
    this.connectLocalEvent(this.entity, playPrimaryHapticsEvent, () => this.playPrimaryHaptics());
    this.connectLocalEvent(this.entity, playSecondaryHapticsEvent, () => this.playSecondaryHaptics());

    // Network Event Connections
    this.connectNetworkEvent(this.entity, assignPlayerIdEvent, (data) => this.handleAssignPlayerId(data.index));
    this.connectNetworkEvent(this.entity, assignToolToPlayerEvent, (data) => this.handleAssignToolToPlayer(data.player));

    // CodeBlock Event Connections
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerEnterWorld, (player) => this.handlePlayerEnterWorld(player));
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerExitWorld, (player) => this.handlePlayerExitWorld(player));
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnGrabStart, (isRight, player) => this.handleToolGrab(isRight, player));
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnGrabEnd, (player) => this.handleToolDrop(player));
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnIndexTriggerDown, (player) => this.handleTriggerPress(player));
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnIndexTriggerUp, (player) => this.handleTriggerRelease(player));
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnButton1Down, (player) => this.handleCycleForwardInput(player));
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnButton2Down, (player) => this.handleMineInput(player));
  }

  override start() {
    if (this.props.playerIdAssigner) {
      this.sendNetworkEvent(this.props.playerIdAssigner, requestPlayerIdEvent, { requester: this.entity });
    }
    if (this.props.cycleBlockBackwardTrigger) {
      this.connectCodeBlockEvent(this.props.cycleBlockBackwardTrigger, CodeBlockEvents.OnPlayerEnterTrigger, (player) =>
        this.sendLocalEvent(this.entity, cycleBlockBackwardEvent, { player }),
      );
    }
    if (this.props.cycleBlockForwardTrigger) {
      this.connectCodeBlockEvent(this.props.cycleBlockForwardTrigger, CodeBlockEvents.OnPlayerEnterTrigger, (player) =>
        this.sendLocalEvent(this.entity, cycleBlockForwardEvent, { player }),
      );
    }

    this.initialPosition = this.entity.position.get();
    this.initialRotation = this.entity.rotation.get();
    this.updateBlockNameDisplay();
    this.props.aimingLaser?.visible.set(false);
    this.props.raycastHitMarker?.visible.set(false);
  }

  private handleAssignPlayerId(id: number) {
    this.assignedPlayerId = id;
  }

  private handleToolGrab(isRight: boolean, player: Player) {
    this.isHeldInRightHand = isRight;
    this.sendNetworkBroadcastEvent(toolHoldStateChangedEvent, { player, isHolding: true });
    this.sendNetworkBroadcastEvent(selectedBlockChangedEvent, { player, blockName: this.props.blockAssetNames[this.selectedBlockIndex] });
  }

  private handleToolDrop(player: Player) {
    this.sendNetworkBroadcastEvent(toolHoldStateChangedEvent, { player, isHolding: false });
    this.isTriggerHeld = false;
    this.props.placementOutline?.visible.set(false);
    this.props.aimingLaser?.visible.set(false);
    this.props.raycastHitMarker?.visible.set(false);
    this.entity.as(AttachableEntity)?.attachToPlayer(player, AttachablePlayerAnchor.Torso);
  }

  private handleTriggerPress(player: Player) {
    if (player.deviceType.get() !== PlayerDeviceType.VR) {
      const raycastGizmo = this.props.raycastGizmo?.as(RaycastGizmo);
      if (raycastGizmo) {
        const hit = raycastGizmo.raycast(LocalCamera.position.get(), LocalCamera.forward.get());
        if (!hit) {
          LocalCamera.setCameraModeFirstPerson();
        }
      }
    }
    this.isTriggerHeld = true;
    this.props.placementOutline?.visible.set(true);
    this.props.aimingLaser?.visible.set(true);
    this.sendLocalEvent(this.entity, updatePlacementPreviewEvent, {});
  }

  private handleTriggerRelease(player: Player) {
    if (player.deviceType.get() !== PlayerDeviceType.VR) {
      LocalCamera.setCameraModeThirdPerson();
    }
    this.props.placementOutline?.visible.set(false);
    this.props.aimingLaser?.visible.set(false);
    this.props.raycastHitMarker?.visible.set(false);
    this.isTriggerHeld = false;
    if (!this.isInsideBlock) {
      this.sendLocalEvent(this.entity, placeBlockEvent, {});
    }
  }

  private handleCycleForwardInput(player: Player) {
    this.sendLocalEvent(this.entity, cycleBlockForwardEvent, { player });
  }

  private handleMineInput(player: Player) {
    this.sendLocalEvent(this.entity, initiateMineEvent, {});
  }

  private handlePlayerEnterWorld(player: Player) {
    this.async.setTimeout(() => this.sendNetworkEvent(this.entity, assignToolToPlayerEvent, { player }), 1000);
  }

  private handlePlayerExitWorld(player: Player) {
    if (this.assignedPlayer && player.id === this.assignedPlayer.id) {
      this.entity.as(GrabbableEntity)?.setWhoCanGrab([]);
      this.entity.position.set(this.initialPosition);
      this.entity.rotation.set(this.initialRotation);
      this.assignedPlayer = null;
    }
  }

  private handleAssignToolToPlayer(player: Player) {
    if (player.index.get() === this.assignedPlayerId) {
      this.assignedPlayer = player;
      this.entity.as(GrabbableEntity)?.setWhoCanGrab([player]);
      this.entity.as(AttachableEntity)?.attachToPlayer(player, AttachablePlayerAnchor.Torso);
    }
  }

  private handleCycleBlockForward(player: Player) {
    if (this.entity.owner.get().id !== player.id) return;
    this.selectedBlockIndex = (this.selectedBlockIndex + 1) % this.props.blockAssetNames.length;
    this.sendLocalEvent(this.entity, playSecondaryHapticsEvent, {});
    this.updateBlockNameDisplay();
    this.sendNetworkBroadcastEvent(selectedBlockChangedEvent, { player, blockName: this.props.blockAssetNames[this.selectedBlockIndex] });
  }

  private handleCycleBlockBackward(player: Player) {
    if (this.entity.owner.get().id !== player.id) return;
    this.selectedBlockIndex = (this.selectedBlockIndex - 1 + this.props.blockAssetNames.length) % this.props.blockAssetNames.length;
    this.sendLocalEvent(this.entity, playSecondaryHapticsEvent, {});
    this.updateBlockNameDisplay();
    this.sendNetworkBroadcastEvent(selectedBlockChangedEvent, { player, blockName: this.props.blockAssetNames[this.selectedBlockIndex] });
  }

  private getAimRaycastSource(): { origin: Vec3; direction: Vec3 } | null {
    if (!this.assignedPlayer) return null;
    const deviceType = this.assignedPlayer.deviceType.get();
    return deviceType === PlayerDeviceType.VR
      ? { origin: this.entity.position.get(), direction: this.entity.forward.get() }
      : { origin: LocalCamera.position.get(), direction: LocalCamera.forward.get() };
  }

  private mineBlock() {
    const raycastGizmo = this.props.raycastGizmo?.as(RaycastGizmo);
    if (!raycastGizmo) return;
    const source = this.getAimRaycastSource();
    if (!source) return;

    const hit = raycastGizmo.raycast(source.origin, source.direction, { maxDistance: 5 });
    if (hit) {
      const position = hit.hitPoint.sub(hit.normal.mul(0.5));
      const snappedPosition = this.snapPositionToGrid(position, 1.0);
      if (this.props.blockAssetManager) {
        this.sendNetworkEvent(this.props.blockAssetManager, requestBlockMineEvent, { position: snappedPosition });
      }
    }
  }

  private updatePlacementPreview() {
    if (!this.isTriggerHeld || !this.assignedPlayer) return;

    const raycastGizmo = this.props.raycastGizmo?.as(RaycastGizmo);
    if (!raycastGizmo) return;
    const source = this.getAimRaycastSource();
    if (!source) return;

    const hit = raycastGizmo.raycast(source.origin, source.direction, { maxDistance: 50 });
    if (hit) {
      this.placementPosition = this.snapPositionToGrid(hit.hitPoint.add(hit.normal.mul(0.5)), 1.0);
      this.props.placementOutline?.position.set(this.placementPosition);
      this.isInsideBlock = this.assignedPlayer.position.get().distance(this.placementPosition) < 0.45;
      this.updateAimingLaser(source.origin, hit.hitPoint);
      if (this.props.raycastHitMarker) {
        this.props.raycastHitMarker.position.set(hit.hitPoint);
        this.props.raycastHitMarker.visible.set(true);
      }
    } else {
      const endPoint = source.origin.add(source.direction.mul(5));
      this.placementPosition = this.snapPositionToGrid(source.origin.add(source.direction.mul(2.5)), 1.0);
      this.props.placementOutline?.position.set(this.placementPosition);
      this.isInsideBlock = false;
      this.updateAimingLaser(source.origin, endPoint);
      this.props.raycastHitMarker?.visible.set(false);
    }

    this.async.setTimeout(() => this.updatePlacementPreview(), 100);
  }

  private updateAimingLaser(start: Vec3, end: Vec3) {
    if (!this.props.aimingLaser) return;
    const laserEntity = this.props.aimingLaser;
    const distance = start.distance(end);
    laserEntity.position.set(Vec3.lerp(start, end, 0.5));
    const laserScale = laserEntity.scale.get();
    laserScale.y = distance;
    laserEntity.scale.set(laserScale);
    if (distance > 0.01) {
      laserEntity.rotation.set(Quaternion.lookRotation(end.sub(start).normalize(), Vec3.up));
    }
  }

  private placeBlock() {
    const toolForward = this.entity.forward.get();
    const toolUp = this.entity.up.get();
    const fwdX = Math.abs(toolForward.x),
      fwdY = Math.abs(toolForward.y),
      fwdZ = Math.abs(toolForward.z);
    const upX = Math.abs(toolUp.x),
      upY = Math.abs(toolUp.y),
      upZ = Math.abs(toolUp.z);

    const newForward =
      fwdX > fwdY && fwdX > fwdZ
        ? new Vec3(Math.sign(toolForward.x), 0, 0)
        : fwdY > fwdZ
        ? new Vec3(0, Math.sign(toolForward.y), 0)
        : new Vec3(0, 0, Math.sign(toolForward.z));
    const newUp =
      upX > upY && upX > upZ
        ? new Vec3(Math.sign(toolUp.x), 0, 0)
        : upY > upZ
        ? new Vec3(0, Math.sign(toolUp.y), 0)
        : new Vec3(0, 0, Math.sign(toolUp.z));

    this.placementRotation = Quaternion.lookRotation(newForward, newUp);

    if (this.props.playerSpawnPoint && this.placementPosition.distance(this.props.playerSpawnPoint.position.get()) > 5) {
      if (this.props.blockAssetManager) {
        this.sendNetworkEvent(this.props.blockAssetManager, requestBlockSpawnEvent, {
          position: this.placementPosition,
          rotation: this.placementRotation,
          index: this.selectedBlockIndex,
        });
      }
    }
  }

  private playPrimaryHaptics() {
    const hand = this.isHeldInRightHand ? this.assignedPlayer?.rightHand : this.assignedPlayer?.leftHand;
    hand?.playHaptics(0.1, HapticStrength.Medium, HapticSharpness.Sharp);
  }

  private playSecondaryHaptics() {
    this.props.changeBlockSound?.as(AudioGizmo)?.play();
    const hand = !this.isHeldInRightHand ? this.assignedPlayer?.rightHand : this.assignedPlayer?.leftHand;
    hand?.playHaptics(0.1, HapticStrength.Light, HapticSharpness.Coarse);
  }

  private updateBlockNameDisplay() {
    const blockName = this.props.blockAssetNames[this.selectedBlockIndex] || 'None';
    this.props.blockNameDisplay?.as(TextGizmo)?.text.set(blockName);
  }

  private snapPositionToGrid(position: Vec3, gridSize: number): Vec3 {
    return new Vec3(
      Math.round(position.x / gridSize) * gridSize,
      Math.round(position.y / gridSize) * gridSize,
      Math.round(position.z / gridSize) * gridSize,
    );
  }
}

Component.register(BuildToolComponent);
