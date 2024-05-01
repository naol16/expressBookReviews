const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req,res) => {
  //Write your code here

 const { username1, password1} = req.body;
  if (!username1 || !password1 ){
    res.send("you  should have to insert both user and password");
    
  }
  
  else{
   const  existing=users.find((user)=>user.username===username1);
    if (existing){
      res.send("user exists")
    }
    else{
      users.push({"username":username1,"password":password1})
      res.send(`user ${username1} regesterd successfully`)
    }
  }

  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,10))
  
  return res.status(300).json({message: "here are the books "});
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
