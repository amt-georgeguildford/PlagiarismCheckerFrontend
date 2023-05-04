import { useState, useEffect, useRef } from 'react';
import { LOGIN_URL, USER_REGEX, TEL_REGEX } from '../../Constants/Constants';

// import axios from 'axios'
import { Link } from 'react-router-dom';

const RegisterNewLecturer = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telNumber, setTelNumber] = useState('');
	const [email, setEmail] = useState('');
   	const [qualification, setQualification] = useState(''); 
    const [department, setDepartment] = useState('');


	const userRef = useRef<HTMLInputElement | null>(null);

	const [errorFirstName, setErrorFirstName] = useState('');
	const [errorLastName, setErrorLastName] = useState('');
	const [errorTelNo, setErrorTelNo] = useState('');
	const [errorQualification, setErrorQualification] = useState('');
	const [errorEmail, setErrorEmail] = useState('');
	const [errorDepartment, setErrorDepartment] = useState('');

	const [isValidEntry, setIsValidEntry] = useState(false);
	// const [success, setSuccess] = useState(false);

	// useEffect(() => {
	// 	setIsValidEntry('');
	// }, [password, userName]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (USER_REGEX.test(lastName)) {
			setErrorLastName('');
		} else {
			setErrorLastName('Last Name is Invalid');
        }
        
		if (USER_REGEX.test(firstName)) {
			setErrorFirstName('');
		} else {
			setErrorFirstName('First Name is Invalid');
        }
        
		if (USER_REGEX.test(qualification)) {
			setErrorQualification('');
		} else {
			setErrorQualification('Entry is Invalid');
		}

		if (TEL_REGEX.test(telNumber)) {
			setErrorTelNo('');
		} else {
			setErrorTelNo('Phone Number is Invalid');
		}

		

        if (errorMsg) {
            setIsValidEntry(false)
			return;
		}

		try {
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify({
					userName: userName,
					password: password,
				})
			);
			console.log(response?.data);

			//Store the token in global API Context, and use when sending
			// const accessToken = response?.data?.accessToken;

			setSuccess(true);
			setPassword('');
			setUserName('');
		} catch (err: any) {
			console.log(err);
			if (!err?.response) {
				setErrorMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrorMsg('Invalid Username or Password');
			} else if (err.response?.status === 401) {
				setErrorMsg('Unauthorized');
			} else {
				setErrorMsg('Login Failed');
			}
		}
	};

	return (
		<>
			<div>Add New Lecturers</div>
			<Link to='/adminboard'>
				<button>Back</button>
			</Link>
		</>
	);

	// 	return (
	// 		<>
	// 			{success ? (
	// 				<section>
	// 					<h1>Login Successful</h1>
	// 					<br />
	// 					<p>
	// 						<a href='#'>Go to dashboard</a>
	// 					</p>
	// 				</section>
	// 			) : (
	// 				<section className='maincontainer'>
	// 					{{ errorMsg } && <p>{errorMsg}</p>}
	// 					<form
	// 						onSubmit={handleSubmit}
	// 						className='login_container'>
	// 						<label htmlFor='username'>Username</label>
	// 						<input
	// 							type='text'
	// 							id='username'
	// 							ref={userRef}
	// 							onChange={(e) => setUserName(e.target.value)}
	// 							value={userName}
	// 						/>
	// 						<label htmlFor='password'>password</label>
	// 						<input
	// 							type='password'
	// 							id='password'
	// 							value={password}
	// 							required
	// 							onChange={(e) => setPassword(e.target.value)}
	// 						/>
	// 						<button>Sign In</button>
	// 					</form>
	// 				</section>
	// 			)}
	// 		</>
	// 	);
};

export default RegisterNewLecturer;
