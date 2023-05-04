import Login from './Login';
import AdminDashboard from './Components/AdminDashboard/AdminDashBoard';
import Lecturerdashboard from './Components/LecturerDashboard/LecturerDashboard';
import StudentDashboard from './Components/StudentDashboard/StudentDashboard';



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



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
						path='/adminboard'
						element={<AdminDashboard />}
					/>
					<Route
						path='/lecturerboard'
						element={<Lecturerdashboard />}
					/>
					<Route
						path='/studentboard'
						element={<StudentDashboard />}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
