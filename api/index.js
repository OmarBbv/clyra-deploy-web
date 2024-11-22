const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 9000;
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');

const userRouter = require('./routers/userRouter');
const lessonRouter = require('./routers/lessonRouter');
const storyRouter = require('./routers/storyRouter');
const notificationRouter = require('./routers/notificationRouter');

dbConnect();

const corsOptions = {
  origin: "*", 
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  })
);

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/client/dist/'));
}

app.use('/api/users', userRouter);
app.use('/api/lessons', lessonRouter);
app.use('/api/stories', storyRouter);
app.use('/api/notifications', notificationRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
