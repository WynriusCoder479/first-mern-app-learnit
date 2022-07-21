import { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {
	//context
	const { loginUser } = useContext(AuthContext)

	//local state
	const [loginForm, setLoginForm] = useState({
		username: '',
		password: ''
	})

	const [Alert, setAlert] = useState(null)

	const { username, password } = loginForm

	const onChangeLoginForm = event =>
		setLoginForm({
			...loginForm,
			[event.target.name]: event.target.value
		})

	const login = async event => {
		event.preventDefault()

		try {
			const loginData = await loginUser(loginForm)
			if (!loginData.success) {
				setAlert({ type: 'danger', message: loginData.message })
				setTimeout(() => setAlert(null), 5000)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<Form className='my-4' onSubmit={login}>
				<AlertMessage info={Alert} />
				<Form.Group className='mb-4'>
					<Form.Control
						type='text'
						placeholder='Username'
						name='username'
						required
						value={username}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Form.Group className='mt-2 mb-4'>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
						value={password}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Button variant='success' type='submit'>
					Login
				</Button>
			</Form>
			<p>
				Don't have an account ?
				<Link to={'/register'} style={{ marginLeft: '5px' }}>
					Register
				</Link>
			</p>
		</>
	)
}

export default LoginForm
