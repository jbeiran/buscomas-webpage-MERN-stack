import React, {useState} from 'react'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'
import './auth.css'

const initialState = {
    email: '',
    err: '',
    success: ''
}

function ForgotPassword() {
    const [data, setData] = useState(initialState)

    const {email, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }

    const handleForgotPass = async () => {
        if(!isEmail(email))
            return setData({...data, err: 'Invalid emails.', success: ''})
        
        try {
            const res = await axios.post('/user/forgot', {email})

            return setData({...data, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg &&
            setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div className='fg_page'>
            <h2>Forgot your password?</h2>

            <div className='row'
                style={{display: err || success ? 'block' : 'none'}}>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
            </div>


            <div className='row'>
                <label htmlFor='email'
                style={{marginTop: '1.4rem'}}
                >Enter your email address</label>
                <input type='email' name='email' id='email' value={email}
                onChange={handleChangeInput} />
                <button onClick={handleForgotPass}>Verify your email</button>
            </div>
        </div>
    )
}

const isEmail = (email) => {
    const exp = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/ 
    return exp.test(email)
}

export default ForgotPassword