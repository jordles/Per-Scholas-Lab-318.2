/* -------------------------------------------------------------------------- */
/*                    PART 1: ROUTES, TEMPLATES, AND VIEWS                    */
/* -------------------------------------------------------------------------- */
const express = require("express")
const app = express()
const PORT = 3000;

app.set("view engine", "ejs"); //using ejs as the template engine
app.use(express.static('styles'));

const morgan = require("morgan");
// Third Party Request Logger
app.use(morgan("tiny"))

// request logger
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();  // Always passing control to the next middleware
});

app.get('/', (req, res) => {
  const options = {
    title: 'Welcome to the Home Page',
    content: 'This is the content of the Home page. You can navigate to the form page using the link above.',
    footer: 'Home Page Footer'
  };
  res.render("index", options) // render the index.ejs template
})

app.get("/index", (req, res) => {
  const options = {
    title: 'Welcome to the Home Page',
    content: 'This is the content of the Home page. You can navigate to the form page using the link above.',
    footer: 'Home Page Footer'
  };

  res.render("index", options);
});

app.get('/form', (req, res) => {
  const options = {
    title: 'Welcome to the Form Page',
    content: 'This is the content of the Form page.',
    footer: 'Form Page Footer'
  };
  res.render("form", options) // render the form.ejs template
})


//Route with parameter to modify response
app.get('/index/:user', (req, res) => {
  const options = {
    title: 'Welcome to the User Page',
    content: `Currently looking up ${req.params.user}`,
    footer: 'User Footer'
  };

  res.render('index', options)
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}.`)
})
/* ---------------------- MAKING MY OWN TEMPLATE ENGINE --------------------- */


// const fs = require("fs") //file system module

// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}.`)
// })

// app.engine("jordles", (filePath, options, callback) => { //make a template engine
//   fs.readFile(filePath, (err, content) => {
//     if (err) return callback(err);
    
//     const rendered = content
//       .toString()
//       .replaceAll("{title}", `${options.title}`)
//       .replaceAll("{content}", `${options.content}`)
//       .replaceAll("{footer}", `${options.footer}`);

//     return callback(null, rendered);
//   });
// })

// app.set("views", "./views"); // specify the views directory
// app.set("view engine", "jordles"); // register the template engine

// app.get("/index", (req, res) => {
//   const options = {
//     title: 'Welcome to the Home Page',
//     content: 'This is the content of the Home page. You can navigate to the form page using the link above.',
//     footer: 'Home Page Footer'
//   };

//   res.render("index", options);
// });

// // Route for Form Page
// app.get("/form", (req, res) => {
//   const options = {
//     title: 'Welcome to the Form Page',
//     content: 'This is the content of the Form page. You can navigate to the home page using the link above.',
//     footer: 'Form Page Footer'
//   };

//   res.render("form", options);
// })

// //Route to handle form submission
// app.post("/submit", (req, res) => {
//   console.log('Form Data:', req.body);
//   res.status(200).send('Form submitted successfully!');
// })

// //Route with parameter to modify response
// app.get('/index/:user', (req, res) => {
//   const options = {
//     title: 'Welcome to the User Page',
//     content: `Currently looking up ${req.params.user}`,
//     footer: 'User Footer'
//   };

//   res.render('index', options)
// })

/* -------------------------------------------------------------------------- */
/*                             PART 2: MIDDLEWARE                             */
/* -------------------------------------------------------------------------- */
/* ------------------- THIS CODE IS AT THE TOP OF THE FILE ------------------ */
// const morgan = require("morgan"); 
// // Third Party Request Logger
// app.use(morgan("tiny"))


// log request data
// const requestLogger = (req, res, next) => {
//   console.log(`${req.method} request for '${req.url}'`);
//   next();  // Always passing control to the next middleware
// };
// app.use(requestLogger);


/* -------------------------------------------------------------------------- */
/*                     PART 3: EXPLORING RESPONSE OPTIONS                     */
/* -------------------------------------------------------------------------- */

app.use(express.static("images"));

app.get("/download", (req, res) => {
  console.log(__dirname);
  const file = `${__dirname}/images/adrien-king.jpg`;
  res.download(file);
});

