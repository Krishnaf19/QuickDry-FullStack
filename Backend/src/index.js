import "dotenv/config"

import connectToDatabase from "./db/index.js"
import app from "./app.js"

connectToDatabase()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at http://localhost:${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("Mongodb connection failed!", error);
    
})