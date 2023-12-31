const api = 'https://localhost:7141';
const auth = api + '/auth';
const users = api + '/users';
const profile = api + '/profile';

export const apiUrls = {
  users: {
    isLoginExist: users + '/isLoginExist',
  },
  auth: {
    login: auth + '/login',
    register: auth + '/register',
  },
  profile: {
    get: profile + '/getProfile',
  },
  socket: {
    notes: api + '/notes',
    noteEditor: api + '/noteEditor',
    tags: api + '/tags',
    tag: api + '/tag',
  },
};
