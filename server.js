/**Purpose
 * 
 * Set up the path for the root/
 * Set up the middleware for JSON and URLencoding
 * Set the path for the notesRoutes
 * 
 * 
 */
const express = require("express")
const mongoose = require("mongoose")
const notesRoutes = require("./routes/notesRoutes")

const PORT = process.env.PORT || 8081
const DB_URL = "mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD_HERE@week06cluster.rhbdnom.mongodb.net/"

const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Set up the route to the root
app.get("/", (request, response) => {
    response.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>")
})

//Set up our route to routes set up in the routes/NodesRoutes.js file

app.use("/api", notesRoutes)

//Set up rhe connection to the MongoDB using connection String
//add monsoose framework
mongoose.connect(DB_URL)
    .then(()=>{
        console.log("Successfully connected to the MongoDB Atlas Server")
        app.listen(PORT, () => {
            console.log(`Server listening at port: ${PORT}`)
        })
    })
    
    .catch((error) => {
        console.log(error)
        console.log("Could not connect to the MongoDB sever")
        process.exit(1)
    })