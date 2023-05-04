import { useState, useEffect } from 'react';

import {
	LOGIN_URL,
	USER_REGEX,
	TEL_REGEX,
	EMAIL_REGEX,
} from '../../Constants/Constants';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Box, Typography, CssBaseline } from '@mui/material';

//  import './LecturerRegistration.css'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LecturerRegistration = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telNumber, setTelNumber] = useState('');
	const [email, setEmail] = useState('');
	const [qualification, setQualification] = useState('');
	const [department, setDepartment] = useState('');

	// const userRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();

	const [errorFirstName, setErrorFirstName] = useState('');
	const [errorLastName, setErrorLastName] = useState('');
	const [errorTelNo, setErrorTelNo] = useState('');
	const [errorQualification, setErrorQualification] = useState('');
	const [errorEmail, setErrorEmail] = useState('');
	const [errorDepartment, setErrorDepartment] = useState('');
	const [errEntries, setErrEntries] = useState(false);

	const [errResponse, setErrResponse] = useState('');

	useEffect(() => {
		setErrEntries(false);
	}, [lastName, firstName, telNumber, qualification, email, department]);

	useEffect(() => {
		setErrResponse('Me I am Here!');
	}, [errResponse]);

	const ValidateAllDataEntries = () => {
		if (USER_REGEX.test(lastName) || lastName.length === 0) {
			setErrorLastName('');
		} else {
			setErrorLastName('Last Name is Invalid');
			setErrEntries(true);
		}

		if (USER_REGEX.test(firstName) || firstName.length === 0) {
			setErrorFirstName('');
		} else {
			setErrorFirstName('First Name is Invalid');
			setErrEntries(true);
		}

		if (USER_REGEX.test(qualification) || qualification.length === 0) {
			setErrorQualification('');
		} else {
			setErrorQualification('Entry is Invalid');
			setErrEntries(true);
		}

		if (TEL_REGEX.test(telNumber) || telNumber.length === 0) {
			setErrorTelNo('');
		} else {
			setErrorTelNo('Phone Number is Invalid');
			setErrEntries(true);
		}

		if (EMAIL_REGEX.test(email) || email.length === 0) {
			setErrorEmail('');
		} else {
			setErrorEmail('Email entry is Invalid');
			setErrEntries(true);
		}

		if (EMAIL_REGEX.test(department) || department.length === 0) {
			setDepartment('');
		} else {
			setDepartment('Department entry is Invalid');
			setErrEntries(true);
		}
	};

	const ResetInputEntries = () => {
		setErrEntries(false);

		setErrorLastName('');
		setErrorFirstName('');
		setErrorQualification('');
		setErrorTelNo('');
		setErrorEmail('');
		setErrorDepartment('');

		setLastName('');
		setFirstName('');
		setQualification('');
		setTelNumber('');
		setEmail('');
		setDepartment('');
	};

	const RegisterLecturer = async (e: React.FormEvent) => {
		e.preventDefault();

		ValidateAllDataEntries();

		if (errEntries) {
			return;
		}

		/// Place Entries in object format for Saving
		const entryData = {
			lastName,
			firstName,
			email,
			telNumber,
			qualification,
			department,
		};

		try {
			const response = await axios.post(LOGIN_URL, entryData, {});
			console.log(response?.data);

			//Store the token in global API Context, and use when sending
			// const accessToken = response?.data?.accessToken;

			ResetInputEntries();
		} catch (err: any) {
			console.log(err);
			if (!err?.response) {
				setErrResponse('No Server Response');
			} else if (err.response?.status === 400) {
				setErrResponse('Invalid Username or Password');
			} else if (err.response?.status === 401) {
				setErrResponse('Unauthorized');
			} else {
				setErrResponse('Login Failed');
			}
			setErrEntries(true);
		}
		setErrResponse('Me am here');
	};

	const EndRegistrationSession = () => {
		// navigate('/adminboard')
	};

	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				width: '30rem',
			}}>
			<CssBaseline />
			<Box sx={{ height: 'auto', border: 1, borderRadius: '1rem', p: 4 }}>
				<Box>Provide your login details to create lecturer profile</Box>

				{errResponse && <Box>{errResponse}</Box>}

				<Box
					component='form'
					onSubmit={RegisterLecturer}
					// sx={ {
					// 	display: 'flex',
					// 	flexDirection: 'column',
					// 	Width: '28rem',
					// border:1} }
				>
					<TextField
						fullWidth
						sx={{ maxWidth: '28.5rem' }}
						id='firstname'
						name='firstname'
						label='FirstName'
						placeholder='FirstName'
						autoFocus
						required
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						error={firstName.length > 0 && firstName.length < 3}
						helperText={
							firstName.length === 0 || firstName.length >= 2
								? ''
								: 'FirstName requires a minimum of 2 Characters'
						}
						InputLabelProps={{
							shrink: true,
						}}
						margin='normal'
					/>
					<TextField
						fullWidth
						sx={{ maxWidth: '28rem' }}
						id='lastName'
						name='lastName'
						label='LastName'
						placeholder='LastName'
						required
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						error={lastName.length > 0 && lastName.length < 3}
						helperText={
							lastName.length === 0 || lastName.length >= 2
								? ''
								: 'LastName requires a minimum of 3 Characters'
						}
						InputLabelProps={{
							shrink: true,
						}}
						margin='normal'
					/>
					<TextField
						fullWidth
						sx={{ maxWidth: '28rem' }}
						id='email'
						name='email'
						label='email'
						placeholder='email'
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={email.length > 0 && !EMAIL_REGEX.test(email)}
						helperText={
							email.length === 0 || EMAIL_REGEX.test(email)
								? ''
								: 'Email entered is incorrect.'
						}
						InputLabelProps={{
							shrink: true,
						}}
						margin='normal'
					/>
					<TextField
						fullWidth
						sx={{ maxWidth: '28rem' }}
						id='telNumber'
						name='telNumber'
						label='telNumber'
						placeholder='Telephone Number'
						required
						value={telNumber}
						onChange={(e) => setTelNumber(e.target.value)}
						error={email.length > 0 && !TEL_REGEX.test(email)}
						helperText={
							email.length === 0 || TEL_REGEX.test(email)
								? ''
								: 'Phone Number entered is incorrect.'
						}
						InputLabelProps={{
							shrink: true,
						}}
						margin='normal'
					/>
					<TextField
						fullWidth
						sx={{ maxWidth: '28rem' }}
						id='quailify'
						name='quailify'
						label='Qualification'
						placeholder='Qualification'
						required
						value={qualification}
						onChange={(e) => setQualification(e.target.value)}
						error={qualification.length > 0 && qualification.length < 6}
						helperText={
							qualification.length === 0 || qualification.length > 6
								? ''
								: 'Qualification entered is incorrect.'
						}
						InputLabelProps={{
							shrink: true,
						}}
						margin='normal'
					/>
					<TextField
						fullWidth
						sx={{ maxWidth: '28rem' }}
						id='department'
						name='department'
						label='Department'
						placeholder='Enter Department'
						required
						value={department}
						onChange={(e) => setDepartment(e.target.value)}
						error={department.length > 0 && department.length < 6}
						helperText={
							department.length === 0 || department.length > 6
								? ''
								: 'Department entered is incorrect.'
						}
						InputLabelProps={{
							shrink: true,
						}}
						margin='normal'
					/>
					<Button
						onClick={() => EndRegistrationSession()}
						type='submit'
						fullWidth
						variant='contained'>
						Save
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default LecturerRegistration;
