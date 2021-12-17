const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('api', {
	quit: () => ipcRenderer.send('quit'),
	minimise: () => ipcRenderer.send('minimise'),
	send: (channel, data) => {
		ipcRenderer.send(channel, data)
	},
	on: (channel, listener) => {
		const subscription = (e, ...args) => listener(...args)
		ipcRenderer.on(channel, subscription)
		return () => ipcRenderer.removeListener(channel, subscription)
	}
})
