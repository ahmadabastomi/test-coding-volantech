var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var dotenv = require('dotenv');
dotenv.config();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("Hello World")
});

router.get('/todos', function (req, res, next) {
  const { status, category } = req.body
  MongoClient.connect('mongodb://localhost:27017/tododb', function (err, client) {
    if (err) throw err
    var db = client.db('tododb')
    // if (status != "" || category != "") {
    //   db.collection('todos').find({
    //     $or: [{ status }, { category }]
    //   }).toArray(function (err, result) {
    //     if (err) throw err
    //     console.log(result)
    //     res.send(result)
    //   })
    // }
    // else if (status == undefined || category == undefined) {
    db.collection('todos').find().toArray(function (err, result) {
      if (err) throw err
      console.log(result)
      res.send(result)
    })
    // }
    // else {
    //   db.collection('todos').find().toArray(function (err, result) {
    //     if (err) throw err
    //     console.log(result)
    //     res.send(result)
    //   })
    // }
  })
});

router.get('/todo/:id', function (req, res, next) {
  let id = ObjectID(req.params.id);

  MongoClient.connect('mongodb://localhost:27017/tododb', async function (err, client) {
    if (err) throw err

    var db = client.db('tododb')
    try {
      await db.collection('todos').find(id).toArray(function (err, result) {
        if (err) throw err
        res.send(result[0])
      })
    } catch (e) {
      res.send("Data not Found")
    }
  })
});

router.post('/todo', function (req, res, next) {

  MongoClient.connect('mongodb://localhost:27017/tododb', async function (err, client) {
    if (err) throw err

    var db = client.db('tododb')
    try {
      await db.collection('todos').insert(req.body)
      res.send("Success Create Todo")
    } catch (e) {
      res.send("Failed Create Todo")
    }
  })
});

router.put('/edit_todo/:id', function (req, res, next) {
  let id = ObjectID(req.params.id);

  MongoClient.connect('mongodb://localhost:27017/tododb', async function (err, client) {
    if (err) throw err

    var db = client.db('tododb')
    try {
      await db.collection('todos').update({ _id: id },
        { $set: req.body }, (err, result) => {
          if (err) {
            throw err;
          }
          res.send('Todo Updated Sucessfully');
        })
    } catch (e) {
      res.send("Data not Found")
    }
  })
});


//Twillio FeedBack Delete
router.delete('/delete_todo/:id', function (req, res, next) {
  let id = ObjectID(req.params.id);
  MongoClient.connect('mongodb://localhost:27017/tododb', async function (err, client) {
    if (err) throw err

    var db = client.db('tododb')
    try {
      await db.collection('todos').deleteOne({ _id: id })
      await res.send("Success Delete Todo")
    } catch (e) {
      res.send("Data not Found")
    }
  })
});



module.exports = router;
