import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useState } from 'react'
import LogoutAlertModal from './LogoutAlertModal'

const NavbarMenu = () => {
	const [showLogoutAlertModal, setShowLogoutAlertModal] = useState(false)

	const {
		authState: {
			user: { username }
		},
		logoutUser
	} = useContext(AuthContext)

	const logout = () => {
		logoutUser()
		setShowLogoutAlertModal(false)
	}

	return (
		<>
			<Navbar expand='lg' bg='primary' variant='dark' className='shadow px-4'>
				<Navbar.Brand className='fw-bolder text-white fs-3'>
					<img
						src={learnItLogo}
						alt='learnItLogo'
						width='40'
						height='40'
						style={{ marginRight: '10px' }}
					/>
					LearnIt
				</Navbar.Brand>

				<Navbar.Toggle aria-controls='basic-navbar-nav' />

				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link
							className='fw-bolder text-white fs-5'
							to='/dashboard'
							as={Link}>
							Dashboard
						</Nav.Link>
						<Nav.Link
							className='fw-bolder text-white fs-5'
							to='/about'
							as={Link}>
							About
						</Nav.Link>
					</Nav>

					<Nav>
						<Nav.Link className='fw-bolder text-white fs-6' disabled>
							Welcome {username}
						</Nav.Link>
						<Button
							variant='secondary'
							className='fw-bolder text-white'
							onClick={() => setShowLogoutAlertModal(true)}>
							<img
								src={logoutIcon}
								alt='logoutIcon'
								width='32'
								height='32'
								style={{ marginRight: '10px' }}
							/>
							Logout
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<LogoutAlertModal
				isShow={showLogoutAlertModal}
				closeModal={() => setShowLogoutAlertModal(false)}
				yesLogout={() => logout()}
			/>
		</>
	)
}

export default NavbarMenu
