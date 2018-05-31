var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/message', (req, res)=>{
  console.log(req.body);
  if (req.body.text==null || req.body.student_id==null || req.body.group_id==null) {
    res.json({success: false, msg: 'ERROR OCCURED'});
  } else {
    res.json({success: true, msg: 'Successfuly got a message from user.', text: "The text is :" + req.body.text});
  }
})
module.exports = router;
