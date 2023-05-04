import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Topography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

const LoginPix = '../public/LoginPix.png';

import { createTheme, ThemeProvider } from '@mui/material/styles';

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
import { PWD_REGEX, LOGIN_URL, ACCESS_TOKEN } from '../../Constants/Constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [success, setSuccess] = useState(true);

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = () => setShowPassword((show) => !show);

	useEffect(() => {
		if (password.length > 0 && password.length < 8) {
			setErrorMsg('Invalid Password');
		} else {
			setErrorMsg('');
		}
	}, [password]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			(userName.length >= 8 || userName.length == 0) &&
			PWD_REGEX.test(password)
		) {
			setErrorMsg('');
		} else {
			setErrorMsg('Invalid UserName or Password');
		}

		if (errorMsg) {
			return;
		}

		try {
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify({
					userName: userName,
					password: password,
				})
			);
			console.log(response?.data);

			//Store the token in global API Context, and use when sending
			// const accessToken = response?.data?.accessToken;

			setSuccess(true);
			setPassword('');
			setUserName('');

			//Save both tokens received to LocalStorage for further
			// localStorage.setItem('accessToken',accessTokenKey)
		} catch (err: any) {
			console.log(err);
			if (!err?.response) {
				setErrorMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrorMsg('Invalid Username or Password');
			} else if (err.response?.status === 401) {
				setErrorMsg('Unauthorized');
			} else {
				setErrorMsg('Login Failed');
			}
		}
		if (ACCESS_TOKEN === 'ADMIN') {
			navigate('/adminboard');
		} else if (ACCESS_TOKEN === 'LECTURER') {
			navigate('/lecturerboard');
		} else {
			navigate('/studentboard');
		}
	};

	return (
		<ThemeProvider theme={theme}>
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

				<Grid
					container
					spacing='1rem'
					direction={'row'}
					sx={{ alignItems: 'center', justifyContent: 'space-around' }}>
					<Grid
						item
						xs='auto'>
						<Box
						// sx={{
						// 	display: 'flex',
						// 	alignItems: 'center',
						// 	justifyContent: 'center',
						// }}>
						>
							<Topography
								component='h1'
								sx={{ fontSize: '2.5rem', mb: '1rem' }}>
								Welcome!
							</Topography>

							<img
								src={LoginPix}
								alt='User Working At Amalitech'
							/>
						</Box>
					</Grid>
					<Grid item>
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
									component='h1'
									variant='subtitle2'>
									Log In
								</Topography>
								<Topography
									variant='subtitle1'
									sx={{
										textAlign: 'center',
										mt: 2,
										mb: 1,
										lineHeight: '1.2rem',
									}}>
									Provide your login details to access your account
								</Topography>
								{!success && (
									<Box
										component='span'
										sx={{ color: 'red' }}>
										{errorMsg}
									</Box>
								)}
								<Box
									component='form'
									sx={{ mt: 2, mb: 2 }}
									onSubmit={handleSubmit}>
									<TextField
										fullWidth
										id='email'
										name='email'
										label='Email or ID'
										placeholder='Email or ID'
										autoFocus
										required
										value={userName}
										onChange={(e) => setUserName(e.target.value)}
										error={userName.length > 0 && userName.length < 8}
										helperText={
											userName.length === 0 || userName.length >= 8
												? ''
												: 'Email or ID Should be a minimum length of 8 Characters'
										}
										InputLabelProps={{
											shrink: true,
										}}
										margin='normal'
									/>
									<TextField
										fullWidth
										id='password'
										variant='outlined'
										required
										type={showPassword ? 'text' : 'password'}
										name='password'
										label='Password'
										placeholder='Password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										error={
											password.length > 0 && PWD_REGEX.test(password) === false
										}
										helperText={
											password.length === 0 || PWD_REGEX.test(password) === true
												? ''
												: 'Password length should be a minimum of 8 and include uppercase and alphanumeric characters'
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
										sx={{ mt: 0.5 }}>
										<Grid
											item
											xs></Grid>
										<Grid
											item
											xs
											sx={{ display: 'flex', justifyContent: 'end' }}>
											<Link
												href='#'
												variant='body2'>
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
											mb: 3,
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
