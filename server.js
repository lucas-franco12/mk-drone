const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
require('dotenv').config();


const PORT = process.env.PORT || 3000;

// Allow requests from Netlify domain
const allowedOrigins = ['https://mkdroneandmedia.netlify.app', 'https://main--mkdroneandmedia.netlify.app'];


const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res) => {
    console.log(req.body);

    const transportToDev = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.DEV_GMAIL_USER,
            pass: process.env.DEV_GMAIL_PASSWORD
        }
    })

    // const transportToClient = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: '***MARKS EMAIL***',
    //         pass: '***MARKS PASSWORD***'
    //     }
    // })

    const mailOptionsDev = {
        from: req.body.email,
        to: 'lukefranc3@gmail.com',
        subject: `MK Drone and Media: New Message from ${req.body.email}`,
        text: `
        First name: ${req.body.firstName}
        Last name: ${req.body.lastName}
        Email: ${req.body.email}
        Phone number: ${req.body.number}

        Message: 
        ${req.body.message}
        `
    }

    // const mailOptionsClient = {
    //     from: req.body.email,
    //     to: '***MARKS EMAIL***',
    //     subject: `MK Drone and Media: New Message from ${req.body.email}`,
    //     text: `
    //     First name: ${req.body.firstName}
    //     Last name: ${req.body.lastName}
    //     Email: ${req.body.email}
    //     Phone number: ${req.body.number}

    //     Message: 
    //     ${req.body.message}
    //     `
    // }

    transportToDev.sendMail(mailOptionsDev, (error, info) => {
        if(error){
            console.log(error);
            res.send(error);
        } else{
            console.log('Email sent:' + info.response);
            res.send('success');
        }
    });

    // transportToClient.sendMail(mailOptionsClient, (error, info) => {
    //     if(error){
    //         console.log(error);
    //         res.send(error);
    //     } else{
    //         console.log('Email sent:' + info.response);
    //         res.send('success');
    //     }
    // });
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})