import axios from 'axios';
import { useEffect, useContext } from 'react';
import { InitialContext } from '../../context/context';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../../Constants/Constants';
const AdminDashboard = () => {
	const {setDepartments}= useContext(InitialContext)
	useEffect(()=>{
		const fetchDepartment = async ()=>{
			try {
				const departments= await axios.get(SERVER_URL+'departments')
				setDepartments(departments.data.result)

			} catch (error) {
				console.log(error)
			}
		}
		fetchDepartment()
	}, [])
	return (
		<div>
			<h1>Admin DashBoard</h1>
			<Link to='/newlecturer'>
				<button>Add New Lecturers</button>
			</Link>
			<Link to='/department'>
				<button>Add New Departments</button>
			</Link>
			<Link to='/'>
				<button>Back</button>
			</Link>
		</div>
	);
};

export default AdminDashboard;
