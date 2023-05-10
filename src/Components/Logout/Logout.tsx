import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'


import { useNavigate } from 'react-router-dom'

import {paperStyle,gridStyle,modalStyle,modalBox,typoStyle,btnBagStyle,btnStyle, SERVER_URL} from '../../Constants/Constants'
import axios from 'axios'


const Logout = ({showModal,setShowModal}: {showModal: boolean,setShowModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
	
	const navigate=useNavigate()

	const handleUserLogout = () => {
		// localStorage.removeItem('accessToken')
		// localStorage.removeItem('refreshToken')
		console.log(localStorage.getItem('accessToken'))
		const logoutFunc= async ()=>{
			try {
				const signOut= await axios.post(SERVER_URL+'auth/logout', {
					headers:{
						"Authorization": `Bearer ${localStorage.getItem('accessToken')}`
					}
					
				})
				console.log(signOut.data)
			} catch (error) {
				console.log(error)
				// localStorage.removeItem('accessToken')
				// localStorage.removeItem('refreshToken')
				navigate('/')
			}
		}
		logoutFunc()
	}

	
  return (
		<Container
			sx={showModal ? { ...modalStyle, minWidth: '100vw' } : { ...gridStyle }}
			onClick={()=>setShowModal(false)}>
			<Paper
				elevation={10}
				style={showModal ? modalBox : paperStyle}
				onClick={(e)=>e.stopPropagation()}>
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
						sx={{...btnStyle, backgroundColor: 'red'}}
						onClick={handleUserLogout}>
						Confirm
					</Button>
					<Button
						variant='contained'
						sx={{ ...btnStyle, ml: '1.5rem' }}
						onClick={()=>setShowModal(false)}>
						Cancel
					</Button>
				</Box>
			</Paper>
		</Container>
	);
}

export default Logout
