const express = require('express');
const app = express();
const ejs = require('ejs');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

//routes
const homeRouter = require('./src/routes/home');
const signupRouter = require('./src/routes/signup');
const loginRouter = require('./src/routes/login');
const journalRouter = require('./src/routes/journal');

app.use(homeRouter);
app.use(signupRouter);
app.use(loginRouter);
app.use(journalRouter);

//database
require('./src/db/conn');
// const User = require('./src/models/users');
// const Journal = require('./src/models/journal');
// const { json } = require('express');
const { log } = require('console');

//paths
const staticPath = path.join(__dirname,"/src/public");
// const templatePath = path.join(__dirname,"/templates/views");
// const partialsPath = path.join(__dirname,"/templates/partials");

//template engines
app.use(express.static(staticPath));
app.set('view engine', 'ejs');
// hbs 
// app.set("view engine", "hbs");
// app.set("views", templatePath);
// hbs.registerPartials(partialsPath);
// hbs.localsAsTemplateData(app);
// app.locals.foo = "bar";

//listen
app.listen(port, ()=>{
    console.log(`Server is listening at ${port}`);
})