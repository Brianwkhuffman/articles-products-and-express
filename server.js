const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var path = require('path');


const productRoute = require('./routes/products');
const articleRoute = require('./routes/articles');
const PORT = 8080;


app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/css', express.static(path.join(__dirname, '/css')));

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use('/products', productRoute);
app.use('/articles', articleRoute);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}$`));