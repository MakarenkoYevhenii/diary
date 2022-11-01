export const getUser = ({ auth }) => auth;
export const getLogin = ({ auth }) => auth.isLogin;
export const getToken = ({ auth }) => auth.token;
