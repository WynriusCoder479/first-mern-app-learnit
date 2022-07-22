import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import useViewport from './customHook/useViewport'

const Auth = ({ authRoute }) => {
	const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	const viewPort = useViewport()

	const isMobile = viewPort.width <= 1024

	let body
	if (authLoading)
		body = (
			<div className='d-flex justify-content-center mt-2'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	else if (isAuthenticated) return <Navigate replace to={'/dashboard'} />
	else
		body = (
			<>
				{authRoute === 'login' && <LoginForm />}
				{authRoute === 'register' && <RegisterForm />}
			</>
		)
	return (
		<div className='landing'>
			<div className='dark-overlay'>
				<div className={isMobile ? 'landing-inner-mobile' : 'landing-inner'}>
					<h1 className='text-white'>LearnIt</h1>
					<h4 className='text-white'>
						Let us make your learning easier and more effective
					</h4>
					{body}
				</div>
			</div>
		</div>
	)
}

export default Auth
