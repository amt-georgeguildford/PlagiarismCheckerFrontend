import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Topography from '@mui/material/Typography';


//Regular React imports
import { useState, useEffect } from 'react';
import { PWD_REGEX, SERVER_URL } from '../Constants/Constants';
import notification from '../config/notificationConfig';

import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
	const [verified, setVerified] = useState(false)
	// const [unauthorized, setUnauthorized] = useState(false)
	const navigate = useNavigate();
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	// const [passwordChange, setPasswordChange] = useState(false)
	// const [confirmPaswordChange, setConfirmPaswordChange] = useState(false)
	// const [errorMsg, setErrorMsg] = useState('');
	// const [success, setSuccess] = useState(true);

	const location= useLocation()
	const searchQuery= new URLSearchParams(location.search)
	// useEffect(() => {
	// 	if (password.length > 0 && password.length < 8) {
	// 		setErrorMsg('Invalid Password');
	// 	} else {
	// 		setErrorMsg('');
	// 	}
	// }, [password,confirmPassword]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		

		const createNewPassword = async () => {
			const passwordData = {
				password: password,
				confirmPassword: confirmPassword
			}
				console.log(passwordData)
			try {
				const response = await axios.post(SERVER_URL+'auth/account/reset',passwordData,{headers:{
					"Authorization": `Bearer ${searchQuery.get('token')!}`
				}});

				// When saved, give person an access token to be saved in localStorage
				const result = response.data;
				console.log (result)

				// setSuccess(true);
				setPassword('');
				setConfirmPassword('');			

				if (result.user.isverified) {

					localStorage.setItem('accessToken', result.tokens.accessToken);
					notification.success('Password Change Successful');

					if (result.user.role === 'ADMIN') {
						navigate('/adminboard');
					} else if (result.user.role === 'LECTURER') {
						navigate('/lecturerboard');
					} else if (result.user.role === 'STUDENT') {
						navigate('/studentboard');
					}
				} else {
					notification.info('Kindly Login to Your Account');
					navigate('/');
				}	
			} catch (err: any) {
				console.log(err)
				if(err){
					if(err.response){
						const {status, data}= err.response;
						const messages= data.message
						if(status===400 ){
							messages.forEach((field: any)=>{
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
		
		if ((PWD_REGEX.test(password) &&
			PWD_REGEX.test(confirmPassword)
			&& password === confirmPassword))
		{
			createNewPassword ()
		}
			
				
	}
	
	
	useEffect(()=>{
		const searchQuery= new URLSearchParams(location.search)
		const verifiedLink= async ()=>{
			try {
				console.log(searchQuery.get('token'))
				const userverified= await axios.get(SERVER_URL+'auth/verify/session', {
					headers:{
						"Authorization": `Bearer ${searchQuery.get('token')!}`
					}
				})
				console.log(userverified)
				setVerified(true)
			} catch (error) {
				setVerified(false)
				setUnauthorized(true)
			}
		}
		
		if(searchQuery.get('token')!==null){
			searchQuery.get('token')
			verifiedLink()
		}
	},[location])


	return (
		<>
			{	verified &&
				(
					<Container
				component='main'
				sx={{
					height: '100vh',
					pt: '6rem',
					pb: '8rem',
					px: '3.25rem',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<CssBaseline />

				<Box
					sx={{
						border: '0.5px solid #757575',
						borderRadius: '2rem',
						px: '3rem',
						py: '3.5rem',
						bgcolor: '#ffffff',
						maxwidth: '28.5rem',
						maxheight: '25.25rem',
					}}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<Topography
							variant='subtitle1'
							sx={{
								textAlign: 'center',
								lineHeight: '1.19rem',
								fontSize: '1rem',
							}}>
							Create New Password
						</Topography>
						<Box
							component='form'
							sx={{ mt: '2.5rem', maxWidth: '21.5rem', maxHeight: '20.25rem' }}
							onSubmit={handleSubmit}>
							<TextField
								fullWidth
								id='password'
								name='password'
								variant='outlined'
								type='password'
								label='New Password'
								placeholder='Password'
								autoFocus
								required
								value={password}
								onChange={(e) => {setPassword(e.target.value); setPasswordChange(true)}}
								error={(password.length < 8  && !PWD_REGEX.test(password))}
								helperText={
									(password.length < 8 && !PWD_REGEX.test(password))?
										'Password should be at least 8 characters': " "
								}
								InputLabelProps={ {
									shrink: true,
								}}
								
								margin='normal'
								sx={{
									mt: '0rem',
									mb: '0rem',
									borderRadius: '0.25rem',
									bordercolor: '#454545',
								}}
							/>
							<TextField
								fullWidth
								id='confirmpassword'
								variant='outlined'
								required
								type='password'
								name='confirmpassword'
								label='Confirm Password'
								placeholder='Password'
								value={confirmPassword}
								onChange={(e) =>{ setConfirmPassword(e.target.value); setConfirmPaswordChange(true)}}
								error={
									
									confirmPassword.length>0 && password !== confirmPassword && !PWD_REGEX.test(confirmPassword)
								}
								helperText={
									
									confirmPassword.length>0 && password !== confirmPassword && !PWD_REGEX.test(confirmPassword)?
										'Passwords incorrect or do not match.':  " "
								}
								InputLabelProps={{
									shrink: true,
								}}
								margin='normal'
								sx={{
									mt: '2.5rem',
									mb: '0',
									borderRadius: '0.25rem',
									bordercolor: '#454545',
								}}
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{
									mt: '2rem',
									height: '51px',
									bgcolor: '#3C5148',
									borderColor: '#FFFFFF',
									textTransform: 'none',
								}}>
								Save
							</Button>
						</Box>
					</Box>
				</Box>
			</Container>
				)
			}
		</>
	);
}

  

export default ResetPasswordPage