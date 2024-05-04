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
//using async and axios for out
public_users.get('/', async function (req, res) {
  try{
    const response = await axios.get('http://localhost:5000/');
    if(response.data){
    return res.status(200).json({BooksList: JSON.stringify(response.data)});

    }
  }
  catch (error){

    return res.status(500).json({message: error.message});
     
  }
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  isbn_given=req.params.isbn
  console.log(isbn_given)
  is_given=parseInt(isbn_given)
  console.log(is_given)
  result=[]
  if (books[is_given]){
  
      result.push(books[is_given])
  

  }
  res.send(result[0])

  // return res.status(300).json({message: "Yet to be implemented"});
});
// using async and axios 
public_users.get('/async/isbn/:isbn',async function (req, res) {
  let isbn = req.params.isbn
  try{
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    if(response.data){
    return res.status(200).json({Book: JSON.stringify(response.data)});

  }}
  catch (error){

    return res.status(500).json({message: error.message});
  }

    

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
// gating all author using async
public_users.get('/async/author/:author',async (req, res) =>{
  const author = req.params.author
  try{
    const response = await axios.get(`http://localhost:5000/author/${author}`)
    if (response.data){
  
      return res.status(200).json({"": response.data});
    }
  
  
  }
  catch(error){

    res.status(500).json({message: error.message});
  
  }
  

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
//async function for title
public_users.get('/async/title/:title',async (req, res) =>{
  const title = req.params.title
  try{
    const response = await axios.get(`http://localhost:5000/title/${title}`)
    if (response.data){
  
      return res.status(200).json({"": response.data});
    }
  
  
  }
  catch(error){
  
    res.status(500).json({message: error.message});
  
  }
  
  
  })

// async title getting title asyncly
public_users.get('/async/author/:author',async (req, res) =>{
  const author = req.params.author
  try{
    const response = await axios.get(`http://localhost:5000/author/${author}`)
    if (response.data){
  
      return res.status(200).json({"": response.data});
    }
  
  
  }
  catch(error){
  
    res.status(500).json({message: error.message});
  
  }
  
  
  })
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  new_isbn=req.params.isbn
  new_isbn2=parseInt(new_isbn)
  result=[]

    if (books[new_isbn2]){
      result.push(books[new_isbn2].reviews)
    }
  
  res.send(result[0])

  // return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
