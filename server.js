const express = require('express');
const app = express();


const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


app.use(express.static('build'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

