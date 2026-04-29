import { Component, PropTypes, Entity, Asset, Vec3, Quaternion, NetworkEvent, AudioGizmo, ParticleGizmo } from 'horizon/core';

// Event definitions used for communication with other components
const requestBlockMineEvent = new NetworkEvent<{ position: Vec3 }>('requestBlockMine');
const requestBlockSpawnEvent = new NetworkEvent<{ position: Vec3, rotation: Quaternion, index: number }>('requestBlockSpawn');

// Internal event for handling the result of an async spawn operation
const newObjectSpawnedEvent = new NetworkEvent<{ entity: Entity, position: Vec3, isAnim: boolean, blockIndex: number }>('NewObjectSpawned');

class BlockAssetManager extends Component<typeof BlockAssetManager> {
  static propsDefinition = {
    block1: { type: PropTypes.Asset },
    block2: { type: PropTypes.Asset },
    block3: { type: PropTypes.Asset },
    block4: { type: PropTypes.Asset },
    block5: { type: PropTypes.Asset },
    block6: { type: PropTypes.Asset },
    block7: { type: PropTypes.Asset },
    block8: { type: PropTypes.Asset },
    block9: { type: PropTypes.Asset },
    block10: { type: PropTypes.Asset },
    block11: { type: PropTypes.Asset },
    block12: { type: PropTypes.Asset },
    block13: { type: PropTypes.Asset },
    block14: { type: PropTypes.Asset },
    block15: { type: PropTypes.Asset },
    block16: { type: PropTypes.Asset },
    block17: { type: PropTypes.Asset },
    block18: { type: PropTypes.Asset },
    block19: { type: PropTypes.Asset },
    block20: { type: PropTypes.Asset },
    blockValues: { type: PropTypes.NumberArray, default: [5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5] },
    maxTotalBlocks: { type: PropTypes.Number, default: 1000 },
    breakVfx: { type: PropTypes.Entity },
    breakSfx: { type: PropTypes.Entity },
  };

  private animPositions: { position: Vec3, blockIndex: number }[] = [];
  private spawnedAnim: Entity[] = [];
  private blocks: (Asset | undefined)[] = [];
  private assetPositions: { position: Vec3, blockIndex: number }[] = [];
  private spawnedAssets: Entity[] = [];
  private totalBlockValue: number = 0;

  override preStart() {
    this.connectNetworkEvent(this.entity, requestBlockMineEvent, this.onMineBlock.bind(this));
    this.connectNetworkEvent(this.entity, requestBlockSpawnEvent, this.onSpawnObject.bind(this));
    this.connectNetworkEvent(this.entity, newObjectSpawnedEvent, this.onNewObjectSpawned.bind(this));
  }

  override start() {
    this.blocks = [
      this.props.block1, this.props.block2, this.props.block3, this.props.block4, this.props.block5,
      this.props.block6, this.props.block7, this.props.block8, this.props.block9, this.props.block10,
      this.props.block11, this.props.block12, this.props.block13, this.props.block14, this.props.block15,
      this.props.block16, this.props.block17, this.props.block18, this.props.block19, this.props.block20,
    ];
  }

  private onMineBlock(data: { position: Vec3 }) {
    const { position: minePos } = data;

    const assetIndex = this.findPositionIndex(this.assetPositions, minePos);
    if (assetIndex !== -1) {
      const blockData = this.assetPositions[assetIndex];
      const blockValue = this.props.blockValues[blockData.blockIndex] ?? 0;
      this.totalBlockValue -= blockValue;
      console.log(`Block mined. New total value: ${this.totalBlockValue}`);

      const entityToDestroy = this.spawnedAssets[assetIndex];
      this.world.deleteAsset(entityToDestroy);
      this.spawnedAssets.splice(assetIndex, 1);
      this.assetPositions.splice(assetIndex, 1);
      this.playBreakEffects(minePos);
      return;
    }

    const animIndex = this.findPositionIndex(this.animPositions, minePos);
    if (animIndex !== -1) {
      const blockData = this.animPositions[animIndex];
      const blockValue = this.props.blockValues[blockData.blockIndex] ?? 0;
      this.totalBlockValue -= blockValue;
      console.log(`Block mined. New total value: ${this.totalBlockValue}`);

      const entityToDestroy = this.spawnedAnim[animIndex];
      this.world.deleteAsset(entityToDestroy);
      this.spawnedAnim.splice(animIndex, 1);
      this.animPositions.splice(animIndex, 1);
      this.playBreakEffects(minePos);
    }
  }

