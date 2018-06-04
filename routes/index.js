var express = require('express');
var tools = require("../index")
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/message', (req, res)=>{
  console.log(req.body);
  if (req.body.text==null || req.body.chat_id==null) {
    res.json({success: false, msg: 'ERROR OCCURED'});
  } else {
    try{
      getMessage(req.body.chat_id, req.body.text);
    } catch(err) {
      console.log(err)
    }
    res.json({success: true, msg: 'Successfuly got a message from user.', text: "The text is :" + req.body.text});
  }
})
module.exports = router;
