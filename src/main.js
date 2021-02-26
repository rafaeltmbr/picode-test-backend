const app = require("./app");

const port = process.env.PORT || 3001;

app.listen(port, (error) => {
  if (error) console.error(error);
  else console.log(`Server is listening at http://localhost:${port}`);
});
