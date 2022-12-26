const Book = require("../modals/book-modal");

//get all books
exports.getAllBooks = async (req, res) => {
    const result = await Book.find();
    if (result.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No books found"
        });
    }
    return res.status(200).json({
        success: true,
        message: result
    });
}
//push new book
exports.createNewBook = async (req, res) => {
    const { name, author, genre, price, publisher } = req.body;

    const result = await Book.create({ name, author, genre, price, publisher });
    return res.status(201).json({
        success: true,
        message: result
    });
}
//get books by id
exports.getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Book.findById(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "no book with this id"
            });
        }
        return res.status(200).json({
            success: true,
            message: result
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success: false,
            message: "no book with this id"
        });
    }
}
//delete book by id
exports.deleteBookById = async (req, res) => {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }
    return res.status(200).json({
        success: true,
        message: "book deleted"
    });
}
exports.updateBookById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    // console.log({ ...data })
    const result = await Book.findByIdAndUpdate(id, { ...data });
    return res.status(200).json({
        success: true,
        data: result
    });
}