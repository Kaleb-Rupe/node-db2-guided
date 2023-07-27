const Fruit = require("./fruits-model");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  Fruit.getAll()
    .then((fruits) => {
      res.json(fruits);
    })
    .catch((err) => {
      next({
        status: 500,
        message: `Failed to retrieve fruits: ${err.message}`,
      });
    });
});

router.get("/:id", (req, res, next) => {
  Fruit.getById(req.params.id)
    .then((fruit) => {
      if (fruit) {
        res.json(fruit);
      } else {
        next({ status: 404, message: "Failed to retrieve fruit" });
      }
    })
    .catch((err) => {
      next({
        status: 500,
        message: `Failed to retrieve fruit: ${err.message}`,
      });
    });
});

router.post("/", (req, res, next) => {
  Fruit.create(req.body)
    .then((newFruitEntry) => {
      res.status(201).json(newFruitEntry);
    })
    .catch((err) => {
      next({ status: 500, message: `Failed to create fruit: ${err.message}` });
    });
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
