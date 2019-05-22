var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var moment = require('moment')
/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('welcom to home');
  // console.log(req.data);
});
router.post('/login', function(req, res, next) {
  let user = req.body.user
    if(user.username === 'admin' && user.password === "123") {
      let payload = {
        userId:123,
        ext:moment().add(1,"h")
      }
      let token = jwt.encode(payload,"key")
      // console.log(token)
        res.setHeader("token",token)
        res.json({ logon : true })
      // console.log(11)
    
      // res.send('post 成功')
    } else {
      // console.log(11)
      res.json({ logon : false })
    }
     
  // console.log(req.body)
  
  
});

module.exports = router;
