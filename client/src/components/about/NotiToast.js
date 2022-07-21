import Toast from 'react-bootstrap/Toast'
import learnItLogo from '../../assets/logo.svg'

const NotiToast = ({ isShow, closeToast, itemCopy }) => {
	//get date time
	const getDatetime = () => {
		let now = new Date()

		const hours = now.getHours()
		const minute = now.getMinutes()
		const date = now.getDate()
		const month = now.getMonth()
		const year = now.getFullYear()

		const datetimeString = `${hours}:${minute} ~ ${month}/${date}/${year}`

		return datetimeString
	}

	return (
		<Toast
			show={isShow}
			style={{ position: 'fixed', top: '10%', right: '5px' }}
			className={`bg-success text-white`}
			delay={3000}
			autohide
			onClose={closeToast}>
			<Toast.Header className={`text-muted`}>
				<img src={learnItLogo} alt='logo' />
				<strong style={{ marginLeft: '5px' }}>Learn It !</strong>
				<small style={{ marginLeft: 'auto' }}>{getDatetime()}</small>
			</Toast.Header>
			<Toast.Body>
				<span>{`${itemCopy} has copied to clipboard`}</span>
			</Toast.Body>
		</Toast>
	)
}

export default NotiToast
