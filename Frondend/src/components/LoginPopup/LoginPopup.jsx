// import React, { useState } from 'react'
// import "./LoginPopup.css"
// import { assets } from '../../assets/assets'
// import { useContext } from 'react';
// import { StoreContext } from '../../Context/StoreContext';
// import axios from "axios"
// export default function LoginPopup({setShowLogin}) {

//   const {url,setToken}=useContext(StoreContext);

//     const[currentState,setCurrentState]=useState("login");
//     const [data,setData]=useState({
//       name:"",
//       email:"",
//       password:""
//     })

//     const onChangeHandler=(event)=>{
//       const name=event.target.name;
//       const value=event.target.value;
//       setData(data=>({...data,[name]:value}))
//     }

//     const onLogin = async (event)=>{
//       event.preventdefault();
//       let newUrl=url;
//       if(currentState=="login"){
//         newUrl+="/api/user/login"
//       }
//       else{
//         newUrl+='/api/user/register'
//       }
//       const response =await axios.post(newUrl,data);

//       if(response.data.success){
//         setToken(response.data.token);
//         localStorage.setItem('token',response.data.token);
//         setShowLogin(false);
//       }
//       else{
//         alert(response.data.message);
//       }
//     }

//     return (
//     <div className='login-popup'>
      
//       <form className='login-popup-container'>
//         <div className="login-popup-title">
//             <h2>{currentState}</h2>
//             <img src={assets.cross_icon} onClick={()=>setShowLogin(false)} alt="" />
//         </div>
//         <div className="login-popup-input">
//             {
//                 currentState==="login"?<></>:
            
//             <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' required/>
// }
//             <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your Email' required />
//             <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='password' required />

//         </div>
//         <button>{currentState==="sign Up"?"create account":"login"}</button>
//         <div className="login-popup-condition">
//             <input type="checkbox" required />
//             <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, impedit.</p>
//         </div>
//         { currentState=="login" ? <p>create a new account ? <span onClick={()=>setCurrentState("sign up")}> Click here</span></p> : 
//         <p>Already hava an account?<span onClick={()=>setCurrentState("login")}>click here</span></p> 
//           }
        
        
//       </form>


//     </div>
//   )
// }

import React, { useState, useContext } from 'react';
import "./LoginPopup.css";
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from "axios";

export default function LoginPopup({ setShowLogin }) {
  const { url, setToken } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let endpoint = currentState === "login" ? "/api/user/login" : "/api/user/register";
    try {
      const response = await axios.post(`${url}${endpoint}`, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currentState === "login" ? "Login" : "Sign Up"}</h2>
          <img
            src={assets.cross_icon}
            onClick={() => setShowLogin(false)}
            alt="Close"
          />
        </div>
        <div className="login-popup-input">
          {currentState === "sign up" && (
            <input
              type="text"
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              placeholder='Your Name'
              required
            />
          )}
          <input
            type="email"
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            placeholder='Your Email'
            required
          />
          <input
            type="password"
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            placeholder='Password'
            required
          />
        </div>
        <button type="submit">
          {currentState === "sign up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, impedit.</p>
        </div>
        {currentState === "login" ? (
          <p>
            Create a new account? <span onClick={() => setCurrentState("sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrentState("login")}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
}

