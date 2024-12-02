const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductsRouter = require('./Routes/ProductsRouter');
const profileRoutes = require('./Routes/ProfileRouter');
const checklistRoutes = require('./Routes/ChecklistRouter')
const session = require('express-session');
const passport = require('./config/passport'); // Import Passport config

require('dotenv').config();
require('./config/db');

// Middleware setup
app.use(session({
    secret:  process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductsRouter);
app.use('/profile', profileRoutes)
app.use('/checklist', checklistRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})