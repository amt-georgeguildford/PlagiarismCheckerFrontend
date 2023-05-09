import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Topography from '@mui/material/Typography';



//Regular React imports
import { useState } from 'react';
import {EMAIL_REGEX, SERVER_URL} from '../../Constants/Constants';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import notification from '../../config/notificationConfig';

 


const ForgetPassword = () => {
	
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false)
	const [userName, setUserName] = useState('');
	const [success, setSuccess] = useState(false);
	const [messages, setMessages] = useState('');

	const [userNameChange, setUserNameChange] = useState(false)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();


		if (success) {
			CloseResetPage();
			return;
		}
		const  postRequestReset= async ()=>{
			const requestBody ={
				email: userName
			}
			console.log(41, requestBody)
			try {
				const response = await axios.post(
					SERVER_URL+'auth/reset/password/',
					requestBody
				);
				notification.success('Request for password reset successful')
				// if (response.data.status.ok) {
				// 	setMessages(
				// 		'Kindly check your email for instructions on your account password reset.'
				// 	);
					
				// }
			} catch (err:any) {
				// const errors = err as Error | AxiosError;
				console.log(err);
				if(err){

					if (err.response) {
						const {status, data}= err.response
						if(status=== 400){
							data.message.forEach((field: any)=>{
								field.path==='email' && setSuccess(false)
								notification.error(field.msg)
							})
						}
						else{
							notification.error('Something went wrong')
						}
						setMessages('Server is Currently Unavailable. Try Again Later.');
					} else {
						setMessages('Request Cannot Be Currently Processed. Try Again Later');
					}
				}
				else{
					notification.error('Server Unavailable')
				}
			}
			setSuccess(true);
		}

		if(EMAIL_REGEX.test(userName)){
			postRequestReset()
		}
		
	};

	const CloseResetPage = () => {
		setUserName('');
		navigate('/')
	}

	return (
		<Container
			component='main'
			sx={{
				height: '100vh',
				width: '100vw',
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
					maxWidth: '30.5rem',
					maxHeight: '20rem',
					border: 1,
					px: 5,
					py: 2,
					borderRadius: 5,
				}}>
				<Box>
					<Topography
						sx={{
							textAlign: 'center',
							mt: 2,
							mb: 3,
							lineHeight: '1rem',
							maxWidth: '22.5rem',
						}}>
						{/* {success
							? 'Password reset request has been made.'
							: 'Kindly provide your email address for password reset'} */}

						Kindly provide your email address for password reset
					</Topography>
					{/* <Box
						sx={{
							width: '100%',
							height: '2rem',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							maxWidth: '22.5rem',
							Height:'3rem',
							mb:'2rem'
						}}>
						{messages && (
							<Box
								component='span'
								sx={{
									color: 'red',
									fontSize: '1rem',
									fontWeight: 300,
									mt: '0.8rem',
									width: '100%',
									height: '2rem',
									textAlign: 'center',
								}}>
								{messages}
							</Box>
						)}
					</Box> */}

					<Box
						component='form'
						sx={{ mt: 3, mb: 2, maxWidth: '22.5rem' }}
						onSubmit={handleSubmit}>
						<TextField
							fullWidth
							id='email'
							name='email'
							label='User Email'
							placeholder='User Email'
							autoFocus
							required
							value={userName}
							onChange={(e) => {setUserName(e.target.value); setUserNameChange(true)}}
							error={(userName.length === 0 || !EMAIL_REGEX.test(userName)) && userNameChange }
							helperText={
								(userName.length === 0 || !EMAIL_REGEX.test(userName)) && userNameChange? 
									'Enter a valid email': " "
							}
							InputLabelProps={{
								shrink: true,
							}}
							margin='dense'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{
								mt: 1,
								mb: 2,
								height: '51px',
								bgcolor: '#3C5148',
								borderColor: '#FFFFFF',
								textTransform: 'none',
							}}>
							{`${!success ? 'Submit' : 'Close'}`}
						</Button>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

export default ForgetPassword;
