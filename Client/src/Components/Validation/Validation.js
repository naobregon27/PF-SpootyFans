//* validaciones login

export default (userData) => {
  let errors = {};
  //username

  if (!userData.username) {
    errors.username = "your username is required";
  }

  if (userData.username.length > 35) {
    errors.username =
      "Attention! Your username cannot surpass the 35 character limit";
  }

  //password

  if (!/.*\d+.*/.test(userData.password)) {
    errors.p =
      "To ensure security, your password must contain at least one number";
  }

  if (!/.*[a-zA-Z]+.*/.test(userData.password)) {
    errors.p =
      "To ensure security, your password must contain at least one letter.";
  }
  if (!userData.password) {
    errors.p = "you should enter a password";
  }

  if (userData.password.length < 8) {
    errors.p = "your password must contain at least 8 characters";
  }

  return errors;
};
