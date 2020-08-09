var db = require("../db");
var shortid = require('shortid')

module.exports.indexTransaction = (req, res) =>{
    res.render("transaction/borrow",{
        borrows:db.get("transaction").value()
    })
}

module.exports.getCreateTransaction = (req, res)=> {
    res.render("transaction/create",{
        users:db.get("users").value(),
        books:db.get("books").value()
    });
    
}

module.exports.postCreateTransaction = (req, res)=> {
    req.body.id = shortid.generate();
    console.log(req.body)
    db.get("transaction").push(req.body).write();
    res.redirect("/transaction");
}

module.exports.getViewTransaction = (req, res)  =>{
    var id = req.params.id;
    var tran = db.get("transaction").find({id: id}).value();
    res.render("transaction/view",{
        tran:tran
    })
}

module.exports.postViewTransaction = (req, res) =>{
    var id = req.body.id;
    db.get("transaction").find({id:id}).assign({isComplete: req.body.isComplete}).write();
    res.redirect("/transaction");
}