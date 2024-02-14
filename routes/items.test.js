//  you can set it up to 3 different environment. devlope,test,production
process.env.NODE_ENV ="test"

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let phone = {name:"Galaxy S24", price:"1300"}
let phone1 = {name:"Galaxy S24 AI", price:"1500"}


beforeEach(function(){
    items.push(phone);
    items.push(phone1);
})

afterEach(function(){
    items.length =0;
})

describe("GET /items", ()=>{
    test("Get all items", async()=>{
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items:[phone, phone1]})
    })
})

describe("GET /items:name", ()=>{
    test("Get by names", async()=>{
        const res = await request(app).get(`/items/${phone.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item:phone})
    })
    test("Response with 404 for invalid item", async()=>{
        const res = await request(app).get('/items/laptop');
        expect(res.statusCode).toBe(404);
    })
})

describe("POST /items", ()=>{
    test("Create a item", async()=>{
        const res = await request(app).post('/items').send({name:"GamingPC", price:"1500"});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({added:{name:"GamingPC",price:"1500"}})
    })

    test("Responds with 400 if name is missing", async()=>{
        const res = await request(app).post('/items').send({});
        expect(res.statusCode).toBe(400);
      })
})

describe("PATCH /items",()=>{
    test("Updates a item name", async()=>{
        const res = await request(app).patch(`/items/${phone.name}`).send({name:"Iphone15"})
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({updated: {name:"Iphone15"}})
    })
    test("Responds with 404 for invalid name", async()=>{
        const res = await request(app).patch('/items/sldkjfls').send({name:"Iphone"});
        expect(res.statusCode).toBe(404);
    })
})

describe("Delete /items/:name", ()=>{
    test("Deleting an item", async()=>{
        const res = await request(app).delete(`/items/${phone.name}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message:"Deleted"});
    })
    test("Deleting invalid cat", async()=>{
        const res = await request(app).delete(`/items/LSDkjfsl`)
        expect(res.statusCode).toBe(404);
    })
})