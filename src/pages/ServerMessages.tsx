import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const ServerErrorMessage = () => {
	const navigate = useNavigate();

	const reRouteServerPage = () => {
		navigate('/');
	};

	return (
		<Container
			sx={{
				backgroundColor: 'white',
				px: '0.1rem',
				maxWidth: '100vw',
				maxHeight: '100vh',
				textAlign: 'center',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'red',
				}}>
				<Box sx={{ maxWidth: '40rem', maxHeight: '50rem' }}>
					<Typography
						variant='h1'
						sx={{ color: 'whitesmoke', mt: 6, mb: 5 }}>
						Server Connection Error!
					</Typography>
					<Typography
						variant='h5'
						sx={{ color: 'navy', fontWeight: 550, fontSize: '2rem' }}>
						{'We are Sorry, Our Server is Currently Unavailable! Kindly try again later.'.toUpperCase()}
					</Typography>
					<Button
						variant='contained'
						onClick={reRouteServerPage}
						sx={{
							color: 'red',
							backgroundColor: 'white',
							mt: 5,
							mb: 6,
							height: '3.5rem',
							width: '20rem',
							fontSize: '1rem',
							fontWeight: 600,
						}}>
						Back to HomePage
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default ServerErrorMessage;
