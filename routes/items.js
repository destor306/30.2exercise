const express = require('express');
const router = new express.Router();
const ExpressError = require("../expressError")
const items = require("../fakeDb")
const Item = require("../item")


// should render a list of shopping items
router.get("/", function(req, res){
    return res.json({ items : Item.showAll() })
})

router.post("/", function (req,res, next){
    try{
        if(!req.body.name || !req.body.price) throw new ExpressError("Name or price is require", 400);
        const new_item = new Item(req.body.name, req.body.price);
        return res.status(201).json({added:new_item})
    }
    catch (e){
        next(e);
    }

})


router.get("/:name", function (req, res) {
    return res.json({ item: Item.find(req.params.name) })
  })

router.patch("/:name", function (req, res) {
    return res.json({ updated: Item.update(req.body.name, req.body.price) })
})


router.delete("/:name", function (req, res) {
    Item.delete(req.params.name);
    res.json({ message: "Deleted" })
  })
  


module.exports = router;