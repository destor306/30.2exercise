const items = require("./fakeDb")

class Item{
    constructor(name, price){
        this.name= name;
        this.price = price;
        
        items.push(this);
    }
    static showAll(){
        return items;
    }

    static update(name, data){
        let foundItem = Item.find(name);
        if(foundItem===undefined){
            throw {message:"Item not Found", status: 404};
        }
        foundItem.name = data.name;
        foundItem.price = data.price;
        return foundItem;
    }
    static find(name){
        const foundItem = items.find(item => item.name === name);
        if (foundItem === undefined){
            throw {message:"Not Found", status: 400};
        }
        return foundItem;
    }

/*
const foundItem = items.findIndex(item => item.name === req.params.name)
    if (foundItem === -1) {
      throw new ExpressError("Item not found", 404)
    }
    items.splice(foundItem, 1)
*/ 

    static delete(name){
        const foundItem = items.findIndex(item =>item.name === name)
        if (foundItem === -1){
            throw new {message:"Item not Found", status: 404};
        }
        items.splice(foundItem,1);
    }

}

module.exports = Item