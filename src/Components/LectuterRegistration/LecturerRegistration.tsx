import { useState, useEffect } from 'react';

import {
	LOGIN_URL,
	USER_REGEX,
	TEL_REGEX,
	EMAIL_REGEX,
} from '../../Constants/Constants';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Box, CssBaseline } from '@mui/material';


import axios from 'axios';


const LecturerRegistration = () => {

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telNumber, setTelNumber] = useState('');
	const [email, setEmail] = useState('');
	const [qualification, setQualification] = useState('');
	const [department, setDepartment] = useState('');

	// const navigate = useNavigate();

	const [errEntries, setErrEntries] = useState(false);
	const [errResponse, setErrResponse] = useState('');

	useEffect(() => {
	
			setErrEntries(false);
			setErrResponse('')

	}, [lastName, firstName, telNumber, qualification, email, department]);



	const ValidateAllDataEntries = () => {
		if (USER_REGEX.test(lastName)) {
			setErrEntries(true);
			return;
		}

		if (USER_REGEX.test(firstName)) {
			setErrEntries(true);
			return;
		}

		if (USER_REGEX.test(qualification)) {
			setErrEntries(true);
			return;
		}

		if (TEL_REGEX.test(telNumber)) {
			setErrEntries(true);
			return;
		}

		if (EMAIL_REGEX.test(email)) {
			setErrEntries(true);
			return;
		}

		if (EMAIL_REGEX.test(department)) {
			setErrEntries(true);
			return;
		}
	};

	const ResetInputEntries = () => {
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
			setErrResponse('Record Successfully Saved');
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
		
		}


	};

	
	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				// maxwidth: '30rem',
				width: '100%',
			}}>
			<CssBaseline />
			<Box
				sx={{
					border: 1,
					borderRadius: '1rem',
					py: 4,
					pl: 6,
					pr: 5,
					my: 3,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					maxWidth: '28.5rem',
				}}>
				<Box
					sx={{
						fontSize: '16',
						color: '#252525',
						textAlign: 'center',
						mb: '0.2rem',
					}}>
					Provide your login details to create lecturer profile
				</Box>
				<Box
					sx={{
						height: '2rem',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					{errResponse && (
						<Box
							sx={{
								fontSize: '1rem',
								fontWeight: 400,
								color: 'red',
								mt: '0.8rem',
								width: '100%',
								height: '2rem',
								textAlign: 'center',
							}}>
							{errResponse}
						</Box>
					)}
				</Box>
				<Box
					component='form'
					onSubmit={RegisterLecturer}
					sx={{ maxWidth: '28.5rem' }}>
					<TextField
						fullWidth
						sx={{ maxWidth: '22.5rem', mb: '0.3rem' }}
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
								? ' '
								: 'FirstName requires a minimum of 2 Characters'
						}
						InputLabelProps={{
							shrink: true,
						}}
						margin='dense'
					/>
					<TextField
						fullWidth
						sx={{ maxWidth: '22.5rem', mb: '0.3rem' }}
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
								? ' '
								: 'Lastname requires a minimum of 3 Characters'
						}
						InputLabelProps={{
							shrink: true,
						}}
						margin='dense'
					/>
					<TextField
						fullWidth
						sx={{ maxWidth: '22.5rem', mb: '0.3rem' }}
						id='email'
						name='email'
						label='Email'
						placeholder='Email'
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={email.length > 0 && !EMAIL_REGEX.test(email)}
						helperText={
							email.length === 0 || EMAIL_REGEX.test(email)
								? ' '
								: 'Email requires a minimum of 6 Characters.'
						}
						InputLabelProps={{
							shrink: true,
						}}
						margin='dense'
					/>
					<TextField
						fullWidth
						sx={{ maxWidth: '22.5rem', mb: '0.3rem' }}
						id='telNumber'
						name='telNumber'
						label='Number'
						placeholder='Number'
						required
						value={telNumber}
						onChange={(e) => setTelNumber(e.target.value)}
						error={telNumber.length > 0 && !TEL_REGEX.test(telNumber)}
						helperText={
							telNumber.length === 0 || TEL_REGEX.test(telNumber)
								? ' '
								: 'Telephone Number must be at least 10 digits.'
						}
						InputLabelProps={{
							shrink: true,
						}}
						margin='dense'
					/>
					<TextField
						fullWidth
						sx={{ maxWidth: '22.5rem', mb: '0.3rem' }}
						id='quailify'
						name='quailify'
						label='Qualification'
						placeholder='Qualification'
						required
						value={qualification}
						onChange={(e) => setQualification(e.target.value)}
						error={qualification.length > 0 && qualification.length < 6}
						helperText={
							qualification.length === 0 || qualification.length >= 6
								? ' '
								: 'Qualification must be at least 6 Characters.'
						}
						InputLabelProps={{
							shrink: true,
						}}
						margin='dense'
					/>
					<TextField
						fullWidth
						sx={{ maxWidth: '22.5rem', mb: '1rem' }}
						id='department'
						name='department'
						label='Department'
						placeholder='Enter Department'
						required
						value={department}
						onChange={(e) => setDepartment(e.target.value)}
						error={department.length > 0 && department.length < 6}
						helperText={
							department.length === 0 || department.length >= 6
								? ' '
								: 'Department must be at least 6 Characters.'
						}
						InputLabelProps={{
							shrink: true,
						}}
						margin='dense'
					/>
					<Button
						// onClick={EndRegistrationSession}
						type='submit'
						fullWidth
						variant='contained'
						// disabled={!errEntries}
						sx={{
							maxWidth: '22.5rem',
							bgcolor: '#3C5148',
							borderRadius: '0.5rem',
							border: '1 Solid #FFFFFF',
							fontFamily: 'Exo, sans-serif',
							fontWeight: 500,
							fontSize: 20,
							textTransform: 'none',
						}}>
						Save
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default LecturerRegistration;
