import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {
	//context
	const {
		postState: { post },
		showUpdatePostModal,
		setShowUpdatePostModal,
		updatePost,
		setShowToast
	} = useContext(PostContext)

	const closeDialog = () => {
		setUpdatedPostForm(post)
		setShowUpdatePostModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()

		const { success, message } = await updatePost(updatedPostForm)
		closeDialog()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const [updatedPostForm, setUpdatedPostForm] = useState(post)

	useEffect(() => {
		setUpdatedPostForm(post)
	}, [post])

	const { title, description, url, status } = updatedPostForm

	const onChangeUpdatedPostForm = event =>
		setUpdatedPostForm({
			...updatedPostForm,
			[event.target.name]: event.target.value
		})

	return (
		<Modal show={showUpdatePostModal} size='lg' centered onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Making progress ???</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group className='mb-4'>
						<Form.Control
							type='text'
							placeholder='Title'
							name='title'
							required
							aria-describedby='title-help'
							value={title}
							onChange={onChangeUpdatedPostForm}
						/>
						<Form.Text id='title-help' muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group className='mb-4'>
						<Form.Control
							as='textarea'
							rows={7}
							placeholder='Description'
							name='description'
							value={description}
							onChange={onChangeUpdatedPostForm}
						/>
					</Form.Group>
					<Form.Group className='mb-4'>
						<Form.Control
							type='text'
							placeholder='Tutuorial url'
							name='url'
							value={url}
							onChange={onChangeUpdatedPostForm}
						/>
					</Form.Group>
					<Form.Group className='mb-4'>
						<Form.Control
							as='select'
							value={status}
							name='status'
							onChange={onChangeUpdatedPostForm}>
							<option value='TO LEARN'>TO LEARN</option>
							<option value='LEARNING'>LEARNING</option>
							<option value='LEARNED'>LEARNED</option>
						</Form.Control>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={() => {
							closeDialog()
						}}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						Update course
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default UpdatePostModal
