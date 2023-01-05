import React, {useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'
import './auth.css'


const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function ResetPassword() {
    const [data, setData] = useState(initialState)
    const {token} = useParams()

    const {password, cf_password, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }

    const handleResetPass = async () => {
        if(isEmpty(password))
            return setData({...data, err: 'Please add your new password.', success: ''})

        if(isLength(password))
            return setData({...data, err: 'Password must be at least 8 characters.', success: ''})

        if(password !== cf_password)
            return setData({...data, err: 'Password did not match.', success: ''})

        try {
            const res = await axios.post('/user/reset', {password}, {
                headers: {Authorization: token}
            })

            return setData({...data, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg &&
            setData({...data, err: err.response.data.msg, success: ''})
        }
    }
    
    return (
        <div className='fg_page'>
            <h2>Reset your password</h2>

            <div className='row'
                style={{display: err || success ? 'block' : 'none'}}>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
            </div>


            <div className='row'>
                <label htmlFor='password'
                style={{marginTop: '1.4rem'}}
                >Password</label>
                <input type='password' name='password' id='password' value={password}
                onChange={handleChangeInput} />

                <label htmlFor='cf_password'
                style={{marginTop: '1.4rem'}}
                >Confirm Password</label>
                <input type='password' name='cf_password' id='cf_password' value={cf_password}
                onChange={handleChangeInput} />


                <button onClick={handleResetPass}>Reset Password</button>
            </div>
        </div>
    )
}

const isEmpty = (value) => {
    return value === undefined || value === null || value === ''
}

const isLength = (value) => {
    return value.length < 8
}

export default ResetPassword