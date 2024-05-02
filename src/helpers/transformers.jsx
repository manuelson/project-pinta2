
export const transformers = () => {
  const transformUserResponse = (user) => {
    return {
      email: user.data.email,
      token: user.data.token,
      firstname: user.data.firstname,
      lastname: user.data.lastname,
    }
  }
  return { transformUserResponse }
};
