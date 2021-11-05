const Header = ({ name, missions, currentPage }) => {
	return (
		<header className='header'>
			<h1>Hey{name ? `, ${name}` : ''}!</h1>
			{currentPage === 'missions' ? (
				<p>
					{missions?.length > 0 ? (
						<span>
							You have{' '}
							<span className='text-primary text-bold'>
								{missions.length}
							</span>{' '}
							mission{missions.length > 1 ? 's' : ''} pending
							completion
						</span>
					) : (
						<span>You have no pending missions! Nice one 👍</span>
					)}
				</p>
			) : (
				<p>
					{missions?.length > 0 ? (
						<span>
							You have completed{' '}
							<span className='text-primary text-bold'>
								{missions.length}
							</span>{' '}
							mission{missions.length > 1 ? 's' : ''} so far! 🥳
						</span>
					) : (
						<span>
							You have no missions in your completed list.
						</span>
					)}
				</p>
			)}
		</header>
	)
}

export default Header
