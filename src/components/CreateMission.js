import { useState, useContext, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Select from './Select'
import MissionContext from '../MissionContext'
import CreateContext from '../CreateContext'

import { ReactComponent as CreateIcon } from '../assets/svgs/create.svg'
import { ReactComponent as CloseIcon } from '../assets/svgs/titlebar/close.svg'

const CreateMission = () => {
	const { setMissions } = useContext(MissionContext)
	const { showing, setCreateData, update, data } = useContext(CreateContext)

	const [missionTitle, setMissionTitle] = useState('')
	const [missionDescription, setMissionDescription] = useState('')
	const [missionPriority, setMissionPriority] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')

	const createRef = useRef(null)

	const handleChange = (e, setFunction) => {
		setFunction(e.target.value ? e.target.value : e.target.textContent)
	}

	const handleCreateMission = (e) => {
		e.preventDefault()

		if (!missionTitle)
			return setErrorMessage('Please give your mission a title')
		if (!missionPriority)
			return setErrorMessage('Please choose a level of priority')

		setMissions((prev) => [
			...prev.filter((mission) =>
				update ? mission.id !== data.id : mission
			),
			{
				id: update ? data.id : uuidv4(),
				timestamp: update ? data.timestamp : Date.now(),
				title: missionTitle,
				description: missionDescription,
				priority: {
					id:
						missionPriority === 'Low'
							? 1
							: missionPriority === 'Medium'
							? 2
							: 3,
					name: missionPriority
				},
				completed: false
			}
		])

		setMissionTitle('')
		setMissionDescription('')
		setMissionPriority(null)

		setCreateData((prev) => ({ ...prev, showing: false }))
	}

	useEffect(() => {
		setMissionTitle(data.title)
		setMissionDescription(data.description)
		setMissionPriority(data.priority.name)
	}, [data])

	return (
		<div className='create-mission-container'>
			<div
				className='create-button'
				onClick={() =>
					setCreateData((prev) => ({ ...prev, showing: true }))
				}
			>
				<CreateIcon />
			</div>
			<div
				ref={createRef}
				className={`create-mission-inner-container ${
					showing ? 'showing' : ''
				}`}
			>
				<div className='create-mission'>
					<header className='create-mission-header'>
						<h3>
							{!update
								? 'Create a new mission'
								: `Edit ${
										data.title
											? `'${data.title}'`
											: 'Mission'
								  }`}
						</h3>
						<div
							className='close'
							onClick={() => {
								setCreateData((prev) => ({
									...prev,
									showing: false,
									update: false
								}))

								setMissionTitle('')
								setMissionDescription('')
								setMissionPriority(null)
							}}
						>
							<CloseIcon />
						</div>
					</header>
					<form className='create-mission-form'>
						<div className='form-control-row'>
							<div className='form-control'>
								<label htmlFor='missionTitle'>
									{!update
										? 'Enter a mission title'
										: 'Edit mission title'}
								</label>
								<input
									type='text'
									placeholder='Mission Title'
									name='missionTitle'
									id='missionTitle'
									value={missionTitle}
									onChange={(e) =>
										handleChange(e, setMissionTitle)
									}
								/>
							</div>
							<div className='form-control'>
								<label htmlFor='missionPriority'>
									{!update
										? 'Choose a priority level'
										: 'Edit priority level'}
								</label>
								<Select
									id='missionPriority'
									name='missionPriority'
									placeholder='Priority'
									value={missionPriority}
									onChange={(val) => setMissionPriority(val)}
									options={['Low', 'Medium', 'High']}
								/>
							</div>
						</div>
						<div className='form-control-row'>
							<div className='form-control'>
								<label htmlFor='missionDescription'>
									{!update
										? 'Enter a mission description'
										: 'Edit mission description'}
								</label>
								<textarea
									name='missionDescription'
									id='missionDescription'
									value={missionDescription}
									onChange={(e) =>
										handleChange(e, setMissionDescription)
									}
								></textarea>
							</div>
						</div>
						<div className='submit-form'>
							<p className='error-message'>
								{errorMessage ? errorMessage : ''}
							</p>
							<button
								type='submit'
								className='btn btn-primary create-mission-button'
								onClick={handleCreateMission}
							>
								{!update ? 'Create Mission' : 'Update Mission'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CreateMission
