import { app, BrowserWindow, ipcMain, Menu } from 'electron'

import { join } from 'path'
/**
 * Managers
 **/
import { windowManager } from './managers/window'
import { getAppConfigurations, log } from '@janhq/core/node'

/**
 * IPC Handlers
 **/
import { injectHandler } from './handlers/common'
import { handleAppUpdates } from './handlers/update'
import { handleAppIPCs } from './handlers/native'

/**
 * Utils
 **/
import { setupMenu } from './utils/menu'
import { createUserSpace } from './utils/path'
import { migrateExtensions } from './utils/migration'
import { cleanUpAndQuit } from './utils/clean'
import { setupExtensions } from './utils/extension'
import { setupCore } from './utils/setup'
import { setupReactDevTool } from './utils/dev'

import { trayManager } from './managers/tray'
import { logSystemInfo } from './utils/system'
import { registerGlobalShortcuts } from './utils/shortcut'

/**
 * Paths
 **/
const preloadPath = join(__dirname, 'preload.js')
const rendererPath = join(__dirname, '..', 'renderer')
const quickAskPath = join(rendererPath, 'search.html')

const mainPath = join('file://', join(rendererPath, 'index.html'))

const privateModeURL = 'http://localhost:3000/jan/'
const privateModePath = join('file://', join(rendererPath, 'jan.html'))
const onlineModeURL = 'https://os.newcoin.org'

const mainUrl = 'http://localhost:3000'
const quickAskUrl = `${mainUrl}/search`

const gotTheLock = app.requestSingleInstanceLock()

app
  .whenReady()
  .then(() => {
    if (!gotTheLock) {
      app.quit()
      throw new Error('Another instance of the app is already running')
    }
  })
  .then(setupReactDevTool)
  .then(setupCore)
  .then(createUserSpace)
  .then(migrateExtensions)
  .then(setupExtensions)
  .then(setupMenu)
  .then(handleIPCs)
  .then(handleAppUpdates)
  .then(() => process.env.CI !== 'e2e' && createQuickAskWindow())
  .then(createMainWindow)
  .then(registerGlobalShortcuts)
  .then(() => {
    if (!app.isPackaged) {
      windowManager.mainWindow?.webContents.openDevTools()
    }
  })
  .then(() => process.env.CI !== 'e2e' && trayManager.createSystemTray())
  .then(logSystemInfo)
  .then(() => {
    app.on('activate', () => {
      if (!BrowserWindow.getAllWindows().length) {
        createMainWindow()
      } else {
        windowManager.showMainWindow()
      }
    })
  })
  .then(() => {
    // Modify menu to go back to home
    const modePath = app.isPackaged ? privateModePath : privateModeURL
    const menu = Menu.getApplicationMenu()

    if (menu) {
      const submenu = menu.items[1]?.submenu
      if (submenu) {
        submenu.items[0].click = () => {
          windowManager.mainWindow?.loadURL(modePath)
        }
        submenu.items[1].click = () => {
          windowManager.mainWindow?.loadURL(onlineModeURL)
        }
      }
    }
  })

app.on('second-instance', (_event, _commandLine, _workingDirectory) => {
  windowManager.showMainWindow()
})

app.on('before-quit', function (evt) {
  trayManager.destroyCurrentTray()
})

app.once('quit', () => {
  cleanUpAndQuit()
})

app.once('window-all-closed', () => {
  // Feature Toggle for Quick Ask
  if (
    getAppConfigurations().quick_ask &&
    !windowManager.isQuickAskWindowDestroyed()
  )
    return
  cleanUpAndQuit()
})

function createQuickAskWindow() {
  // Feature Toggle for Quick Ask
  if (!getAppConfigurations().quick_ask) return
  const startUrl = app.isPackaged ? `file://${quickAskPath}` : quickAskUrl
  windowManager.createQuickAskWindow(preloadPath, startUrl)
}

function createMainWindow() {
  const startUrl = app.isPackaged ? mainPath : mainUrl
  windowManager.createMainWindow(preloadPath, startUrl)
}

/**
 * Handles various IPC messages from the renderer process.
 */
function handleIPCs() {
  // Inject core handlers for IPCs
  injectHandler()

  // Handle native IPCs
  handleAppIPCs()
}

/*
 ** Suppress Node error messages
 */
process.on('uncaughtException', function (err) {
  log(`Error: ${err}`)
})
