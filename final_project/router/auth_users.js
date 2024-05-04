const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

var users = [{"username":"naol","password":"ew12"}]

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
value=users.filter((user)=>user.username===username)
if(value.length>0){
  return true
}
else{
  return false
}
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.

if (isValid(username)){
  value=users.filter((users)=>{
    return users.username==username && users.password===password}
  )

 if (value.length>0){
  return true
 }
 else{
  return false
 }
}
}
//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here

  const username = req.query.username;
  const password = req.query.password;
  
  //Write your code here

  if (!username || !password) {
    return res.status(500).json({message: "Error logging in"});
}
  if(isValid(username)){

    if(authenticatedUser(username, password)){
        let accesToken = jwt.sign({
          data : password 
        },"fingerprint_customer")

        req.session.authorization = {accesToken, username}
     
  return res.status(200).send("User successfully logged in" );
    }
    else{
      return res.status(208).json({message: "Invalid Login. Check username and password"});

    }
}
  else{
    return res.status(404).json({message : "User doesn't exist"});
  }

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  if (req.session.authorization){

  
  let isbn_new=req.params.isbn;
  let isbn2=parseInt(isbn_new)
  let name=req.body.name;
  let review=req.body.review;
  if (isbn_new ){

    if (books[isbn_new]){
      books[isbn_new].reviews={name:review}
      res.send("the review stored successfuly");
    }
    else{
     res.send("the book does not exist");
    }
  
  }}
  else{
    res.send("there no input of isbn")
  }

});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization["username"];


    if (books[isbn]) {
    

      if (values.reviews) {
        if (values.reviews[username]) {
          delete values.reviews[username];
          return res.status(200).json({ message: "Review deleted successfully" });
        } else {
          return res.status(404).json({ message: "Review not found" });
        }
      } else {
        return res.status(404).json({ message: "Review not found" });
      }
    
    }
    else{
  

  // If the loop completes without finding the book
  return res.status(404).json({ message: "Book not found" });
}});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
