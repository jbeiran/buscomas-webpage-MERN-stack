import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'

function Login() {
  const [user, setUser] = useState({
    email: '', password: '', err: '', success: ''
  })

  const {email, password, err, success} = user

  const onChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value, err: '', success: ''})
  }

  const loginSubmit = async e => {
    e.preventDefault();

    try{
      const res = await axios.post('/user/login', {email, password})
      setUser({...user, err: '', success: res.data.msg})
      localStorage.setItem('firstLogin', true)
      window.location.href = "/";
    } catch (err) {
      err.response.data.msg && setUser({...user, err: err.response.data.msg, success: ''})
    }
  }

  return (
    <div>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      
      <form className='mx-auto my-5' style={{maxWidth: '500px'}} onSubmit={loginSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Indirizzo e-mail</label>
          <input type="email" className="form-control" id="exampleInputEmail1" 
          aria-describedby="emailHelp" 
          placeholder="Enter email"
          name="email"
          value={user.email}
          onChange={onChangeInput}/>
          <small id="emailHelp" className="form-text text-muted">Non condivideremo mai il vostro indirizzo e-mail con nessun altro.</small>
        </div>
        
        <br></br>
        
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" 
          placeholder="Password"
          name="password" value={user.password} required autoComplete='on'
          onChange={onChangeInput}/>
        </div>
        
        <br></br>
        <button type="submit" className="btn btn-dark w-100">Accesso</button>
        <br></br>
        
        <p className="my-2"> Non avete un account? 
          <Link to="/register" 
          style={{
            color: 'crimson',
            marginLeft: '5px'
          }}>
            Registrati ora
          </Link>
        </p>

        <p className="my-2"> Forgot your password?
          <Link to="/forgot_password"
          style={{
            color: 'crimson',
            marginLeft: '5px'
          }}>
            Reset password
          </Link>
        </p>

      </form>
    </div>
  )
}

export default Login