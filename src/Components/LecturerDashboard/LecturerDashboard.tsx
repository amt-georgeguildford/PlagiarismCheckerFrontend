import axios from 'axios';
import {useContext, useEffect} from'react'
import { Link } from 'react-router-dom';
import { InitialContext } from '../../context/context';
import { SERVER_URL } from '../../Constants/Constants';
const Lecturerdashboard = () => {
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
			<h1>Lecturer Dashboard</h1>
			<Link to='/newstudent'>
				<button>Add Student</button>
			</Link>
			<Link to='/'>
				<button>Home</button>
			</Link>
		</div>
	);
};

export default Lecturerdashboard;
