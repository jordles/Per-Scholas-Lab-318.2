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

app.get("/template", (req, res) => {
  const options = {
    title: "This is Jordles's template engine",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis impedit aliquid illo. Magnam beatae, doloremque quis eum quidem itaque architecto laboriosam suscipit ab quas quo impedit provident? Aliquid optio, debitis dolor mollitia fuga earum eius? Mollitia eius fuga voluptates numquam.",
    footer: "This is Jordles's footer",
  };

  res.render("index", options);
});