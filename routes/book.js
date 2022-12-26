const express=require("express");
const router=express();
const {getAllBooks, createNewBook, getBookById, updateBookById, deleteBookById}=require("../controllers/bookController");

//Get all books
router.get("/",getAllBooks);

//add new book
router.post("/",createNewBook);

//get book by id
router.get("/:id",getBookById);

//delete book by id 
router.delete("/:id",deleteBookById);

//update book by id
router.put("/:id",updateBookById);

module.exports=router;