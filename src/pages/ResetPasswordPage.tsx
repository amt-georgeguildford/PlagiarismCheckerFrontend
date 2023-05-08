import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Topography from '@mui/material/Typography';


//Regular React imports
import { useState } from 'react';
import { PWD_REGEX, SERVER_URL } from '../Constants/Constants';
import notification from '../config/notificationConfig';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
 
	const navigate = useNavigate();
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	// const [errorMsg, setErrorMsg] = useState('');
	// const [success, setSuccess] = useState(true);


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
				
			try {
				const response = await axios.post(SERVER_URL,passwordData );

				// When saved, give person an access token to be saved in localStorage
				const result = response.data;

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

	return (
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
					border: 1,
					borderRadius: 2,
					mt: 10,
					px: 10,
					pt: 4,
					pb: 7,
					bgcolor: '#ffffff',
					width: '31rem',
					height: '34rem',
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
							mt: 2,
							mb: 1,
							lineHeight: '1.2rem',
						}}>
						Create New Password
					</Topography>
					<Box
						component='form'
						sx={{ mt: 2, mb: 2 }}
						onSubmit={ handleSubmit }
					>
						<TextField
							fullWidth
							id='password'
							name='password'
							variant='outlined'
							type='password'
							label='password'
							placeholder='New Password'
							autoFocus
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							error={password.length > 0 && PWD_REGEX.test(password) === false}
							helperText={
								password.length === 0 || PWD_REGEX.test(password)
									? ' '
									: 'Password should be a minimum of 8 characters with uppercase,lowercase and special character (!,#,$,%,^,*,+,-,_,=,?,@,|)'
							}
							InputLabelProps={{
								shrink: true,
							}}
							margin='normal'
						/>
						<TextField
							fullWidth
							id='confirmpassword'
							variant='outlined'
							required
							type='password'
							name='confirmpassword'
							label='Confirm Password'
							placeholder='Confirm Password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							error={
								(confirmPassword.length > 0 && !PWD_REGEX.test(password)) ||
								password !== confirmPassword
							}
							helperText={
								confirmPassword.length === 0 ||
								(PWD_REGEX.test(confirmPassword) &&
									password !== confirmPassword)
									? ' '
									: 'Passwords do not match.'
							}
							InputLabelProps={{
								shrink: true,
							}}
							margin='normal'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{
								mt: 4,
								mb: 3,
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
	);
}

  

export default ResetPasswordPage