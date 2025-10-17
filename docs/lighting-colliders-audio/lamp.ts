import {
  CodeBlockEvent,
  CodeBlockEvents,
  Color,
  Component,
  DynamicLightGizmo,
  Entity,
  EulerOrder,
  PhysicalEntity,
  Player,
  PropTypes,
  Quaternion,
  TextGizmo,
  Vec3,
  clamp,
} from 'horizon/core'

class lamp extends Component<typeof lamp> {
  static readonly propsDefinition = {
    Spread: {
      type: PropTypes.Number,
      default: 45.0,
    },
    AutoModeOn: {
      type: PropTypes.Boolean,
      default: false,
    },
    HueLoopSpeed: {
      type: PropTypes.Number,
      default: 0.9,
    },
    IndexHeld: {
      type: PropTypes.Boolean,
      default: false,
    },
    _PressCount: {
      type: PropTypes.Number,
      default: 0.0,
    },
    DisplayList: {
      type: PropTypes.StringArray,
      default: [],
    },
    _DisplayMe: {
      type: PropTypes.String,
      default: '',
    },
    TextObj: {
      type: PropTypes.Entity,
    },
    MaxFalloff: {
      type: PropTypes.Number,
      default: 50.0,
    },
    MaxIntensity: {
      type: PropTypes.Number,
      default: 5.0,
    },
    CanLoop: {
      type: PropTypes.Boolean,
      default: false,
    },
    Settings: {
      type: PropTypes.StringArray,
      default: [],
    },
    CurrentSelection: {
      type: PropTypes.Number,
      default: 0.0,
    },
    Falloff: {
      type: PropTypes.Number,
      default: 10.0,
    },
    Intensity: {
      type: PropTypes.Number,
      default: 2.0,
    },
    Val: {
      type: PropTypes.Number,
      default: 0.75,
    },
    Sat: {
      type: PropTypes.Number,
      default: 0.0,
    },
    Hue: {
      type: PropTypes.Number,
      default: 0.75,
    },
    LampShade: {
      type: PropTypes.Entity,
    },
    CurColor: {
      type: PropTypes.Color,
      default: new Color(0.0, 0.0, 0.0),
    },
    DynamicLight: {
      type: PropTypes.Entity,
    },
    IsOn: {
      type: PropTypes.Boolean,
      default: false,
    },
    ColorRef: {
      type: PropTypes.Entity,
    },
    IsHeld: {
      type: PropTypes.Boolean,
      default: false,
    },
    AutoReturnDistance: {
      type: PropTypes.Number,
      default: 1.0,
    },
    Delay: {
      type: PropTypes.Number,
      default: 30.0,
    },
    Instant: {
      type: PropTypes.Boolean,
      default: true,
    },
    OrgRot: {
      type: PropTypes.Quaternion,
      default: Quaternion.fromEuler(new Vec3(0.0, 0.0, 0.0), EulerOrder.YXZ),
    },
    OrgPos: {
      type: PropTypes.Vec3,
      default: new Vec3(0.0, 0.0, 0.0),
    },
  }

  mutableProps = {
    Spread: 0,
    AutoModeOn: false,
    HueLoopSpeed: 0,
    IndexHeld: false,
    _PressCount: 0,
    DisplayList: [] as string[],
    _DisplayMe: '',
    CanLoop: false,
    Settings: [] as string[],
    CurrentSelection: 0,
    Falloff: 0,
    Intensity: 0,
    Val: 0,
    Sat: 0,
    Hue: 0,
    CurColor: Color.black,
    IsOn: false,
    IsHeld: false,
    OrgRot: Quaternion.one,
    OrgPos: Vec3.zero,
  }

  //speed properties for auto mode
  hueSpeed: number = 0
  satSpeed: number = 0
  valSpeed: number = 0
  intensitySpeed: number = 0
  falloffSpeed: number = 0
  spreadSpeed: number = 0

  static readonly Events = {
    Multipress: new CodeBlockEvent<[]>('Multipress', []),
    AutoLoop: new CodeBlockEvent<[]>('AutoLoop', []),
    loopUp: new CodeBlockEvent<[]>('loopUp', []),
    Light: new CodeBlockEvent<[]>('Light', []),
    Return: new CodeBlockEvent<[]>('Return', []),
    LostObjLoop: new CodeBlockEvent<[]>('LostObjLoop', []),
  }

