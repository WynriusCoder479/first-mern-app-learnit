import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import NavbarMenu from '../layout/NavbarMenu'

const ProtectedRoute = ({ props: any }) => {
	const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	if (authLoading)
		return (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)

	return isAuthenticated ? (
		<>
			<NavbarMenu />
			<Outlet />
		</>
	) : (
		<Navigate to={'/login'} />
	)
}

export default ProtectedRoute
