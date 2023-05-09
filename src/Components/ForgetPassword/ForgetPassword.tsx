import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Topography from '@mui/material/Typography';
import VerifiedUserSharpIcon from '@mui/icons-material/VerifiedUserSharp';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


//Regular React imports
import { useState } from 'react';
import {EMAIL_REGEX, SERVER_URL} from '../../Constants/Constants';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import notification from '../../config/notificationConfig';

 


const ForgetPassword = () => {
	
	const navigate = useNavigate();
	// const [isLoading, setIsLoading] = useState(false)
	const [userName, setUserName] = useState('');
	const [success, setSuccess] = useState(false);
	const [submit, setSubmit] = useState(false);

	const [userNameChange, setUserNameChange] = useState(false)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (submit) {
			CloseResetPage();
			return;
		}
		const  postRequestReset= async ()=>{
			const requestBody ={
				email: userName
			}
			setSubmit(true)
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
				response.status === 200 && setSuccess(true)
				// setMessages('ok')
			} catch (err:any) {
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
						// setMessages('Server is Currently Unavailable. Try Again Later.');
						// setMessages('nok')
						notification.error('Server Unavailable')

					} else {
						// setMessages('Request Cannot Be Currently Processed. Try Again Later');
						// setMessages('nok');
						notification.error('Server Unavailable')
					}
				}
				else{
					notification.error('Server Unavailable')
				}
				setSuccess(false);
			}
			
		}

		if(EMAIL_REGEX.test(userName)){
			postRequestReset()
		}
		
	};

	const CloseResetPage = () => {
		setUserName('');
		navigate('/')
		setSubmit(false)
	}

	return (
		<>
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
						{!submit ? (
							<Topography
								sx={{
									textAlign: 'center',
									mt: 2,
									mb: 3,
									lineHeight: '1rem',
									maxWidth: '22.5rem',
								}}>
								Kindly provide your email address for password reset
							</Topography>
						) : (
							<Topography
								sx={{
									textAlign: 'justify-left',
									mt: 2,
									mb: 3,
									lineHeight: '1rem',
									maxWidth: '20.5rem',
								}}>
								{success
									? 'Password reset request was successful.Kindly check your email for instructions on your account password reset.'.toUpperCase()
									: 'Sorry,Server is currently unavailable and Password reset request was unsuccessful.Kindly try again later.'.toUpperCase()}
							</Topography>
						)}
						<Box
							component='form'
							sx={{ mt: 3, mb: 2, maxWidth: '22.5rem' }}
							onSubmit={handleSubmit}>
							{!submit ? (
								<TextField
									fullWidth
									id='email'
									name='email'
									type='email'
									label='User Email'
									placeholder='User Email'
									autoFocus
									required
									value={userName}
									onChange={(e) => {
										setUserName(e.target.value);
										setUserNameChange(true);
									}}
									error={
										(userName.length !== 0 && !EMAIL_REGEX.test(userName)) &&
										userNameChange
									}
									helperText={
										(userName.length !== 0 && !EMAIL_REGEX.test(userName)) &&
										userNameChange
											? 'Enter a valid email'
											: ' '
									}
									InputLabelProps={{
										shrink: true,
									}}
									margin='dense'
								/>
							) : (
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-evenly',
										mb: 4,
									}}>
									<ManageAccountsIcon
										sx={{ color: 'blue', fontSize: '2rem', ml:1 }}
									/>
									<Topography variant='h6' >{userName}</Topography>

									{success ? (
										<VerifiedUserSharpIcon
											sx={{ color: 'green', fontSize: '2rem' }}
										/>
									) : (
										<HighlightOffIcon
											sx={{ color: 'red', fontSize: '2rem' }}
										/>
									)}
								</Box>
							)}
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={ {
									mt: 1,
									height: '51px',
									bgcolor: '#3C5148',
									borderColor: '#FFFFFF',
									textTransform: 'none',
								}}>
								{`${!submit ? 'Submit' : 'Close'}`}
							</Button>
						</Box>
					</Box>
				</Box>
			</Container>				
		</>
	);
};

export default ForgetPassword;
