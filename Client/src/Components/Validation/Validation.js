//* validaciones login 

export default (userData) => {
    let errors= {}
//email

 if (!userData.email){
    errors.email= "your email is required"};

  if (userData.email.length > 35) {
    errors.email= "Attention! Your email cannot surpass the 35 character limit"};
        
//password
    
 if (!/.*\d+.*/.test(userData.password)) {
    errors.p = "To ensure security, your password must contain at least one number"};
    
  if (!userData.password) {
    errors.p = "you should enter a password"};
 
 if (userData.password.length < 6 || userData.password.length > 10) {
        errors.p = "Protecting your data requires passwords between 6-10 characters"};

return errors;

};
