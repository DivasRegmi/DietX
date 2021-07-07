const router = require('express').Router();
const { Doctor } = require('../models');

const upload = require('../middlewares/multer');

// Get all users
router.get('/', (req, res, next) => {
  Doctor.findAll({
    where: req.query,
  })
    .then(function (doctors) {
      res.json(doctors);
    })
    .catch(next);
});

router.post('/', upload.single('profile'), (req, res, next) => {
  const { name, description, fee, mobile } = req.body;

  const profile = req.file;
  console.log(profile);

  Doctor.create({
    name,
    fee,
    description,
    mobile,
    profile: profile.filename,
  })
    .then(function (doctors) {
      res.json(doctors);
    })
    .catch((err) => next(err));
});

module.exports = router;
