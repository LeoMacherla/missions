import Mission from './Mission'

const MissionsList = ({ missions }) => {
	return (
		<div className='missions-list'>
			{missions.map((mission) => (
				<Mission key={mission.id} data={mission} />
			))}
		</div>
	)
}

export default MissionsList
