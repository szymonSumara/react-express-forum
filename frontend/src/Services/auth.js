import http from "./http";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

if(localStorage.getItem("token"))
    http.setToken(localStorage.getItem("token"));

const login = async (login, password) =>{
    const result = await http.post('/api/login',{login,password})
    if(!result){
        toast.error('Login failed');
        return false;
    }

    localStorage.setItem("token", result["auth-token"]);
    toast.success('Login Succes!!!');
    http.setToken(result.token);
    return true;
}

const getLoggedUser = () => {
    if(!localStorage.getItem("token")) return null;
    return jwtDecode(localStorage.getItem("token"));
}

const logout = () => {
    console.log("log out");
    localStorage.removeItem("token");
}
const auth = {
    login,
    getLoggedUser,
    logout
}

export default auth;