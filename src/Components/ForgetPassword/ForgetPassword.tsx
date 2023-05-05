import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Topography from '@mui/material/Typography';



//Regular React imports
import { useState } from 'react';
import {  LOGIN_URL} from '../../Constants/Constants';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

 


const ForgetPassword = () => {

	const navigate = useNavigate();

	const [userName, setUserName] = useState('');
	const [success, setSuccess] = useState(false);
	const [messages, setMessages] = useState('');



	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (userName.length < 3) {
			return;
		}

		if (success) {
			CloseResetPage();
			return;
		}

		try {
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify({
					userName: userName,
				})
			);
			console.log(response?.data);

			if (response.data.status.ok) {
				setMessages(
					'Kindly check your email for instructions on your account password reset.'
				);
				setUserName('');
				setSuccess(true);
			}
		} catch (err:any) {
			// const errors = err as Error | AxiosError;
			console.log(err);
			if (!err?.response) {
				setMessages('No Server Response');
			} else if (err.response?.status === 400) {
				setMessages('Invalid Username or Password');
			} else if (err.response?.status === 401) {
				setMessages('Unauthorized');
			} else {
				setMessages('Login Failed');
			}
		}

	};

	const CloseResetPage = () => {
		setTimeout(() => {
			navigate('/')
		}, 3000);
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
			<Box sx={ {
				maxWidth: '30.5rem',
				border: 1,
				px:5,py:2,
				borderRadius: 5
			} }>
				<Box>
					<Topography
						sx={{
							textAlign: 'center',
							mt: 2,
							mb: 1,
							lineHeight: '1.2rem',
							maxWidth: '22.5rem',
						}}>
						Provide your email address or userID for password recovery
					</Topography>
					<Box
						sx={{
							width: '100%',
							height: '2rem',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						{messages && (
							<Box
								component='span'
								sx={{
									color: 'red',
									fontSize: '1rem',
									fontWeight: 400,
									mt: '0.8rem',
									width: '100%',
									height: '2rem',
									textAlign: 'center',
								}}>
								{messages}
							</Box>
						)}
					</Box>

					<Box
						component='form'
						sx={{ mt: 2, mb: 2, maxWidth: '22.5rem' }}
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
							onChange={(e) => setUserName(e.target.value)}
							error={userName.length > 0 && userName.length < 8}
							helperText={
								userName.length === 0 || userName.length >= 8
									? ' '
									: 'Email should be a minimum length of 8 characters'
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
							{`${!success ? 'Submit' : 'Close'}`}
						</Button>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

export default ForgetPassword;
