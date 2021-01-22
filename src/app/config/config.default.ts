import { Config } from './config.model';

export const defaultConfig: Config = {
  octoprint: {
    url: '',
    accessToken: '',
  },
  printer: {
    name: '',
    xySpeed: 150,
    zSpeed: 5,
    zBabystepGCode: 'SET_GCODE_OFFSET Z=',
    defaultTemperatureFanSpeed: {
      hotend: 200,
      heatbed: 60,
      fan: 100,
    },
  },
  filament: {
    thickness: 1.75,
    density: 1.25,
    feedLength: 0,
    feedSpeed: 20,
    feedSpeedSlow: 3,
    purgeDistance: 30,
    useM600: false,
  },
  plugins: {
    displayLayerProgress: {
      enabled: true,
    },
    enclosure: {
      enabled: false,
      ambientSensorID: null,
      filament1SensorID: null,
      filament2SensorID: null,
    },
    filamentManager: {
      enabled: true,
    },
    preheatButton: {
      enabled: true,
    },
    printTimeGenius: {
      enabled: true,
    },
    psuControl: {
      enabled: false,
      turnOnPSUWhenExitingSleep: false,
    },
    tpLinkSmartPlug: {
      enabled: false,
      smartPlugIP: '127.0.0.1',
    },
  },
  octodash: {
    customActions: [
      {
        icon: 'home',
        command: 'G28',
        color: '#3861d9',
        confirm: false,
        exit: false,
        label: '归零',
      },
      {
        icon: 'lightbulb',
        command: 'TOGGLE_HOTEND_LIGHT',
        color: '#3861d9',
        confirm: false,
        exit: false,
        label: '打印头射灯',
      },
      {
        icon: 'layer-group',
        command: 'QUAD_GANTRY_LEVEL',
        color: '#2f8021',
        confirm: true,
        exit: false,
        label: '门架调平',
      },
      {
        icon: 'braille',
        command: 'BED_MESH_CALIBRATE',
        color: '#2f8021',
        confirm: true,
        exit: false,
        label: '网格调平',
      },
      {
        icon: 'stamp',
        command: 'CLEAN_NOZZLE',
        color: '#dbcb42',
        confirm: false,
        exit: false,
        label: '清洁喷头',
      },
      {
        icon: 'undo-alt',
        command: 'FIRMWARE_RESTART',
        color: '#e93232',
        confirm: true,
        exit: false,
        label: '重启系统',
      },
    ],
    fileSorting: {
      attribute: 'name',
      order: 'asc',
    },
    pollingInterval: 2000,
    touchscreen: true,
    turnScreenOffWhileSleeping: false,
    turnOnPrinterWhenExitingSleep: false,
    preferPreviewWhilePrinting: false,
    previewProgressCircle: false,
  },
};
