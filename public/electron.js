const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const os = require('os')
const isDev = require('electron-is-dev')
const {
	default: installExtension,
	REACT_DEVELOPER_TOOLS
} = require('electron-devtools-installer')
const fs = require('fs-extra')
const log = require('electron-log')
require('@electron/remote/main').initialize()

const icon = path.join(__dirname, 'assets', 'icons', 'icon_1000.png')
const dir = path.join(app.getPath('documents'), 'Missions')
const missionsFile = path.join(dir, 'missions.json')
let main = null

log.transports.file.resolvePath = () => path.join(dir, 'logs', 'main.log')

const createMain = () => {
	log.info('Initialising main window')

	main = new BrowserWindow({
		minWidth: 450,
		minHeight: 736,
		width: 450,
		height: 736,
		icon: icon,
		title: 'Missions',
		frame: false,
		resizeable: false,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js'),
			devTools: isDev
		}
	})

	if (process.platform === 'darwin') app.dock.setIcon(icon)

	main.loadURL(
		isDev
			? 'http://localhost:3000/'
			: `file://${path.join(__dirname, '../../build/index.html')}`
	)

	log.info('Created main window')
}

const checkDirectories = async () => {
	log.info('Checking directories')

	if (fs.existsSync(dir)) return log.info('Directories exist')

	log.info('Directories do not exist. Creating directories')
	await fs.mkdirSync(dir)
	await fs.writeJSONSync(path.join(dir, 'missions.json', { spaces: 2 }))
	log.info('Directories created')
}

app.whenReady()
	.then(() => log.transports.file.getFile().clear())
	.then(async () => await checkDirectories().catch(log.error))
	.then(() => {
		if (!isDev || process.platform === 'darwin') return

		installExtension(REACT_DEVELOPER_TOOLS)
			.then((name) => console.log(`Installed extension ${name}`))
			.catch((error) =>
				console.error(
					`There was an error installing extensions: ${error}`
				)
			)
	})
	.then(createMain)
	.then(log.info(`Missions v${app.getVersion()} started...`))

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

app.on('active', () => {
	if (BrowserWindow.getAllWindows().length === 0) createMain()
})

// Quit Application
ipcMain.on('quit', () => app.quit())
// Minimise Application
ipcMain.on('minimise', () => BrowserWindow.getFocusedWindow().minimize())

// Get username
ipcMain.on('get-name', () =>
	main.webContents.send('name', os.userInfo().username)
)

// Get all missions from missions file
ipcMain.on('get-missions', async () => {
	const missions = (await fs.existsSync(missionsFile))
		? await fs.readJSONSync(missionsFile)
		: []

	return main.webContents.send('missions', missions)
})

// Write missions to file
ipcMain.on('write-missions', (e, missions) => {
	log.info('Writing missions...', missions)
	fs.writeJSONSync(missionsFile, missions, { spaces: 2 })
})
