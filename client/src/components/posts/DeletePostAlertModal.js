import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const DeletePostAlertModal = ({ isShow, closeModal, removePost }) => {
	return (
		<Modal
			size='lg'
			show={isShow}
			onHide={closeModal}
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					<strong>Delete course</strong>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h5>This course will be deleted, are you sure about this?</h5>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='primary' onClick={removePost}>
					OK
				</Button>
				<Button variant='secondary' onClick={closeModal}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DeletePostAlertModal
