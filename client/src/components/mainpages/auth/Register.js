import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'


function Register() {

  const [user, setUser] = useState({
    name: '', email: '', password: '', cf_password: '', err: '', success: ''
  })

  const { name, email, password, cf_password, err, success } = user

  const onChangeInput = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value, err: '', success: '' })
  }

  const registerSubmit = async e => {
    e.preventDefault();

    if(name === '' || email === '' || password === '' || cf_password === '') {
      return setUser({ ...user, err: 'Please fill in all fields', success: '' })
    }

    if(password.length < 8) {
      return setUser({ ...user, err: 'Password must be at least 8 characters', success: '' })
    }

    if(password !== cf_password) {
      return setUser({ ...user, err: 'Password did not match', success: '' })
    }

    try {
      const res = await axios.post('/user/register', { name, email, password })
      setUser({ ...user, err: '', success: res.data.msg })
    } catch (err) {
      err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: '' })
    }
  }

  

  return (
    <div>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <form className='mx-auto my-4' style={{ maxWidth: '500px' }} onSubmit={registerSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputName">Nome Utente</label>
          <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={onChangeInput} />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Indirizzo e-mail</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={user.email} onChange={onChangeInput} />
          <small id="emailHelp" className="form-text text-muted">Non condivideremo mai il vostro indirizzo e-mail con nessun altro.</small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={user.password} onChange={onChangeInput} />
          <small id="passwordHelpInline" className="form-text text-muted">Deve essere di 8-20 caratteri.</small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confermare Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="cf_password" value={user.cf_password} onChange={onChangeInput} />
        </div>


        <button type="submit" className="btn btn-dark w-100">Registro</button>

        <p className='my-2'>Hai già un account?
          <Link to="/login" style={{ color: 'crimson', marginLeft: '5px' }}>Accedi ora</Link></p>
      </form>
    </div>
  )
}

export default Register