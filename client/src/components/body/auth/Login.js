import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import { GoogleLogin } from 'react-google-login';

import './body.css'


const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

function Login() {
    const [user, setUser] = useState(initialState)
    
    const dispatch = useDispatch()
    const history = useHistory()

    const {email, password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/auth/login', {email, password})
            
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)
         
            dispatch(dispatchLogin())
            history.push("/")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    const responseGoogle = async (response) => {

      console.log(response)
      try {
                  
          const res = await axios.post('/auth/google_login', {tokenId: response.tokenId})
         
          setUser({...user, err:'', success: res.data.msg})
          localStorage.setItem('firstLogin', true)

          dispatch(dispatchLogin())
          history.push("/")
      } catch (err) {
          err.response.data.msg && 
          setUser({...user, err: err.response.data.msg, success: ''})
      }
  }
  
    
  return (
  
   
    <div className="register">
     <form onSubmit={handleSubmit}>
     <h1 className="Hfont">Log In With Email</h1> 
     <br></br>
   
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
   
       <div className="col-md-4 mb-3 font">
       <label htmlFor="email" className="form-label">
         Email
       </label>
       <input
         type="email"
         className="form-control"
         id="email"
         placeholder="Enter Email"
         value={email}
         name="email"
         onChange={handleChangeInput}
         required
       />
       </div>
   
       <div className="col-md-4 mb-3 font">
       <label htmlFor="password" className="form-label">
         Enter Password
       </label>
       <input
         type="password"
         className="form-control"
         id="password"
         placeholder="Enter Password"
         value={password}
         name="password"
         onChange={handleChangeInput}
         required
       />
       </div>
       <br/>
       &nbsp; 
        <div className="col-md-4 mb-3 font">
        <button type="submit" className="btn btn-danger btn-lg">
          Login
        </button>
        </div>
   
       <br></br>  
   
       </form>
       <br/>

      
       <div >
         <div className='social'>   
        <GoogleLogin
        clientId="389472249003-m71iinf8p0reaih8q9hdo6qdjs78gfhq.apps.googleusercontent.com"
        buttonText="Login With Google"
        onSuccess={responseGoogle}
        cookiePolicy={'single_host_origin'}
       
       /> </div> 
       <br/>

   

       <hr className="col-md-12 mb-2" /> 
   
   <br/>
      <center><h3>Don't Have an account?</h3></center> 
   
     <center> 
     <Link to="/register">
             
           Sign Up Here
            
           
           </Link>
           </center>
   
          </div>


        </div>  

  
 )
}
export default Login

