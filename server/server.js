// declarations

const express = require('express');
const app = express();
const path = require('path');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 5500;
//  server middleware

app.use(express.static(publicPath));


console.log(__dirname+'../public');
console.log();

// app.get('/', (res, req)=>{
//     res.send('First check');
// });

app.listen(port, () => console.log(`March Hare ready to go on ${port}`));