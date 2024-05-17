const DEFAULT_WIDTH = 1200
const DEFAULT_MIN_WIDTH = 768
const DEFAULT_MIN_HEIGHT = 650
const DEFAULT_HEIGHT = 800

export const mainWindowConfig: Electron.BrowserWindowConstructorOptions = {
  width: DEFAULT_WIDTH,
  minWidth: DEFAULT_MIN_WIDTH,
  height: DEFAULT_HEIGHT,
  minHeight: DEFAULT_MIN_HEIGHT,
  skipTaskbar: false,
  show: true,
  trafficLightPosition: {
    x: 10,
    y: 15,
  },
  titleBarStyle: 'hidden',
  vibrancy: 'sidebar',
}
