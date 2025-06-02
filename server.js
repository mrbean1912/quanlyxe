const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Vehicle = require('./models/vehicle');

const app = express();

mongoose.connect('mongodb+srv://hieu:AcSfrZj5PfNG2GB5@cluster0.gz7nenr.mongodb.net/quanlyxe?retryWrites=true&w=majority&appName=Cluster0');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.render('home', { vehicles });
});

app.post('/add', async (req, res) => {
  const { ten, hang, namSX, gia } = req.body;
  await Vehicle.create({ ten, hang, namSX, gia });
  res.redirect('/home');
});

app.post('/delete/:id', async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.redirect('/home');
});

app.post('/update/:id', async (req, res) => {
  const { ten, hang, namSX, gia } = req.body;
  await Vehicle.findByIdAndUpdate(req.params.id, { ten, hang, namSX, gia });
  res.redirect('/home');
});

app.listen(3000, () => {
  console.log('Server chạy tại http://localhost:3000');
});
