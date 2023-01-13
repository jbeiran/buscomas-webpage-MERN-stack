const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const path = require('path')
const dotenv = require('dotenv');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const vhost = require("vhost");

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cookieParser());
app.use(cors());
app.use(fileupload({
    useTempFiles: true
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})

app.use(vhost("buscomas.com", app));

// Routes
app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/categoryRouter'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/adRouter'));


// Connect to MongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to MongoDB');
})

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

