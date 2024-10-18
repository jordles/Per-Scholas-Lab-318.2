/* -------------------------------------------------------------------------- */
/*                    PART 1: ROUTES, TEMPLATES, AND VIEWS                    */
/* -------------------------------------------------------------------------- */
const express = require("express")
const app = express()
const PORT = 3000;
const fs = require("fs")

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}.`)
})

app.engine("jordles", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    
    const rendered = content
      .toString()
      .replaceAll("{title}", `${options.title}`)
      .replaceAll("{content}", `${options.content}`)
      .replaceAll("{footer}", `${options.footer}`);

    return callback(null, rendered);
  });
})

app.set("views", "./views"); // specify the views directory
app.set("view engine", "jordles"); // register the template engine

app.get("/index", (req, res) => {
  const options = {
    title: 'Welcome to the Home Page',
    content: 'This is the content of the Home page. You can navigate to the form page using the link above.',
    footer: 'Home Page Footer'
  };

  res.render("index", options);
});

// Route for Form Page
app.get("/form", (req, res) => {
  const options = {
    title: 'Welcome to the Form Page',
    content: 'This is the content of the Form page. You can navigate to the home page using the link above.',
    footer: 'Form Page Footer'
  };

  res.render("form", options);
})

//Route to handle form submission