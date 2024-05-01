const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
if (req.session.authorization){
    token=req.session.authorization['accessToken'];
    jwt.verify(token,(err,user)=>{
        if(!err){
            req.user=user;
            next();

        }
    else{
        return res.status(403).json("user is not authonticated")
    }
}
    )
}
else{
  return res.status(403).josn("user  did not logged in");
}
}
);
 
const PORT =7767;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
