import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

const ShowPostDescriptionModal = ({
	title,
	status,
	description,
	isShowPostDescriptionModal,
	closeModal
}) => {
	return (
		<Modal
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			show={isShowPostDescriptionModal}
			centered
			onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					<Badge
						bg={
							status === 'LEARNED'
								? 'success'
								: status === 'LEARNING'
								? 'warning'
								: 'danger'
						}
						className='mx-1 p-2'>
						{`${title} course`}
					</Badge>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h5>Description</h5>
				<p style={{ color: 'black' }}>{description}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={closeModal}
					variant={
						status === 'LEARNED'
							? 'success'
							: status === 'LEARNING'
							? 'warning'
							: 'danger'
					}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ShowPostDescriptionModal
