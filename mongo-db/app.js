const { urlencoded } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");

const carModel = require("./schema");



const app = express();
const PORT = process.env.PORT || 5000;

// Allowing Body
app.use(express.json());
app.use(urlencoded({extended: true}))


// ------ PRACTICING POSTMAN ------ //


// MIDDLEWARE

// app.use("/", (req, res, next) => {
//   const user = false;
//   if (user) {
//     next();
//   } else {
//     res.send("UnAuth");
//   }
// });


// app.get("/", (req, res) => {
//     res.send("HOME PAGE");
// })


//--- params

// app.get("/api/user/:userName", (req, res) => {
//   const username = req.params;
//   console.log(username);
//   res.send(`HI ${username.userName}`);
// });

//--- params

//--- Query Selector

// app.get("/api/user", (req,res) => {
//     console.log(req.query);
//     res.send(`Welcome  ${req.query.name}`)
// })

//--- Query Selector

// app.post("/api/getbody", (req,res) => {
//     console.log(req.body);
//     res.send(`${req.body}`)
// })


// app.delete("/api/deleteuser", (req, res) => {
//     console.log(req.body);
//     res.send(req.body.name);
//   });

// ------ PRACTICING POSTMAN ------ //


// ------ PRACTICING MONGO DB ------ //


const baseUri = `mongodb+srv://ALI:ali.devs123@cluster0.bhhln.mongodb.net/cars?retryWrites=true&w=majority`
mongoose.connect(baseUri)
mongoose.connection.on("connected", () => console.log("mongoose connected"))
mongoose.connection.on("error", (error) => console.log(error))

//Middleware
app.use((req, res, next) => {
    console.log("hittttttt");
    const user = true;
    if (user) {
      next();
    } else {
      res.send("invalid");
    }
  });

app.get("/api/user", (req,res) => {

    // Getting Data using (find) method: It'll bring an Array of Objects

    carModel.find({avail: req.query.avail,}, (error,data) => {
        if(error){
            res.send(error)
        }else{
            res.send(data)
        }
    })

    // Getting Data using (findOne) method: It'll bring an Object

    // carModel.findOne({avail: req.params.avail}, (error, data) => {
    //     if(error){
    //         res.send(error)
    //     }else{
    //         res.send(data)
    //     }
    // })

})

app.post("/api/user", (req, res) => {
    let carObj = {
        brand_name: req.body.brand_name,
        model: req.body.model,
        year: req.body.year,
        avail: req.body.avail,
    }
    carModel.create(carObj, (error,data) => {
        if(error){
            res.send(error)
        }else{
            res.send(data)
        }
    })
})
  
// ------ PRACTICING MONGO DB ------ //





app.listen(PORT, console.log(`Server running on localhost:${PORT}`))