  private async onSpawnObject(data: { position: Vec3, rotation: Quaternion, index: number }) {
    const { position: spawnPosition, rotation: spawnRotation, index: blockId } = data;

    if ((this.spawnedAnim.length + this.spawnedAssets.length) >= this.props.maxTotalBlocks) {
      console.warn("Max total blocks reached. Cannot spawn new block.");
      return;
    }

    this.removeBlockAtPosition(spawnPosition);

    const isAnim = (this.props.blockValues?.[blockId] ?? 0) > 1;

    const assetToSpawn = this.blocks[blockId];
    if (!assetToSpawn) return;

    try {
      const spawnedEntities = await this.world.spawnAsset(assetToSpawn, spawnPosition, spawnRotation);
      if (spawnedEntities && spawnedEntities.length > 0) {
        const newEntity = spawnedEntities[0];
        this.sendNetworkEvent(this.entity, newObjectSpawnedEvent, { entity: newEntity, position: spawnPosition, isAnim, blockIndex: blockId });
      }
    } catch (e) {
      console.error(`Failed to spawn asset for block ID ${blockId}: ${e}`);
    }
  }

  private onNewObjectSpawned(data: { entity: Entity, position: Vec3, isAnim: boolean, blockIndex: number }) {
    const { entity: newSpawn, position: spawnPos, isAnim, blockIndex } = data;
    
    this.removeBlockAtPosition(spawnPos);

    const blockValue = this.props.blockValues[blockIndex] ?? 0;
    this.totalBlockValue += blockValue;
    console.log(`Block added. New total value: ${this.totalBlockValue}`);

    if (isAnim) {
      this.spawnedAnim.push(newSpawn);
      this.animPositions.push({ position: spawnPos, blockIndex });
    } else {
      this.spawnedAssets.push(newSpawn);
      this.assetPositions.push({ position: spawnPos, blockIndex });
    }
  }

  private findPositionIndex(positions: { position: Vec3, blockIndex: number }[], targetPos: Vec3): number {
    return positions.findIndex(data => data.position.equalsApprox(targetPos, 0.1));
  }

  private playBreakEffects(position: Vec3) {
    if (this.props.breakVfx) {
      this.props.breakVfx.position.set(position);
      this.props.breakVfx.as(ParticleGizmo)?.play();
    }
    if (this.props.breakSfx) {
      this.props.breakSfx.position.set(position);
      this.props.breakSfx.as(AudioGizmo)?.play();
    }
  }

  private removeBlockAtPosition(position: Vec3) {
    const assetIndex = this.findPositionIndex(this.assetPositions, position);
    if (assetIndex !== -1) {
      const blockData = this.assetPositions[assetIndex];
      const blockValue = this.props.blockValues[blockData.blockIndex] ?? 0;
      this.totalBlockValue -= blockValue;
      console.log(`Block replaced. New total value: ${this.totalBlockValue}`);

      const entityToDestroy = this.spawnedAssets[assetIndex];
      this.world.deleteAsset(entityToDestroy);
      this.spawnedAssets.splice(assetIndex, 1);
      this.assetPositions.splice(assetIndex, 1);
    }

    const animIndex = this.findPositionIndex(this.animPositions, position);
    if (animIndex !== -1) {
      const blockData = this.animPositions[animIndex];
      const blockValue = this.props.blockValues[blockData.blockIndex] ?? 0;
      this.totalBlockValue -= blockValue;
      console.log(`Block replaced. New total value: ${this.totalBlockValue}`);

      const entityToDestroy = this.spawnedAnim[animIndex];
      this.world.deleteAsset(entityToDestroy);
      this.spawnedAnim.splice(animIndex, 1);
      this.animPositions.splice(animIndex, 1);
    }
  }
}

Component.register(BlockAssetManager);
