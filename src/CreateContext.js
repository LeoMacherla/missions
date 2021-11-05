import { createContext } from 'react'

export default createContext({
	showing: false,
	setCreateData: null,
	update: false,
	data: {
		id: null,
		timestamp: null,
		title: null,
		description: null,
		priority: {
			id: null,
			name: null
		},
		completed: false
	}
})
