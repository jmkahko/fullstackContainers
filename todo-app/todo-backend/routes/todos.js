const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

let added_todos = 0

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

router.get('/:id', async (req, res) => {
  const todos = await Todo.findById(req.params.id)
  res.send(todos);
});

router.put('/:id', async (req, res) => {
  const updateTodo = {
    text: req.body.text,
    done: req.body.done
  }

  await Todo.findByIdAndUpdate(req.params.id, updateTodo, { new : true })
  res.status(201).json(updateTodo)
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  redis.getAsync('key').then((data) => {
    let todosNro;
    if (parseInt(data, 10) > 0) {
        todosNro = parseInt(data, 10) + 1;
    } else {
      todosNro = 1;
    }
    redis.setAsync('key', todosNro);
  });

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
