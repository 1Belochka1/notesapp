const api = 'https://localhost:7141';
const auth = api + '/auth';
const users = api + '/users';
export const apiUrls = {
	users: {
		isLoginExist: users + '/isLoginExist',
	},
	auth: {
		login: auth + '/login',
		register: auth + '/register',
	},
};
