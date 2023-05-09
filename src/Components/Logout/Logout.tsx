import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {paperStyle,gridStyle,modalStyle,modalBox,typoStyle,btnBagStyle,btnStyle} from '../../Constants/Constants'


const Logout = () => {
	const [loggedOut, setloggedOut] = useState(false)
	const [modal, setModal] = useState(true)
	
	const navigate=useNavigate()

	const handleUserLogout = () => {
		setloggedOut(true);
		localStorage.removeItem('accessToken')
		navigate('/')
	}

	const cancelUserLogout = () => {
		if (!loggedOut) {
			setloggedOut(false)
			setModal(false)
		}
		
	}
	
  return (
		<Container
			sx={modal ? { ...modalStyle, minWidth: '100vw' } : { ...gridStyle }}
			onClick={cancelUserLogout}>
			<Paper
				elevation={10}
				style={modal ? modalBox : paperStyle}>
				<Typography
					variant='h4'
					component='h5'
					sx={{ ...typoStyle, fontWeight: 500 }}>
					Confirm Logout
				</Typography>
				<Typography
					variant='h6'
					sx={typoStyle}>
					Are you sure you would like to log out of the application?
				</Typography>
				<Box sx={btnBagStyle}>
					<Button
						variant='contained'
						sx={btnStyle}
						onClick={handleUserLogout}>
						Confirm
					</Button>
					<Button
						variant='contained'
						sx={{ ...btnStyle, ml: '1.5rem' }}
						onClick={cancelUserLogout}>
						Cancel
					</Button>
				</Box>
			</Paper>
		</Container>
	);
}

export default Logout
