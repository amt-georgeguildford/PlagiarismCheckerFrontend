import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../../Constants/Constants';
import { InitialContext } from '../../context/context';
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
