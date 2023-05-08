import Login from './Login';
import AdminDashboard from './Components/AdminDashboard/AdminDashBoard';
import Lecturerdashboard from './Components/LecturerDashboard/LecturerDashboard';
import StudentDashboard from './Components/StudentDashboard/StudentDashboard';
import LecturerRegistration from './Components/LecturerRegistration/LecturerRegistration';
import StudentRegistation from './Components/StudentRegistration/StudentRegistation';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResetPasswordPage from './pages/ResetPasswordPage';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
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
					<Route path='/reset' element={<ResetPasswordPage />}/>
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
