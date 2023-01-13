const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const {CLIENT_URL} = process.env

const userCtrl = {
    register: async (req, res) => {
        try{
            const {name, email, password} = req.body;

            if(!name || !email || !password) return res.status(400).json({msg: "Per favore, inserisci tutti i campi."})

            if(password.length < 8) return res.status(400).json({msg: 'La password deve essere di almeno 8 caratteri.'})

            if(!validateEmail(email)) return res.status(400).json({msg: "L'e-mail non è valida."})

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "L'e-mail esiste già."})

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, password.length*2)

            const newUser = {
                name, email, password: passwordHash
            }

            // Then create jsonwebtoken to authentication
            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, "Verifica la tua e-mail")

            res.json({msg: "Registrazione avvenuta con successo! Controlla la tua e-mail per attivare il tuo account."})

        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    activateEmail: async (req, res) => {
        try {
            const {activation_token} = req.body;
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const {name, email, password} = user;

            const check = await Users.findOne({email})
            if(check) return res.status(400).json({msg: "L'e-mail esiste già."})

            const newUser = new Users({
                name, email, password
            })

            await newUser.save()

            res.json({msg: "Account attivato!"})

        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    login: async (req, res) => {
        try{
            const {email, password} = req.body;
            const user = await Users.findOne({ email })
            if(!user) return res.status(400).json({msg: "L'utente non esiste."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: 'Password errata.'})

            const refreshtoken = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({msg: "Login avvenuto con successo!"})
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    logout: async (req, res) => {
        try{
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: 'Logged out'})
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    refreshToken: (req, res) => {
        try{
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Effettuare l'accesso o registrarsi"})
            
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "Effettuare l'accesso o registrarsi"})

                const accesstoken = createAccessToken({id: user.id})

                res.json({accesstoken})
            })
        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body;
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "L'utente non esiste."})

            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Resetta la tua password")
            res.json({msg: "Controlla la tua e-mail per resettare la tua password."})

        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    resetPassword: async (req, res) => {
        try {
            const {password} = req.body;
            const passwordHash = await bcrypt.hash(password, 16)

            await Users.findOneAndUpdate({_id: req.user.id}, {password: passwordHash})

            res.json({msg: "Password modificata!"})

        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getUser: async (req, res) => {
        try{
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg: "L'utente non esiste."})

            res.json(user)
        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await Users.find().select('-password')

            res.json(users)
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    addFav: async (req, res) => {
        try{
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "L'utente non esiste."})

            await Users.findOneAndUpdate({_id: req.user.id}, {
                fav: req.body.fav
            })

            return res.json({msg: 'Aggiunto ai preferiti'})
        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    updateUser: async (req, res) => {
        try{
            const {name, avatar} = req.body;
            await Users.findOneAndUpdate({_id: req.user.id}, {
                name, avatar
            })

            res.json({msg: "Aggiornato!"})
        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    updateUsersRole: async (req, res) => {
        try{
            const {role} = req.body;
            await Users.findOneAndUpdate({_id: req.params.id}, {
                role
            })

            res.json({msg: "Aggiornato!"})
        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    deleteUser: async (req, res) => {
        try{
            await Users.findByIdAndDelete(req.params.id)

            res.json({msg: "Utente eliminato!"})
        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    contact: async (req, res) => {
    }
        
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

module.exports = userCtrl