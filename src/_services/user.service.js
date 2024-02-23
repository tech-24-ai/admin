import { apiConfig } from "./api";

export const userService = {
  login,
  logout,
  forgotPassword,
  resetPassword,
};

function login(email, password) {
  const user = {
    email,
    password,
  };

  return apiConfig.post(`/auth/login`, user).then((user) => {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    if (user.status == 200) {
      localStorage.setItem("user", JSON.stringify(user.data.data));
    }
    return user;
  });
}

function forgotPassword(email) {
  const user = {
    email,
  };

  return apiConfig.post(`/users/forgot_password`, user).then((user) => {
    return user;
  });
}

function resetPassword(password, token) {
  const user = {
    password,
  };

  return apiConfig
    .post(`/users/forgot_resetpassword`, user, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((user) => {
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}
