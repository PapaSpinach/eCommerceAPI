const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({ include: Product }).then((tag) => res.status(200).json(tag));
});

router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, { include: Product })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.send(400).json(err));
});

router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.send(400).json(err));
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, { where: { id: req.params.id } })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.send(400).json(err));
});

router.delete('/:id', (req, res) => {
  Tag.destroy({ where: { id: req.params.id } })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.send(400).json(err));
});

module.exports = router;