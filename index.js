const express = require('express');
const app = express();

app.use(express.static(__dirname+'/'));
app.get('/singleplayer',(req, res)=>{
  res.sendFile(__dirname+'/public/singleplayer.html');
});
app.get('/multiplayer',(req, res)=>{
  res.sendFile(__dirname+'/public/multiplayer.html');
});


app.listen('3000',()=>{
  console.log('Server listening at port 3000!');
})
