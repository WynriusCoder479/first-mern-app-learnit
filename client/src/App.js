import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './components/layout/Landing'
import ProtectedRoute from './components/routing/ProtectedRoute'
import AuthContextProvider from './contexts/AuthContext'
import PostContextProvider from './contexts/PostContext'
import About from './views/About'
import Auth from './views/Auth'
import Dashboard from './views/Dashboard'

function App() {
	return (
		<AuthContextProvider>
			<PostContextProvider>
				<Router>
					<Routes>
						<Route path='/' element={<Landing />} />
						<Route exact path='/dashboard' element={<ProtectedRoute />}>
							<Route exact path='' element={<Dashboard />} />
						</Route>
						<Route exact path='/about' element={<ProtectedRoute />}>
							<Route exact path='' element={<About />} />
						</Route>
						<Route path='/login' element={<Auth authRoute='login' />} />
						<Route path='/register' element={<Auth authRoute='register' />} />
					</Routes>
				</Router>
			</PostContextProvider>
		</AuthContextProvider>
	)
}
export default App
