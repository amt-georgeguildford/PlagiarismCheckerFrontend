export const USER_REGEX = /^[A-z][A-z0-9-_]{1,23}$/
export const PWD_REGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%?^=+*_|-]).{8,100}$/
// export const PWD_REGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%+*-=?^_|]).{8,100}$/
// export const PWD_REGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,100}$/
export const TEL_REGEX = /^[0-9+]{1,}[0-9-]{9,15}$/
// export const EMAIL_REGEX=/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const SERVER_URL = 'https://plagiarismchecker2023.netlify.app/dashboard/admin';

export const ACCESS_TOKEN = 'ADMIN';


export const myTHEME = {
	typography: {
		fontFamily: `Verdana, Geneva, Tahoma, sans-serif`,
		fontWeightRegular: 400,
	},
};



/// Styling Constants For the Logout Form

export const paperStyle = {
	padding: '20px 30px',
	margin: '20vh auto',
	maxWidth: '30rem',
	maxHeight: '25.5rem',
	backgroundColor: ' #E9ECED',
};
export const gridStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100vh',
	width: '100vw',
};

export const modalStyle = {
	display: 'block',
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
	backgroundColor: 'rgba(0 ,0 ,0 , 0.5)',
	maxWidth: '100vw',
};

export const modalBox = {
	zIndex: 50,
	padding: '20px 30px',
	margin: '30vh auto',
	maxWidth: '30rem',
	maxHeight: '25.5rem',
};
export const typoStyle = {
	mb: '2.8rem',
	fontStyle: 'Verdana',
	textAlign: 'center',
};
export const btnStyle = {
	height: '51',
	width: '10rem',
	fontSize: '1rem',
	backgroundColor: '#3C5148',
	alignItems: 'center',
	marginBottom: '1.5rem',
};

export const btnBagStyle = {
	display: 'flex',
	alignItems: 'Center',
	justifyContent: 'center',
};
