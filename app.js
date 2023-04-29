const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');   

//const errorController = require('./controllers/error');

const sequelize = require('./util/database');

var cors = require('cors');

const app = express();

app.use(cors());



const orderRoutes = require('./routes/order');

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));  

app.use(orderRoutes);


//app.use(errorController.get404);

sequelize 
  .sync() 
  .then(result => {
    //console.log(result);
    app.listen(4000);
})
.catch(err => {
    console.log(err);
});