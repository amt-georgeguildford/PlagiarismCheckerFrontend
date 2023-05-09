import Login from './Login';
import AdminDashboard from './Components/AdminDashboard/AdminDashBoard';
import Lecturerdashboard from './Components/LecturerDashboard/LecturerDashboard';
import StudentDashboard from './Components/StudentDashboard/StudentDashboard';
import LecturerRegistration from './Components/LecturerRegistration/LecturerRegistration';
import StudentRegistation from './Components/StudentRegistration/StudentRegistation';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ResetPasswordPage from './pages/ResetPasswordPage';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { retrieveaccessToken } from './utilis/sessionToken';
import { SERVER_URL } from './Constants/Constants';
import { InitialContext } from './context/context';

function App() {
	const {setUserVerified,setUserAccount} = useContext(InitialContext)
	useEffect(()=>{
		const verifyUser=async ()=>{
			try {
				const verified= await axios.get(SERVER_URL+'auth/verify/user', {
					headers:{
						"Authorization": `Bearer ${localStorage.getItem('accessToken')}`
					}
				})
				console.log(verified)
				const {islogin, user}= verified.data;
				if(islogin){
					setUserVerified(true)
					setUserAccount({...user})
					return 
				}
				setUserVerified(false)
			} catch (error) {
				console.log(error)
				setUserVerified(false)
			}
		}
		verifyUser()
	},[])
	return (
		<>
			<Router>
				<Routes>
					<Route
						path='/'
						element={<Login />}
					/>

					<Route
						path='/lostpassword'
						element={<ForgetPassword />}
					/>

					<Route
						path='/adminboard'
						element={<AdminDashboard />}
					/>
					<Route
						path='/newlecturer'
						element={<LecturerRegistration />}
					/>
					<Route
						path='/lecturerboard'
						element={<Lecturerdashboard />}
					/>
					<Route
						path='/studentboard'
						element={<StudentDashboard />}
					/>
					<Route
						path='/newstudent'
						element={<StudentRegistation />}
					/>
					<Route path='/reset/:id' element={<ResetPasswordPage />}/>
					<Route
						path='*'
						element={<AdminDashboard />}
					/>
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
