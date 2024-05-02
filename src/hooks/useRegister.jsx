import { useEffect } from "react"
import { useUser } from "src/hooks/useUser"
import { useLocalStorage } from "src/hooks/useLocalStorage"
import axios from 'axios'

export const useRegister = () => {
  const { user, addUser, setUser } = useUser()
  const { getItem } = useLocalStorage()

  useEffect(() => {
    const storedUser = getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const setUserToLogin = (user) => {
    addUser(user)
  }

  const register = async (user) => {
    if (!user) {
      return Promise.reject('no user provided');
    }

    return axios.post(`${import.meta.env.VITE_BACKEND_ENDPOINT}/auth/register`, {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password
    }).then(response => {
      return Promise.resolve(response.data.data);
    })
    .catch(error => {
      return Promise.reject(error);
    })
  }

  return { user, register, setUserToLogin, setUser }
};
