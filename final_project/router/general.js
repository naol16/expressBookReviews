const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req,res) => {
  //Write your code here

  const { username, password} = req.body;
  console.log(username);
  console.log(password);
  
  if (username && password){
    if (isValid(username)){
      res.send("user exists")
    }
    else{

      users.push({"username":username,"password":password});

      
      res.send(`user ${username} regesterd successfully}`);
    };
  }
  
  else{
    res.send("you  should have to insert both user and password");
    
    
  }

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,10))
  
 
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  isbn_given=req.params.isbn
  console.log(isbn_given)
  is_given=parseInt(isbn_given)
  console.log(is_given)
  result=[]
  for (var keys in books){
    if (books[keys].isbn===is_given)
    {
      result.push(books[keys])
    }

  }
  res.send(result[0])

  // return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  author_given=req.params.author
  console.log(author_given)
  
  result=[]
  for (var keys in books){
    string=books[keys].author
    new_string=string.split(" ").join("")
    if (new_string===author_given)
    {
      result.push(books[keys])
    }

  }
res.send(result)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  title_of_the_book=req.params.title
  result=[]
  for(keys in books){
    string=books[keys].title
    new_string=string.split(" ").join("")
    if (new_string===title1){
      result.push(books[keys])
    }
  }
   res.send(result[0])
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  new_isbn=req.params.isbn
  new_isbn2=parseInt(new_isbn)
  result=[]
  for(keys in books){
    if (books[keys].isbn===new_isbn2){
      result.push(books[keys].reviews)
    }
  }
  res.send(result[0])

  // return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
