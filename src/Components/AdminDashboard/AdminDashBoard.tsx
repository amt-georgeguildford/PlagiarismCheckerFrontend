import { Link } from 'react-router-dom';
const AdminDashboard = () => {
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
