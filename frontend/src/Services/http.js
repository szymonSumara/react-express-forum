import { toast } from "react-toastify";


//const serverUrl = "https://stormy-ocean-36666.herokuapp.com"
const serverUrl = "http://localhost:3000"
let token;
const setToken = (t)  => {
  token = t;
}

const get = async ( path, options ) => {
  console.log(path)
    const response = await fetch(serverUrl + path + optionsObjectToString(options), {
        method: 'GET',
        headers: {
          'auth-token': token,
        },
      });

      if(response.ok){
        toast.success(`GET ${path}`)
        return response.json();
      } 
      else{
        const text = response.text();
        toast.error(`GET ${path} \n ${text}`);
        return null;
      } 
}

const post = async ( path ,body) => {
  console.log("post");
    const response = await fetch(serverUrl + path, {
        method: 'POST', 
        body:JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      });

      if(response.ok){
        toast.success(`POST ${path}`)
        const data = await response.json();
     //   console.log(data);
        return {
          ok: true,
          data
        };
      } 
      else{
        const text = await response.text();
       // toast.error(`POST ${path} \n ${text}`);
        return text;
      } 
}

const del = async ( path ,body) => {
  const response = await fetch(serverUrl + path, {
      method: 'DELETE', 
      body:JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });

    if(response.ok){
     // toast.success(`POST ${path}`)
      const data =  response.json();
      console.log(data);
      return data;
    } 
    else{
      const text = await response.text();
      //toast.error(`POST ${path} \n ${text}`);
      return null;
    } 
}

const put = async ( path ,body) => {
  const response = await fetch(serverUrl + path, {
      method: 'PUT', 
      body:JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });

    if(response.ok){
     // toast.success(`POST ${path}`)
      const data =  response.json();
      console.log(data);
      return data;
    } 
    else{
      const text = await response.text();
    //  toast.error(`POST ${path} \n ${text}`);
      return null;
    } 
}


function optionsObjectToString(options){
  
  if(!options) return '';
  
  let optionsSting;
  Object.entries(options).forEach((value,key) => {
    if(!optionsSting) optionsSting = `?${value[0]}=${value[1]}`;
    else optionsSting += `&${value[0]}=${value[1]}`;
  });
  return optionsSting;
}


const http = {
  get,
  put,
  post,
  setToken,
  delete:del,
}

export default  http;