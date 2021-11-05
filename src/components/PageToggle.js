import { useRef } from 'react'

const PageToggle = ({ currentPage, setCurrentPage }) => {
	const currentRef = useRef(null)

	const handleMouseOver = (e) => {
		const x = `${e.target.offsetLeft}px`
		e.target.parentElement.style.setProperty('--x', x)
	}

	const handleMouseOut = () => {
		const x = `${currentRef.current.offsetLeft}px`
		currentRef.current.parentElement.style.setProperty('--x', x)
	}

	const handleChangePage = (e) => {
		setCurrentPage(e.target.getAttribute('data-name'))
		handleMouseOver(e)
	}

	return (
		<div className='page-toggle'>
			<div
				ref={currentPage === 'missions' ? currentRef : null}
				className='toggle'
				data-name='missions'
				onClick={handleChangePage}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
			>
				Missions
			</div>
			<div
				ref={currentPage === 'completed' ? currentRef : null}
				className='toggle'
				data-name='completed'
				onClick={handleChangePage}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
			>
				Completed
			</div>
		</div>
	)
}

export default PageToggle
