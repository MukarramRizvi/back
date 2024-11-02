import express from "express";
const app = express();
import { data } from "./data.js";
import mongoose from "mongoose";
import Item from "./models/postId.js";
import bcrypt1 from "bcrypt";
import model from "./models/UserScehmea.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const owais = "mongodb+srv://ali:ali1@cluster0.tlb6f.mongodb.net/";

mongoose.connect(owais);

mongoose.connection.on("connected", () => console.log("mondodb connected"));
mongoose.connection.on("error", (err) => console.log(err));

// ALL PRODUCTS API

// app.get("/products",(request,response)=>{
//     response.send(data)
// })

// SIGLE API PRODUCTS GET METHOD

// app.get("/products/:id",(request,response)=>{
//     // response.send(data)
//      const single =   request.params.id;
//      const fil = data.filter((e,i)=> e.id == single)

//      response.send(fil)
//      return
// })

// ALL IN ONE API

// app.get("/products", (request, response) => {
//   const single = request.query.id;
//   if (request.query.id) {
//     const fil = data.filter((e, i) => e.id == single);

//     response.send(fil);
//     return;
//   }

//   response.send(data);
// });

// app.get("/", (request, response) => {
//   response.send("owais");
// });

// app.get("/users", (request, response) => {
//   response.send({
//     name: "owais",
//     age: 20,
//   });
// });

// app.get("/owais", (request, response) => {
//   // response.send("ok")
// });

// API METHODS

// create ====>post
// read ====>get
// update ====>put
// deled ====>deleted

// app.post("/api/post",(req,res)=>{
//     console.log(req.body)
//     res.send("create post")

// })
// POST API

// app.get("/getpost", (req, res) => {
//   res.json({
//     messege: "running",
//     status: true,
//   });
// });

// app.post("/createpost", async (req, res) => {
//   const { tittle, desc, postId } = req.body;
//   if (!tittle || !desc || !postId) {
//     res.json({
//       messege: "11111",
//     });
//     return;
//   }
//   const obj = {
//     tittle,
//     desc,
//     postId,
//   };

//   const response = await Item.create(obj);

//   res.json({
//     messege: "succefully",
//     data: response,
//   });
//   res.send("create post");
// });

// app.put("/updatepost",async (req, res) => {
// const {tittle , desc , postId} = req.body;
// console.log(tittle , desc , postId);

// const putdta = await Item.findByIdAndUpdate(postId,{tittle,desc});

// res.json({
//   messege:"post has been update",
//   data:putdta,
// })
// });

// app.delete("/api/postdelete/:id",async(req,res)=>{
// const prm = req.params.id;
//  await Item.findByIdAndDelete(prm);
// res.json({
//   messege:"delete succesfully",
// })

// })

app.post("/signup",async (req,res)=>{
  const {firstName,lastName,email,password}= req.body;

  if(!firstName || !lastName || !email || !password){
    res.json({
      massege:"fail",
      status:false,
    })
    return;
  }

  const hash = await bcrypt1.hash(password,10);
  console.log(hash);

  let obj ={
    firstName,
    lastName,
    email,
    password:hash,
  }

  const crt = await model.create(obj)
  res.json({
    messege:"true 11",
    status:true
  })

  res.send("api signup")
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({
      massege: "fail",
      status: false,
    });
    return;
  }

  const emaiExit = await model.findOne({ email });
  if (!emaiExit) {
    res.json({
      messege: "invailed Email & Passsword",
      status: false,
    });
    return;
  }

  const compass = await bcrypt1.compare(password,"$2b$10$lkEP7wFiyrqscscsOYIRXOEUcuA/CIIjhi7xtI9oryhSHXYHZLs/e");

  if(!compass){
    res.json({
      messege: "invailed Email & Passsword",
      status: false,
    })
    return;
  }

  res.json({
    messege:"succusfully login",
    status:true
  })
});

// PORT
app.listen(9000, () => {
  console.log("mukarram");
});
