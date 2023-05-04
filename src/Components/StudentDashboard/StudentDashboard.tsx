import { Link } from 'react-router-dom';
const StudentDashboard = () => {
	return (
		<div>
			<h1>Student Dashboard</h1>
			<Link to='/studentupload'>
				<button>Upload Project</button>
			</Link>
			<Link to='/'>
				<button>Home</button>
			</Link>
		</div>
	);
};

export default StudentDashboard;
