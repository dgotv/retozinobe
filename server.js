const  express = require('express');
const bodyParser = require('body-parser');

const session = require('express-session')

const createRoles = require('./utils/initialSetup')

const morgan = require('morgan')
const methodOverride = require('method-override');

const path = require( "path");
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const {config} = require('./config/index');

const db = require('./db');
const router = require('./network/routes');

const app = express();
createRoles();

  db(config.dbUrl);

app.use(morgan('dev'));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({

  //cambiar el secret
  secret: 'secretkey',
  resave: false,
   saveUninitialized:false

}))


app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: "main",
  layoutsDir: path.join(app.get('views'),'layouts') ,
  partialsDir: path.join(app.get('views'),'partials'),
  extname: '.hbs',
  handlebars : allowInsecurePrototypeAccess(Handlebars)
})
),
app.set('view engine', '.hbs');


//app.use(router);
router(app);

//servidor de estaticos
//app.use('/app', express.static("public"));

app.use(express.static(path.join(__dirname, "public")))

app.listen(config.port, function () {
  console.log(`Escuchando en  ${config.host}${config.port}`);
});

