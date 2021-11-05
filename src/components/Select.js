import { useRef } from 'react'
import { ReactComponent as DropdownIcon } from '../assets/svgs/dropdown.svg'

const Select = ({
	name,
	id,
	classes,
	value,
	placeholder,
	onChange,
	options
}) => {
	const selectRef = useRef(null)

	const handleClick = (e) => {
		if (!e.target.classList.contains('select')) return

		selectRef.current.classList.toggle('showing')
	}

	return (
		<div
			ref={selectRef}
			id={id}
			name={name}
			className={`select ${
				classes?.length > 0 ? classes.map((c) => c) : ''
			}`}
			onClick={handleClick}
		>
			<span>{value ? value : placeholder}</span>
			<DropdownIcon />
			<div className='dropdown'>
				{options?.map((option, index) => (
					<div
						key={`option-${index}`}
						className={`dropdown-option option-${option.toLowerCase()}`}
						onClick={() => {
							onChange(option)
							selectRef.current.classList.remove('showing')
						}}
					>
						{option}
					</div>
				))}
			</div>
		</div>
	)
}

export default Select
