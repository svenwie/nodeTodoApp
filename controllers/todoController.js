var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://test:test8008@ds141870.mlab.com:41870/todo');

//create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'do stuff'}).save(function(err){
//   if(err) throw err;
//   console.log('item saved');
// });

// var data = [{item:'get milk'},{item:'walk dog'},{item:'do some coding'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){
  //get data from mongo db and pass it to the view
  Todo.find({}, function(err, data){
    if (err) throw err;
    res.render('todo', {todos: data});
    console.log('eins');
  });
});

app.post('/todo', urlencodedParser, function(req, res){
  //get data from the view and add it to mongodb
  var newTodo = Todo(req.body).save(function(err,data){
    if (err) throw err;
    res.json(data);
    console.log('zwei');
  });
});

app.delete('/todo/:item', function(req, res){
  //delete the requested item form mongodb
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
    if (err) throw err;
    res.json(data);
  })
});

};

// database access
// mongodb://<dbuser>:<dbpassword>@ds141870.mlab.com:41870/todo
