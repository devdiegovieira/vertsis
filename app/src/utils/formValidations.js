export const mailValid = (email) => {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
};
