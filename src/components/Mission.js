import { useContext } from 'react'
import reactStringReplace from 'react-string-replace'

import MissionContext from '../MissionContext'
import CreateContext from '../CreateContext'
import { ReactComponent as EditIcon } from '../assets/svgs/edit.svg'
import { ReactComponent as DeleteIcon } from '../assets/svgs/delete.svg'

const Mission = ({
	data: { id, timestamp, title, description, priority, completed }
}) => {
	const { setMissions } = useContext(MissionContext)
	const { setCreateData } = useContext(CreateContext)

	const handleClick = (e) => {
		if (e.target.classList.contains('action')) return

		setMissions((prev) => [
			...prev.filter((mission) => mission.id !== id),
			{
				id,
				timestamp,
				title,
				description,
				priority,
				completed: !completed
			}
		])
	}

	const deleteMission = () => {
		setMissions((prev) => prev.filter((mission) => mission.id !== id))
	}

	const editMission = () => {
		setCreateData({
			showing: true,
			setCreateData,
			update: true,
			data: {
				id,
				timestamp,
				title,
				description,
				priority,
				completed
			}
		})
	}

	return (
		<div
			id={id}
			className={`mission priority-${priority.name.toLowerCase()} ${
				completed ? 'completed' : ''
			}`}
			onClick={handleClick}
		>
			<div className='mission-info'>
				<h2 className='title'>{title}</h2>
				{description && (
					<div className='description'>
						{reactStringReplace(description, '\n', (match, i) => (
							<br key={i} />
						))}
					</div>
				)}
			</div>
			<div className='actions'>
				{!completed && (
					<div
						className='action'
						data-tooltip-text='Edit Mission'
						onClick={editMission}
					>
						<EditIcon />
					</div>
				)}
				<div
					className='action'
					data-tooltip-text='Delete Mission'
					onClick={deleteMission}
				>
					<DeleteIcon />
				</div>
			</div>
		</div>
	)
}

export default Mission
