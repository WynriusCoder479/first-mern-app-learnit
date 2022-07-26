import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'
import AlertMessage from '../layout/AlertMessage'

const AddPostModal = () => {
	//context
	const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
		useContext(PostContext)

	const closeDialog = () => {
		setNewPostForm({ title: '', description: '', url: '', status: 'TO LEARN' })
		setShowAddPostModal(false)
	}

	const [alert, setAlert] = useState(null)

	const onSubmit = async event => {
		event.preventDefault()

		const { success, message } = await addPost(newPostForm)

		if (success) {
			closeDialog()
			setShowToast({
				show: true,
				message,
				type: success ? 'success' : 'danger'
			})
		} else {
			setNewPostForm({ title: '', description, url, status: 'TO LEARN' })
			setAlert({ type: 'danger', message })

			setTimeout(() => {
				setAlert(null)
			}, 3000)
		}
	}

	const [newPostForm, setNewPostForm] = useState({
		title: '',
		description: '',
		url: '',
		status: 'TO LEARN'
	})

	const { title, description, url } = newPostForm

	const onChangeNewPostForm = event =>
		setNewPostForm({
			...newPostForm,
			[event.target.name]: event.target.value
		})

	return (
		<Modal show={showAddPostModal} size='lg' centered onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>What do you want to learn ???</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group className='mb-4'>
						<AlertMessage info={alert} />
						<Form.Control
							type='text'
							placeholder='Title'
							name='title'
							required
							aria-describedby='title-help'
							value={title}
							onChange={onChangeNewPostForm}
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
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
					<Form.Group className='mb-2'>
						<Form.Control
							type='text'
							placeholder='Tutuorial url'
							name='url'
							value={url}
							onChange={onChangeNewPostForm}
						/>
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
						Let learn it !!!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddPostModal
