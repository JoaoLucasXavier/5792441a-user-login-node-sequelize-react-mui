import genericService from './GenericService';

const AuthService = {
  login: async (credentials) => {
    const result = await genericService.post('/login', credentials);
    return result.data;
  },

  logout: async () => {
    const result = await genericService.post(
      '/logout',
      {},
      {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + AuthService.getToken(),
      },
    );
    return result.data;
  },

  getToken: () => {
    const token = localStorage.getItem('token');
    return token === undefined ? false : token;
  },

  getTokenData: () => {
    const token = localStorage.getItem('token');
    if (!token) return token;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  },

  deleteToken: () => {
    localStorage.removeItem('token');
  },

  getUser: () => {
    const username = AuthService.getTokenData().username;
    return genericService
      .get(`/auth/user/${username}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },

  refreshToken: () => {
    return genericService
      .post('/auth/refresh')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },
};

export default AuthService;
