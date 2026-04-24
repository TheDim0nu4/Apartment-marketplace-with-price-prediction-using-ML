export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

const logout = () => {

  localStorage.removeItem("token");
  setCurrentUser(null);

};