require('dotenv').load()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')

const {
    usersRouter: users,
    allowanceRouter: allowance,
    requestsRouter: requests,
    goalsRouter: goals,
} = require('./routes')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/api/users', users)
app.use('/api/allowance', allowance)
app.use('/api/requests', requests)
app.use('/api/goals', goals)

app.use((req, res) => {
    const status = 404
    const message = `Could not ${req.method} ${req.path}`
    res.status(status).json({ status, message })
});

app.use((err, _req, res, _next) => {
    console.error(err)
    const status = err.status || 500
    const message = err.message || 'Something went wrong!'
    res.status(status).json({ message, status })
})

app.listen(port, () => {
    console.log('listening on port', port)
})
