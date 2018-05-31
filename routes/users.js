var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/chat', (req, res)=>{
  if (!req.body.text || !req.body.student_id || !req.body.student_id) {
    res.json({success: false, msg: 'ERROR OCCURED'});
  } else {
    res.json({success: true, msg: 'Successfuly got a message from user.', text: "The text is :" + req.body.text});
  }
})

module.exports = router;
