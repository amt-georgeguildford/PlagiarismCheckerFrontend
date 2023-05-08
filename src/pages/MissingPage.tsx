import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'


const MissingPage = () => {
    const navigate = useNavigate();

    const renderHomePage = () => {
        navigate('/')
    }

  return (
		<Container
			sx={{
				backgroundColor: 'grey',
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
					backgroundColor: 'lemongreen',
				}}>
				<Box sx={{ maxWidth: '40rem', maxHeight: '50rem' }}>
					<Typography
						variant='h1'
						sx={{ color: 'whitesmoke',mt:6,mb:5 }}>
						404 Page Not Found!!!!
					</Typography>
					<Typography
						variant='h5'
                      sx={ { color: 'navy',fontWeight:550, fontSize:'2rem' } }
                    >
						{'We are Sorry, but the page you requested for was not found!'.toUpperCase()}
					</Typography>
                  <Button variant='contained'
                      onClick={renderHomePage}
                      sx={ {
                      color: 'red',
                        backgroundColor: 'white',
                        mt: 5,
                        mb: 6,
                        height: '3.5rem',
                        width: '20rem',
                          fontSize: '1rem',
                        fontWeight:600
                      } }
                  >
						Back to HomePage
					</Button>
				</Box>
			</Box>
		</Container>
	);
}

export default MissingPage

