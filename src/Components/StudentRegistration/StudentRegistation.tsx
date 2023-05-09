import { useState} from 'react';
import { department as Department } from '../../Constants/Constants';
import notification from '../../config/notificationConfig';
import axios from 'axios';

import {
	SERVER_URL,
	USER_REGEX,
	TEL_REGEX,
	EMAIL_REGEX,
} from '../../Constants/Constants';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline';
import MenuItem from '@mui/material/MenuItem';


const StudentRegistation = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telNumber, setTelNumber] = useState('');
	const [email, setEmail] = useState('');
	const [department, setDepartment] = useState('');

	// const [errEntries, setErrEntries] = useState(false);
	// const [errResponse, setErrResponse] = useState('');

	// useEffect(() => {
	// 	setErrEntries(false);
	// 	setErrResponse('');
	// }, [lastName, firstName, telNumber, email, department]);

	const ValidateAllDataEntries = () => {
		if (!USER_REGEX.test(lastName)) {
			// setErrEntries(true);
			return false;
		}

		if (!USER_REGEX.test(firstName)) {
			return false;
		}

		if (!TEL_REGEX.test(telNumber)) {
			return false;
		}

		if (!EMAIL_REGEX.test(email)) {
			return false;
		}

		if (department===''){
			return false;
		}
		return true;
	};

	const ResetInputEntries = () => {
		setLastName('');
		setFirstName('');
		setTelNumber('');
		setEmail('');
		setDepartment('');
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const registerStudent= async ()=>{
			const entryData = {
				lastname:lastName,
				firstname:firstName,
				email,
				phone_number:telNumber,
				department,
			};
			try {
				//retrieve accessToken and add to header file when making post request
				const response = await axios.post(
					SERVER_URL + 'api/v1/staff/student',
					entryData);
	
				response.data && ResetInputEntries();

			} catch (err:any) {
				if (err.response?.status === 400) {
					err.response?.data?.forEach((field:any) => {
						field.path === 'lastName';
						field.path === 'firstName';
						field.path === 'email';
						field.path === 'telNumber';
						field.path === 'department';

						notification.error(field.msg);
					});
				} else {
					notification.error('Server Error');
				}
			}
		}
		if (ValidateAllDataEntries()) {
			registerStudent()
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
				width: '100vw',
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
					maxHeight: '43.5rem',
				}}>
				<Box
					sx={{
						fontSize: '16',
						color: '#252525',
						textAlign: 'center',
						mb: '0.3rem',
					}}>
					Provide your login details to create student profile
				</Box>
				{/* <Box
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
				</Box> */}
				<Box
					component='form'
					onSubmit={handleSubmit}
					sx={{ maxWidth: '28.5rem', mt: '0.2rem' }}>
					<TextField
						fullWidth
						sx={{ maxWidth: '22.5rem', mb: '1rem' }}
						id='firstname'
						name='firstname'
						label='FirstName'
						placeholder='FirstName'
						autoFocus
						required
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						error={firstName.length > 0 && firstName.length < 2}
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
						sx={{ maxWidth: '22.5rem', mb: '1rem' }}
						id='lastName'
						name='lastName'
						label='LastName'
						placeholder='LastName'
						required
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						error={lastName.length > 0 && lastName.length < 2}
						helperText={
							lastName.length === 0 || lastName.length >= 2
								? ' '
								: 'Lastname requires a minimum of 2 Characters'
						}
						InputLabelProps={{
							shrink: true,
						}}
						margin='dense'
					/>
					<TextField
						fullWidth
						sx={{ maxWidth: '22.5rem', mb: '1rem' }}
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
								: 'Email entered is incorrect.'
						}
						InputLabelProps={{
							shrink: true,
						}}
						margin='dense'
					/>
					<TextField
						fullWidth
						sx={{ maxWidth: '22.5rem', mb: '1rem' }}
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
						sx={{ maxWidth: '22.5rem', mb: '1rem' }}
						id='department'
						name='department'
						label='Department'
						placeholder='Enter Department'
						select
						required
						value={department}
						onChange={(e) => setDepartment(e.target.value)}
						// error={department.length > 0 && department.length < 3}
						// helperText={
						// 	department.length === 0 || department.length >= 3
						// 		? ' '
						// 		: 'Department must be at least 6 Characters.'
						// }
						InputLabelProps={{
							shrink: true,
						}}
						margin='normal'
					>
						<MenuItem
							key='i1'
							value=''>
							<em>select department</em>
						</MenuItem>
						{Department.map((option) => (
							<MenuItem
								key={option.id}
								value={option.id}>
								{option.name}
							</MenuItem>
						))}
					</TextField>
					<Button
						type='submit'
						fullWidth
						variant='contained'
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

export default StudentRegistation;
