export const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
// export const PWD_REGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%+]).{8,100}$/
export const PWD_REGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,100}$/
export const TEL_REGEX = /^[0-9+]{1,}[0-9-]{9,15}$/
export const EMAIL_REGEX=/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export const SERVER_URL = 'http://localhost:5000/';

export const ACCESS_TOKEN = 'ADMIN';


export const myTHEME = {
	typography: {
		fontFamily: `Verdana, Geneva, Tahoma, sans-serif`,
		fontWeightRegular: 400,
	},
};