  override preStart() {
    this.mutableProps = {
      Spread: this.props.Spread,
      AutoModeOn: this.props.AutoModeOn,
      HueLoopSpeed: this.props.HueLoopSpeed,
      IndexHeld: this.props.IndexHeld,
      _PressCount: this.props._PressCount,
      DisplayList: this.props.DisplayList.slice(),
      _DisplayMe: this.props._DisplayMe,
      CanLoop: this.props.CanLoop,
      Settings: this.props.Settings.slice(),
      CurrentSelection: this.props.CurrentSelection,
      Falloff: this.props.Falloff,
      Intensity: this.props.Intensity,
      Val: this.props.Val,
      Sat: this.props.Sat,
      Hue: this.props.Hue,
      CurColor: this.props.CurColor,
      IsOn: this.props.IsOn,
      IsHeld: this.props.IsHeld,
      OrgRot: this.props.OrgRot,
      OrgPos: this.props.OrgPos,
    }

    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnIndexTriggerDown,
      this.onIndexTriggerDown.bind(this),
    )

    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnIndexTriggerUp,
      this.onIndexTriggerUp.bind(this),
    )

    this.connectCodeBlockEvent(
      this.entity,
      lamp.Events.Multipress,
      this.onMultipress.bind(this),
    )

    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnButton1Down,
      this.OnButton1Down.bind(this),
    )

    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnButton2Down,
      this.OnButton2Down.bind(this),
    )

    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnButton2Up,
      this.OnButton2Up.bind(this),
    )

    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnGrabEnd,
      this.onGrabEnd.bind(this),
    )

    this.connectCodeBlockEvent(
      this.entity,
      lamp.Events.AutoLoop,
      this.onAutoLoop.bind(this),
    )

    this.connectCodeBlockEvent(
      this.entity,
      lamp.Events.loopUp,
      this.onLoopUp.bind(this),
    )

    this.connectCodeBlockEvent(
      this.entity,
      lamp.Events.Light,
      this.onLight.bind(this),
    )

    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnGrabStart,
      this.onGrabStart.bind(this),
    )

    this.connectCodeBlockEvent(
      this.entity,
      lamp.Events.Return,
      this.onReturn.bind(this),
    )

    this.connectCodeBlockEvent(
      this.entity,
      lamp.Events.LostObjLoop,
      this.onLostObjLoop.bind(this),
    )
  }

  override start() {
    this.mutableProps.Settings = [
      'Hue',
      'Saturation',
      'Value',
      'Intensity',
      'Falloff',
      'Spread',
      'Fade Speed',
      'Auto Mode',
    ]
    this.sendCodeBlockEvent(this.entity, lamp.Events.Light)
    this.async.setTimeout(
      () => {
        this.sendCodeBlockEvent(this.entity, lamp.Events.LostObjLoop)
      },
      clamp(
        (10.0 + this.props.Delay) * 1000 /* milliseconds */,
        100,
        10 * 3600 * 1000,
      ),
    )
    this.mutableProps.OrgPos = this.entity.position.get()
    this.mutableProps.OrgRot = this.entity.rotation.get()
  }

  onIndexTriggerDown(player: Player) {
    this.mutableProps.IndexHeld = true
    this.async.setTimeout(() => {
      this.sendCodeBlockEvent(this.entity, lamp.Events.Multipress)
    }, 0.3 * 1000)
  }

  onIndexTriggerUp(player: Player) {
    this.mutableProps.IndexHeld = false
    this.mutableProps._PressCount = this.mutableProps._PressCount + 1.0
  }

  onMultipress() {
    if (!this.mutableProps.IsOn) {
      this.mutableProps.IsOn = true
    } else if (this.mutableProps._PressCount === 0.0) {
      this.mutableProps.IsOn = false
      this.mutableProps.AutoModeOn = false
    } else if (
      this.mutableProps._PressCount === 1.0 &&
      this.mutableProps.IndexHeld
    ) {
      if (!this.mutableProps.AutoModeOn) {
        this.sendCodeBlockEvent(this.entity, lamp.Events.AutoLoop)
        this.mutableProps.AutoModeOn = true
      } else {
        this.mutableProps.AutoModeOn = false
      }
    }
    if (this.mutableProps.IndexHeld) {
      this.mutableProps._PressCount = -1.0
    } else {
      this.mutableProps._PressCount = 0.0
    }
    this.sendCodeBlockEvent(this.entity, lamp.Events.Light)
  }

  OnButton1Down(player: Player) {
    this.mutableProps.CurrentSelection =
      (this.mutableProps.CurrentSelection + 1) %
      this.mutableProps.Settings.length
    this.sendCodeBlockEvent(this.entity, lamp.Events.Light)
  }

  OnButton2Down(player: Player) {
    if (
      this.mutableProps.Settings[this.mutableProps.CurrentSelection] ===
      'Auto Mode'
    ) {
      this.mutableProps.AutoModeOn = !this.mutableProps.AutoModeOn
      if (this.mutableProps.AutoModeOn) {
        this.hueSpeed = Math.random() * 0.009 + 0.001
        this.satSpeed = Math.random() * 0.009 + 0.001
        this.valSpeed = Math.random() * 0.009 + 0.001
        this.intensitySpeed =
          (Math.random() * 0.009 + 0.001) * this.props.MaxIntensity
        this.falloffSpeed =
          (Math.random() * 0.009 + 0.001) * this.props.MaxFalloff
        this.spreadSpeed = (Math.random() * 0.009 + 0.001) * 180.0
        this.sendCodeBlockEvent(this.entity, lamp.Events.AutoLoop)
      }
    } else {
      this.mutableProps.CanLoop = true
      this.sendCodeBlockEvent(this.entity, lamp.Events.loopUp)
    }
    this.sendCodeBlockEvent(this.entity, lamp.Events.Light)
  }

  OnButton2Up(player: Player) {
    this.mutableProps.CanLoop = false
  }

  onGrabEnd(player: Player) {
    this.mutableProps.CanLoop = false
    this.mutableProps.IsHeld = false
    if (this.props.Instant) {
      this.sendCodeBlockEvent(this.entity, lamp.Events.Return)
    } else {
      this.async.setTimeout(
        () => {
          this.sendCodeBlockEvent(this.entity, lamp.Events.Return)
        },
        clamp(
          this.props.Delay * 1000 /* milliseconds */,
          100,
          10 * 3600 * 1000,
        ),
      )
    }
  }

  onAutoLoop() {
    this.mutableProps.Hue = (this.mutableProps.Hue + this.hueSpeed) % 1.0
    this.mutableProps.Sat = (this.mutableProps.Sat + this.satSpeed) % 1.0
    this.mutableProps.Val = (this.mutableProps.Val + this.valSpeed) % 1.0
    this.mutableProps.Intensity =
      (this.mutableProps.Intensity + this.intensitySpeed) %
      this.props.MaxIntensity
    this.mutableProps.Falloff =
      (this.mutableProps.Falloff + this.falloffSpeed) % this.props.MaxFalloff
    this.mutableProps.Spread =
      (this.mutableProps.Spread + this.spreadSpeed) % 180.0

    this.sendCodeBlockEvent(this.entity, lamp.Events.Light)
    if (this.mutableProps.AutoModeOn) {
      this.async.setTimeout(() => {
        this.sendCodeBlockEvent(this.entity, lamp.Events.AutoLoop)
      }, 50)
    }
  }

  onLoopUp() {
    if (
      this.mutableProps.CurrentSelection ===
      this.mutableProps.Settings.indexOf('Hue')
    ) {
      this.mutableProps.Hue = (this.mutableProps.Hue + 0.01) % 1.0
    } else if (
      this.mutableProps.CurrentSelection ===
      this.mutableProps.Settings.indexOf('Saturation')
    ) {
      this.mutableProps.Sat = (this.mutableProps.Sat + 0.01) % 1.0
    } else if (
      this.mutableProps.CurrentSelection ===
      this.mutableProps.Settings.indexOf('Value')
    ) {
      this.mutableProps.Val = (this.mutableProps.Val + 0.01) % 1.0
    } else if (
      this.mutableProps.CurrentSelection ===
      this.mutableProps.Settings.indexOf('Intensity')
    ) {
      this.mutableProps.Intensity =
        (this.mutableProps.Intensity + 0.01) % this.props.MaxIntensity
    } else if (
      this.mutableProps.CurrentSelection ===
      this.mutableProps.Settings.indexOf('Falloff')
    ) {
      this.mutableProps.Falloff =
        (this.mutableProps.Falloff + 0.05) % this.props.MaxFalloff
    } else if (
      this.mutableProps.CurrentSelection ===
      this.mutableProps.Settings.indexOf('Spread')
    ) {
      this.mutableProps.Spread = (this.mutableProps.Spread + 0.5) % 180.0
    } else if (
      this.mutableProps.CurrentSelection ===
      this.mutableProps.Settings.indexOf('Fade Speed')
    ) {
      this.mutableProps.HueLoopSpeed =
        (this.mutableProps.HueLoopSpeed + 0.01) % 1.0
    }
    this.sendCodeBlockEvent(this.entity, lamp.Events.Light)
    if (this.mutableProps.CanLoop) {
      this.sendCodeBlockEvent(this.entity, lamp.Events.loopUp)
    }
  }

  onLight() {
    if (this.mutableProps.IsOn) {
      this.props.DynamicLight!.as(DynamicLightGizmo)?.enabled.set(true)
      this.props
        .DynamicLight!.as(DynamicLightGizmo)
        ?.intensity.set(this.mutableProps.Intensity)
      this.props
        .DynamicLight!.as(DynamicLightGizmo)
        ?.falloffDistance.set(this.mutableProps.Falloff)
      this.props
        .DynamicLight!.as(DynamicLightGizmo)
        ?.spread.set(this.mutableProps.Spread)
      this.mutableProps.CurColor = Color.fromHSV(
        new Vec3(
          this.mutableProps.Hue,
          this.mutableProps.Sat,
          this.mutableProps.Val,
        ),
      )
      if (this.props.ColorRef) {
        this.props.ColorRef.color.set(this.mutableProps.CurColor)
      }
      this.props.DynamicLight!.color.set(this.mutableProps.CurColor)
      if (this.props.LampShade) {
        this.props.LampShade.color.set(this.mutableProps.CurColor)
      }
      this.mutableProps.DisplayList =
        this.mutableProps.Settings.slice() /* code block behavior */
      this.mutableProps.DisplayList[this.mutableProps.CurrentSelection] =
        '<color=#e05000><u><b>' +
        (this.mutableProps.DisplayList[this.mutableProps.CurrentSelection] +
          '</color></u></b>')
      this.mutableProps._DisplayMe =
        this.mutableProps.DisplayList[0] +
        ': ' +
        (Math.floor(this.mutableProps.Hue * 100.0).toString() + '%<br>')
      this.mutableProps._DisplayMe =
        this.mutableProps._DisplayMe +
        this.mutableProps.DisplayList[1] +
        (': ' + Math.floor(this.mutableProps.Sat * 100.0).toString() + '%<br>')
      this.mutableProps._DisplayMe =
        this.mutableProps._DisplayMe +
        this.mutableProps.DisplayList[2] +
        (': ' + Math.floor(this.mutableProps.Val * 100.0).toString() + '%<br>')
      this.mutableProps._DisplayMe =
        this.mutableProps._DisplayMe +
        this.mutableProps.DisplayList[3] +
        (': ' +
          Math.floor(
            (this.mutableProps.Intensity / this.props.MaxIntensity) * 100.0,
          ).toString() +
          '%<br>')
      this.mutableProps._DisplayMe =
        this.mutableProps._DisplayMe +
        this.mutableProps.DisplayList[4] +
        (': ' +
          Math.floor(
            (this.mutableProps.Falloff / this.props.MaxFalloff) * 100.0,
          ).toString() +
          '%<br>')
      this.mutableProps._DisplayMe =
        this.mutableProps._DisplayMe +
        this.mutableProps.DisplayList[5] +
        (': ' + this.mutableProps.Spread.toFixed(2).toString() + ' Deg.<br>')
      this.mutableProps._DisplayMe =
        this.mutableProps._DisplayMe +
        this.mutableProps.DisplayList[6] +
        (': ' +
          Math.floor(this.mutableProps.HueLoopSpeed * 100.0).toString() +
          '%<br>')
      this.mutableProps._DisplayMe =
        this.mutableProps._DisplayMe +
        this.mutableProps.DisplayList[7] +
        ': ' +
        (this.mutableProps.AutoModeOn ? 'On' : 'Off')
      this.props
        .TextObj!.as(TextGizmo)
        ?.text.set('<align=left>' + this.mutableProps._DisplayMe)
    } else {
      this.props.TextObj!.as(TextGizmo)?.text.set('<align=left>Off')
      this.props.DynamicLight!.as(DynamicLightGizmo)?.enabled.set(false)
      if (this.props.ColorRef) {
        this.props.ColorRef.color.set(new Color(0.0, 0.0, 0.0))
      }
      if (this.props.LampShade) {
        this.props.LampShade.color.set(new Color(0.75, 0.75, 0.75))
      }
    }
  }

  onGrabStart(isRight: boolean, player: Player) {
    this.mutableProps.IsHeld = true
  }

  onReturn() {
    this.entity.as(PhysicalEntity)?.locked.set(!false)
    this.entity.position.set(this.mutableProps.OrgPos)
    this.entity.rotation.set(this.mutableProps.OrgRot)
    this.entity.as(PhysicalEntity)?.locked.set(!true)
    this.entity.as(PhysicalEntity)?.zeroVelocity()
  }

  onLostObjLoop() {
    if (!this.mutableProps.IsHeld) {
      if (
        this.entity.position.get().distance(this.mutableProps.OrgPos) >
        this.props.AutoReturnDistance
      ) {
        this.sendCodeBlockEvent(
          this.entity,
          new CodeBlockEvent<[Player]>('grabEnd', [PropTypes.Player]),
          this.world.getServerPlayer(),
        )
      }
    }
    this.async.setTimeout(
      () => {
        this.sendCodeBlockEvent(this.entity, lamp.Events.LostObjLoop)
      },
      clamp(
        (10.0 + this.props.Delay) * 1000 /* milliseconds */,
        100,
        10 * 3600 * 1000,
      ),
    )
  }
}

Component.register(lamp)
