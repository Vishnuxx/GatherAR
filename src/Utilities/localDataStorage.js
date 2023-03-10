export const getUserData = () =>
  JSON.parse(window.localStorage.getItem("user"));

export const saveUsername = (username) => {
  window.localStorage.setItem(
    "user",
    JSON.stringify({
      ...getUserData(),
      name: username,
    })
  );
};

export const saveUserData = ({ username, email, uid , rooms}) => {
  // console.log("saving user data", username, email, uid);
  window.localStorage.setItem(
    "user",
    JSON.stringify({
      username,
      email,
      uid,
      rooms
    })
  );
};

export const getValueFromUserData = (key) => {
  return getUserData[key];
};

export const logoutUserData = () => {
  window.localStorage.removeItem("user");
};
