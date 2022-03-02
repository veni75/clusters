const express = require("express");
const controller = require('./cluster.controller');

const router = express.Router();

// create
router.post('/', (req, res, next) => {
  return controller.create(req, res, next);
});

// read
router.get('/', (req, res, next) => {
  return controller.findAll(req, res, next);
});

router.get('/:myId', (req, res, next) => {
  return controller.findOne(req, res, next);
});

router.get('/:myId/start', (req, res, next) => {
  return controller.findOneStart(req, res, next);
});

router.get('/:myId/cluster', (req, res, next) => {
  return controller.findOneCluster(req, res, next);
});


// update
router.patch('/:myId', (req, res, next) => {
  return controller.update(req, res, next);
});

// delete
router.delete('/:id', (req, res, next) => {
  return controller.delete(req, res, next);
});

module.exports = router;
