var express = require('express');
const { type } = require('os');
var router = express.Router();

const todos = [{
    id: 1,
    name: 'Do Something', 
    completed: false
}];

/* /todos */
router.get('/', function(req, res, next) {
  res.json(todos);
});

router.get('/:id', (req, res) => {
    const todo = todos.find((todo) => todo.id === Number(req.params.id))

    if(!todo) {
        return res.status(404).json({errorMessage: "todo not found"})
    }

    res.json(todo)
})

router.post('/', (req, res) => {
    const { body } = req;

    if(typeof body.name !== 'string') {
        return res.status(422).json({errorMessage: 'Must input a string'})
    }

    const newTodo = {
        id: todos.length + 1,
        name: body.name,
        completed: false
    }

    todos.push(newTodo)

    res.status(201).json(newTodo)

})

module.exports = router;
