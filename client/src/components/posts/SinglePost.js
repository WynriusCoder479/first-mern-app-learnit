import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ShowPostDescriptionModal from './ShowPostDescriptionModal'
import Nav from 'react-bootstrap/Nav'
import { useState } from 'react'
import ActionButton from './ActionButton'
const SinglePost = ({ post: { _id, status, title, description, url } }) => {
	const [isShowPostDescriptionModal, setIsShowPostDescriptionModal] =
		useState(false)

	return (
		<Card
			className='shadow '
			border={
				status === 'LEARNED'
					? 'success'
					: status === 'LEARNING'
					? 'warning'
					: 'danger'
			}>
			<Card.Body>
				<Card.Title>
					<h5 className='post-title'>{title}</h5>
					<Row>
						<Col>
							<Badge
								pill
								bg={
									status === 'LEARNED'
										? 'success'
										: status === 'LEARNING'
										? 'warning'
										: 'danger'
								}
								className='p-2'>
								{status}
							</Badge>
						</Col>
						<Col>
							<ActionButton url={url} _id={_id} />
						</Col>
					</Row>
				</Card.Title>

				<Nav
					className='d-flex justify-content-center text-muted mx-auto mt-3'
					onClick={() => setIsShowPostDescriptionModal(true)}>
					<Nav.Item>
						<p
							style={{
								fontWeight: 'bolder',
								color: '#474a4f',
								textDecoration: 'underline',
								cursor: 'pointer'
							}}>
							Click here to show course description
						</p>
					</Nav.Item>
				</Nav>
				<ShowPostDescriptionModal
					isShowPostDescriptionModal={isShowPostDescriptionModal}
					closeModal={() => setIsShowPostDescriptionModal(false)}
					title={title}
					description={description}
					status={status}
				/>
			</Card.Body>
		</Card>
	)
}
export default SinglePost
