import { PostContext } from '../contexts/PostContext'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import addIcon from '../assets/plus-circle-fill.svg'
import Toast from 'react-bootstrap/Toast'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import learnItLogo from '../assets/logo.svg'
import UpdatePostModal from '../components/posts/UpdatePostModal'

const Dashboard = () => {
	//context
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		postState: { posts, post, postsLoading },
		getPosts,
		setShowAddPostModal,
		showToast: { show, message, type },
		setShowToast,
		getDatetime
	} = useContext(PostContext)

	//Get all posts from DB when first load
	useEffect(() => {
		getPosts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	//get datetime

	let body = null

	if (postsLoading)
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	else if (posts.length === 0)
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>Hi {username}</Card.Header>
					<Card.Body>
						<Card.Title>Welcome to Learn It</Card.Title>
						<Card.Text>
							Click the button below to add your first course to learn
						</Card.Text>
						<Button
							variant='primary'
							onClick={setShowAddPostModal.bind(this, true)}>
							Learn It !
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	else
		body = (
			<Container>
				<Row>
					{posts.map(post => (
						<Col key={post._id} className='my-2' md={4}>
							<SinglePost post={post} />
						</Col>
					))}
				</Row>

				{/* Show add post modal button */}
				<OverlayTrigger
					placement='left'
					overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
					<Button
						className='btn-floating'
						onClick={setShowAddPostModal.bind(this, true)}>
						<img src={addIcon} alt='add icon' width={60} height={60} />
					</Button>
				</OverlayTrigger>
			</Container>
		)

	return (
		<>
			{body}
			<AddPostModal />
			{post !== null && <UpdatePostModal />}
			<Toast
				show={show}
				style={{ position: 'fixed', top: '10%', right: '5px' }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null
				})}
				delay={3000}
				autohide>
				<Toast.Header className={`text-muted`}>
					<img src={learnItLogo} alt='logo' />
					<strong style={{ marginLeft: '5px' }}>Learn It !</strong>
					<small style={{ marginLeft: 'auto' }}>{getDatetime()}</small>
				</Toast.Header>
				<Toast.Body>
					<span>{message}</span>
				</Toast.Body>
			</Toast>
		</>
	)
}

export default Dashboard
