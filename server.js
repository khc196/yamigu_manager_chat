const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()
const axios = require('axios')
const dotenv = require('dotenv');

dotenv.config();

// req.body에 접근하기 위한 Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// req.session을 만들기 위한 session
app.use(session({
  secret: process.env.DJANGO_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}))

//const apiHost = "http://106.10.39.154:8000/api"
const apiHost = "http://106.10.39.154:9999/api"

app.post('/oauth/kakao', function (req, res) {
  axios.post(apiHost+'/oauth/kakao/', {
      access_token: req.body.res_access_token
    })
    .then( response => {
        let auth_token = response.data.key
        req.session.auth = auth_token
        axios.get(apiHost+'/user/info/',{
        headers:{
            'Authorization': 'Token '+ auth_token
        }
        }).then(response => {
            req.session.userInfo = response.data
            return res.json({auth:auth_token,userInfo:response.data})
        })
    })
    .catch( error =>{
       if(error.response.status ==400){
         res.status(400).end()
       }
    });
})
app.post('/auth/logout', function (req, res) {
  axios.post(apiHost+'/auth/logout/',{},{
    headers:{
      'Authorization': 'Token '+req.session.auth
    }
  }).then( response => {
    delete req.session.auth
    delete req.session.userInfo
    res.end()
  }).catch( error =>{
     if(error.response.status ==401){
       res.status(401).end()
     }
  }).finally( function() {
    req.session.destroy((err) => {
      if(err) {
        return console.log(err)
      }
    })
  });
})

const isProd = process.env.NODE_ENV === 'production'
let config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)
app.listen(3000,'0.0.0.0')
console.log('Server is listening on http://0.0.0.0:3000')
