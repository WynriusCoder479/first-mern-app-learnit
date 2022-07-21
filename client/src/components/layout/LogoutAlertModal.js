import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const LogoutAlertModal = ({ isShow, closeModal, yesLogout }) => {
	return (
		<Modal
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			show={isShow}
			centered
			onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					<h1>Logout</h1>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p style={{ color: 'black' }}>
					You will log out of LearnIt. Are you sure about this?
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='success' onClick={yesLogout}>
					OK
				</Button>
				<Button variant='danger' onClick={closeModal}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default LogoutAlertModal
