import { useContext, useState } from 'react';
import axios from 'axios';
import notification from '../../config/notificationConfig';

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
import { InitialContext } from '../../context/context';
import { NewUserFormChange } from '../../utilis/Types';


const LecturerRegistration = () => {
	const [serverError, setServerError] = useState({} as NewUserFormChange)
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telNumber, setTelNumber] = useState('');
	const [email, setEmail] = useState('');
	const [qualification, setQualification] = useState('');
	const [department, setDepartment] = useState('');
	
	const [formChange, setFormChange] = useState({} as NewUserFormChange)
	const {departments} = useContext(InitialContext)
	// const navigate = useNavigate();

	// const [errEntries, setErrEntries] = useState(false);
	// const [errResponse, setErrResponse] = useState('');

	// useEffect(() => {
	
	// 		// setErrEntries(false);
	// 		setErrResponse('')

	// }, [lastName, firstName, telNumber, qualification, email, department]);


	
	const ValidateAllDataEntries = () => {
		if (!USER_REGEX.test(lastName)) {
			return false;
		}

		if (!USER_REGEX.test(firstName)) {
			return false;
		}

		if (qualification.length<1) {
			return false;
		}

		if (!TEL_REGEX.test(telNumber)) {
			return false;
		}

		if (!EMAIL_REGEX.test(email)) {
			return false;
		}

		if (department==='select department') {
			return false;
		}
		return true
	};

	const ResetInputEntries = () => {
		setLastName('');
		setFirstName('');
		setQualification('');
		setTelNumber('');
		setEmail('');
		setDepartment('');
	};

	const HandleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const RegisterNewLecturer = async () => {
			try {
				const entryData = {
					lastname: lastName,
					firstname: firstName,
					email,
					phone_number: telNumber,
					qualification,
					department,
				};

				//retrieve accessToken and add to header file when making post request

				const response = await axios.post(
					SERVER_URL + 'api/v1/admin/lecturer',
					entryData
				);
				setFormChange({firstname: false, lastname: false, department: false, email:false,number: false, qualification: false})	
				console.log(response)
				ResetInputEntries()
				notification.success('New Lecture Account Created')

			} catch (err: any) {
				console.log(err)
				if(err){
					console.log(err)
					if(err.response){
						const {status, data}= err.response;
						const messages= data.message
						console.log('gerer')
						if(status===400 ){
							messages.forEach((field: any)=>{
								field.path==='firstname'&& setServerError({...serverError, firstname: true});
								field.path==='lastname'&& setServerError({...serverError, lastname: true})
								field.path==='email' && setServerError({...serverError, email: true})
								field.path==='phone_number' && setServerError({...serverError, number: true})
								field.path==='qualification' && setServerError({...serverError, qualification: true})
								field.path==='department'&& setServerError({...serverError, department: true})
								notification.error(field.msg)
							})
						}
						else{
							notification.error('Server Error')
						}
						return
					}
					notification.error('Check connection')
					
				}
				else{
					notification.error('Check connection')
				}
			}
		}

		if (ValidateAllDataEntries()) {
			RegisterNewLecturer()
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
						mb: '0.8rem',
					}}>
					Provide your login details to create lecturer profile
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
					onSubmit={HandleSubmit}
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
						onChange={(e) => {setFirstName(e.target.value); setFormChange({...formChange, firstname: true})}}
						error={(firstName.length === 0  && formChange.firstname) || serverError.firstname}
						helperText={
							(firstName.length ==0 && formChange.firstname)?
								 'Firstname field is empty ': " "
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
						onChange={(e) => {setLastName(e.target.value); setFormChange({...formChange, lastname: true})}}
						error={(lastName.length === 0 && formChange.lastname) || serverError.lastname }
						helperText={
							(lastName.length === 0 && formChange.lastname) ?
								 'Lastname field is empty ' : " "
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
						onChange={(e) => {setEmail(e.target.value); setFormChange({...formChange, email: true})}}
						error={ (!EMAIL_REGEX.test(email) && formChange.email)|| serverError.email}
						helperText={
							!EMAIL_REGEX.test(email) && formChange.email
								? 'Email incorrect.' : " "
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
						onChange={(e) => {setTelNumber(e.target.value); setFormChange({...formChange, number:true})}}
						error={(!TEL_REGEX.test(telNumber) && formChange.number) || serverError.number}
						helperText={
							!TEL_REGEX.test(telNumber) && formChange.number
								? 'Telephone Number must be at least 10 digits.' : " "
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
						onChange={(e) => {setQualification(e.target.value); setFormChange({...formChange, qualification:true})}}
						error={(qualification.length ==0 && formChange.qualification || serverError.qualification)}
						helperText={
							(qualification.length === 0 && formChange.qualification)?
								'Qualification field is empty.': " "
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
						select
						value={department}
						onChange={(e) => {setDepartment(e.target.value); setFormChange({...formChange, department: true})}}
						error={(department ==='select department' && formChange.department) || serverError.department}
						helperText={
							department=== 'select department'?
								'Select a department': " "
						}
						InputLabelProps={{
							shrink: true,
						}}
						margin='dense'>
						<MenuItem
							key='i1'
							value='select department'
							onChange={()=>setDepartment("")}>
							<em>select department</em>
						</MenuItem>
						{departments.map((option) => (
							<MenuItem
								key={option.id}
								value={option.id}
								onChange={()=>setDepartment(option
								.id)}>
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

export default LecturerRegistration;
