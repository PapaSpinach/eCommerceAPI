const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: Product,
  }).then((categories) => res.status(200).json(categories));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: Product,
  })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

router.post('/', (req, res) => {
  Category.create(req.body)
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: { id: req.params.id },
  })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  Category.destroy({ where: { id: req.params.id } })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
