if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');


app.set("view engine", "ejs");
app.set("views", __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded());

//ROUTERS
app.use('/', indexRouter);
app.use('/authors', authorRouter);

/*DATABASE*/
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log("Connected to DB."));


app.listen(process.env.PORT || 3000);