const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json())

// Middleware for setting CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with specific allowed origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res) => {
    console.log(req.body);

    const transportToDev = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lukefranc3@gmail.com',
            pass: 'paoottpbcnusbqqk'
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