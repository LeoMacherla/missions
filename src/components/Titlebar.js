import { ReactComponent as CloseIcon } from '../assets/svgs/titlebar/close.svg'
import { ReactComponent as MinimiseIcon } from '../assets/svgs/titlebar/minimise.svg'

const Titlebar = () => {
	const controls = [
		{
			icon: <CloseIcon />,
			click: () => window.api.quit()
		},
		{
			icon: <MinimiseIcon />,
			click: () => window.api.minimise()
		}
	]

	return (
		<div className='titlebar'>
			<div className='dragging'></div>
			<div className='controls'>
				{controls.map((control, index) => (
					<div
						key={index}
						className='control'
						onClick={control.click}
					>
						{control.icon}
					</div>
				))}
			</div>
		</div>
	)
}

export default Titlebar
