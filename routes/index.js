var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

const UPLOAD_PATH = './uploads'

var upload = multer({ dest: UPLOAD_PATH })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//多文件上传
router.post('/upload', upload.any(), function (req, res, next) {
  const files  = req.files;
  // console.info('the files is ', files)
  const response = [];
  const result = new Promise((resolve, reject) => {
    files.map((v) => {
      fs.readFile(v.path, function(err, data) {
        fs.writeFile(`${UPLOAD_PATH}/${v.originalname}`, data, function(err, data) {
          const result = {
            file: v,
          }
          if (err)  reject(err);
          res.json({
            msg: '上传成功',
            source: '/static/'+v.originalname
          })
          resolve('成功');
        })
      })
    })
  })
  result.then(r => {

  }).catch(err => {
    res.json({ err })
  });
})




//单个文件上传
// router.post('/upload', upload.single('fileUpload'), function (req, res, next) {
//   const { file } = req;
//   fs.readFile(file.path, function(err, data) {
//     fs.writeFile(`${UPLOAD_PATH}/${file.originalname}`, data, function (err) {
//       if (err) res.json({ err })
//       res.json({
//         msg: '上传成功'
//       });
//     });
//   })
// })

module.exports = router;
