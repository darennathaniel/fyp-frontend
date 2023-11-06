export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  return (
    confirmPassword === password &&
    password.length > 0 &&
    confirmPassword.length > 0
  );
};
