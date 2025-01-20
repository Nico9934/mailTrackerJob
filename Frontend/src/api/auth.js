// auth.js
import axios from "axios";


const API = "http://localhost:5000/api";

const registerRequest = async (user) => {
  
  const {username, email, password} = user
  console.log(`Datos recibidos en registerRequest en auth.js: ${JSON.stringify(username, email, password)}`);
  console.log(`Datos enviados desde registerRequest: ${user}`);
  const res = await axios.post(`${API}/auth/register`, user);
  return res;
};

const loginRequest = async (user) => {
  console.log(`Datos enviados desde loginRequest: ${user}`);
  const res = await axios.post(`${API}/auth/login`, user);
  console.log(res)
  return res;
};

const logoutRequest = async (user) => {
  const res = await axios.post(`${API}/auth/logout`, user);
  return res;
};

export {registerRequest, loginRequest, logoutRequest }