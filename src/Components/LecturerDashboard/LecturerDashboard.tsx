import { Link } from 'react-router-dom';
const Lecturerdashboard = () => {
	return (
		<div>
			<h1>Lecturer Dashboard</h1>
			<Link to='/register_students'>
				<button>Add Student</button>
			</Link>
			<Link to='/'>
				<button>Home</button>
			</Link>
		</div>
	);
};

export default Lecturerdashboard;
