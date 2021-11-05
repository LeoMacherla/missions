import { useContext, useEffect, useState } from 'react'

import Titlebar from './Titlebar'
import Header from './Header'
import PageToggle from './PageToggle'
import MissionsList from './MissionsList'
import CreateMission from './CreateMission'

import MissionContext from '../MissionContext'
import CreateContext from '../CreateContext'

import '../css/main.css'

const App = () => {
	const [currentPage, setCurrentPage] = useState('missions')
	const [missions, setMissions] = useState([])
	const [name, setName] = useState('')
	const [createData, setCreateData] = useState(useContext(CreateContext))

	useEffect(() => {
		window.api.send('get-missions')
		window.api.on('missions', setMissions)

		window.api.send('get-name')
		window.api.on('name', setName)
	}, [])

	useEffect(() => {
		window.api.send('write-missions', missions)
	}, [missions])

	const filteredMissions = (
		currentPage === 'missions'
			? missions.filter((mission) => !mission.completed)
			: missions.filter((mission) => mission.completed)
	).sort((a, b) => a.timestamp - b.timestamp)

	return (
		<CreateContext.Provider
			value={{
				showing: createData.showing,
				setCreateData,
				update: createData.update,
				data: createData.data
			}}
		>
			<MissionContext.Provider value={{ missions, setMissions }}>
				<div>
					<Titlebar />
					<div className='app'>
						<Header
							missions={filteredMissions}
							currentPage={currentPage}
							name={name}
						/>
						<PageToggle
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>
						<MissionsList missions={filteredMissions} />
						{currentPage === 'missions' && <CreateMission />}
					</div>
				</div>
			</MissionContext.Provider>
		</CreateContext.Provider>
	)
}

export default App
