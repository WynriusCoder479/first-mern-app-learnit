import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'
import DeletePostAlertModal from './DeletePostAlertModal'

const ActionButton = ({ url, _id }) => {
	const { deletePost, findPost, setShowUpdatePostModal } =
		useContext(PostContext)
	const [showAlertDeletePostModal, setShowAlertDeletePostModal] =
		useState(false)

	const closeDialog = () => {
		setShowAlertDeletePostModal(false)
	}

	const choosePost = postId => {
		findPost(postId)
		setShowUpdatePostModal(true)
	}

	return (
		<>
			<Button className='post-button' href={url} target='_blank'>
				<img src={playIcon} alt='PlayIcon' width={32} height={32} />
			</Button>
			<Button className='post-button' onClick={choosePost.bind(this, _id)}>
				<img src={editIcon} alt='Edit' width={24} height={24} />
			</Button>
			<Button
				className='post-button'
				onClick={setShowAlertDeletePostModal.bind(this, true)}>
				<img src={deleteIcon} alt='Edit' width={24} height={24} />
			</Button>
			<DeletePostAlertModal
				isShow={showAlertDeletePostModal}
				closeModal={() => {
					closeDialog()
				}}
				removePost={() => {
					deletePost(_id)
					closeDialog()
				}}
			/>
		</>
	)
}

export default ActionButton
