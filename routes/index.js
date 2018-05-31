var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var BaseService = require('../service/BaseService');
var userService = new BaseService("users");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'QiaoOA' });
});
router.post('/login', function (req, res) {
    var userInfo = {openid:req.body.openid};
    userService.query(userInfo,function (qResult) {
        if(qResult&&qResult.length>0){
            return res.json(qResult[0]);
        }else{
            userService.insert(userInfo,function (iResult) {
                return  res.json(iResult[0]);
            });
        }
    });
});

module.exports = router;
