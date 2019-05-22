var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({msg:"我是首页，只能登录后进行浏览"})
});

module.exports = router;
