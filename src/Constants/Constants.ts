export const USER_REGEX = /^[A-z][A-z0-9-_]{1,23}$/
export const PWD_REGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%?^=+*_|-]).{8,100}$/
// export const PWD_REGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%+*-=?^_|]).{8,100}$/
// export const PWD_REGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,100}$/
export const TEL_REGEX = /^[0-9+]{1,}[0-9-]{9,15}$/
// export const EMAIL_REGEX=/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const SERVER_URL = 'http://localhost:5000/';

export const ACCESS_TOKEN = 'ADMIN';


export const myTHEME = {
	typography: {
		fontFamily: `Verdana, Geneva, Tahoma, sans-serif`,
		fontWeightRegular: 400,
	},
};




export const department = [
	{
		id: '201',
		name: 'History',
	},
	{
		id: '202',
		name: 'Geography',
	},
	{
		id: '203',
		name: 'Economics',
	},
	{
		id: '204',
		name: 'Mathematics',
	},

	{
		id: '205',
		name: 'Physics',
	},
];