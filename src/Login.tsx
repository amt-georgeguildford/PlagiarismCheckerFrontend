import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Topography from '@mui/material/Typography';
import Link from '@mui/material/Link'

import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles'


const LoginPix2 = '../LoginPix2.png';
import { useNavigate } from 'react-router-dom';


const theme = createTheme({
	typography: {
		fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
		subtitle1: {
			fontSize: 16,
		},
		subtitle2: {
			fontSize: 32,
		},
		button: {
			fontFamily: 'Exo, sans-serif',
			fontWeight: 500,
			fontSize: 20,
		},
	},
});

//Regular React imports
import { useEffect, useState } from 'react';
import { PWD_REGEX, SERVER_URL} from './Constants/Constants';
import axios from 'axios';
import notification from './config/notificationConfig';


const Login = () => {
	const navigate = useNavigate();
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [passwordError, setPasswordError]= useState(false)
	const [userNameError, setUserNameError]= useState(false)
	const [passwordChange, setPasswordChange]= useState(false)
	const [userNameChange, setUserNameChange]= useState(false)
	const [inValidEntry, setInValidEntry] = useState(false);

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = () => setShowPassword((show) => !show);


	useEffect(() => {
		setInValidEntry(false);
		setErrorMsg('');
	}, [password, userName]);


	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// if (
		// 	userName.length >= 8 &&
		// 	PWD_REGEX.test(password)
		// ) {
		// 	console.log('pass')
		// 	setErrorMsg('');
		// } else {
		// 	console.log('pads')
		// 	setErrorMsg('Invalid UserName or Password');
		// }

		// if (errorMsg) {
		// 	console.log('dsgsf')
		// 	setInValidEntry(true);
		// 	return;
		// }

		const login= async ()=>{
			try {
				const requestBody={
					email: userName,
					password
				}
				const response= await axios.post(SERVER_URL+'auth/login', requestBody)
		
				console.log(92, response.data.user.isverified);
	
				//Store the token in global API Context, and use when sending
				const result = response.data;
				
	
				//If verified and valid user, redirect to needed dashboard
	
				setInValidEntry(false);
				setPassword('');
				setUserName('');
					
				if (result.user.isverified) {
					//Confirm the user and redirect
					localStorage.setItem('accessToken', result.tokens.accessToken);
					notification.success("Login Successful")
					if (result.user.role === 'ADMIN') {
						navigate('/adminboard');
					} else if (result.user.role === 'LECTURER') {
						navigate('/lecturerboard');
					} else if (result.user.role === 'STUDENT') {
						navigate('/studentboard');
					}
					
				}else {
					notification.info("Login Successful... reset password")
						navigate('/reset/'+result.tokens.accessToken);
				}	
	
			} catch (err: any) {		
				if(err){
					console.log(err)
					if(err.response){
						const {status, data}= err.response;
						const messages= data.message
						console.log('gerer')
						if(status===400 ){
							messages.forEach((field: any)=>{
								field.path==='password'&& setPasswordError(true)
								field.path==='email' && setUserNameError(true)
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
		if(userName.length>0 && PWD_REGEX.test(password)){
			login()
		}

	};

	return (
		<ThemeProvider theme={theme}>
			<Container
				component='main'
				sx={{
					// ml: '3.25rem',
					// mr:'3.25',
					height: '100vh',
					width: '100vw',
					pt: '2rem',
					pb: '5rem',
					pl: '2.25rem',
					pr: '8rem',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<CssBaseline />

				<Grid
					container
					spacing='7rem'
					direction={'row'}
					sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
					<Grid
						item
						xs='auto'
						sx={{ display: 'flex', justifyContent: 'start' }}>
						<Box>
							<Topography
								component='h1'
								sx={{ fontSize: '2.5rem', mb: '2rem', textAlign: 'center' }}>
								Welcome!
							</Topography>

							<img
								src={LoginPix2}
								alt='User Login'
							/>
						</Box>
					</Grid>
					<Grid item>
						<Box
							sx={{
								border: 1,
								borderRadius: 2,
								mt: 11,
								px: 5,
								pt: 5,
								pb: 5,
								bgcolor: '#ffffff',
								width: '33rem',
							}}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}>
								<Topography
									component='h1'
									variant='subtitle2'
									sx={{
										textAlign: 'center',
										mb: 3,
										lineHeight: '1.2rem',
										maxWidth: '22.5rem',
									}}>
									Log In
								</Topography>
								<Topography
									variant='subtitle1'
									sx={{
										textAlign: 'center',
										mt: 1.5,
										lineHeight: '1.2rem',
										maxWidth: '22.5rem',
									}}>
									Provide your login details to access your account
								</Topography>
								<Box
									sx={{
										width: '100%',
										height: '2rem',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}>
									{inValidEntry && (
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
											{errorMsg}
										</Box>
									)}
								</Box>

								<Box
									component='form'
									sx={{ mt: 2, maxWidth: '22.5rem' }}
									onSubmit={handleSubmit}>
									<TextField
										sx={{ maxWidth: '22.5rem' }}
										fullWidth
										id='email'
										name='email'
										label='Email or ID'
										placeholder='Email or ID'
										autoFocus
										required
										value={userName}
										onChange={(e) => {setUserName(e.target.value); setUserNameChange(true)}}
										error={(userNameChange && userName.length==0 )|| userNameError}
										helperText={
											userName.length ===0 && userNameChange?
												'Email or ID should not be empty' : " "
										}
										InputLabelProps={{
											shrink: true,
										}}
										margin='dense'
									/>
									<TextField
										sx={{ mt: '1.5rem', maxWidth: '22.5rem' }}
										fullWidth
										id='password'
										variant='outlined'
										required
										type={showPassword ? 'text' : 'password'}
										name='password'
										label='Password'
										placeholder='Password'
										value={password}
										onChange={(e) => {setPassword(e.target.value); setPasswordChange(true)}}
										error={
											(passwordChange &&  !PWD_REGEX.test(password)) || passwordError
										}
										helperText={
											(( !PWD_REGEX.test(password)) && passwordChange)?
												'Password should be a minimum of 8 characters with uppercase,lowercase and special character (!,#,$,%,^,*,+,-,_,=,?,@,|)': " "
										}
										InputLabelProps={{
											shrink: true,
										}}
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
													<IconButton
														// aria-label='toggle password visibility'
														onClick={handleClickShowPassword}
														onMouseDown={handleMouseDownPassword}>
														{showPassword ? <Visibility /> : <VisibilityOff />}
													</IconButton>
												</InputAdornment>
											),
										}}
										margin='normal'
									/>
									<Grid
										container
										sx={{ mt: 0.75 }}>
										<Grid
											item
											xs></Grid>
										<Grid
											item
											xs
											sx={{ display: 'flex', justifyContent: 'end' }}>
											<Link
												href='/lostpassword'
												underline='hover'
												sx={{
													textDecoration: 'none',
													fontSize: '16',
													color: 'black'
												}}>
												Forgot Password
											</Link>
										</Grid>
									</Grid>

									<Button
										type='submit'
										fullWidth
										variant='contained'
										sx={{
											mt: 4,
											height: '51px',
											bgcolor: '#3C5148',
											borderColor: '#FFFFFF',
											textTransform: 'none',
										}}>
										Log in
									</Button>
								</Box>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</ThemeProvider>
	);
};

export default Login;
