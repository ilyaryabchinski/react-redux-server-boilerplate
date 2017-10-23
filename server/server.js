import path from 'path'
import fs from 'fs'
import Express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Config from './utils/config'
import AppReducers from '../client/reducers'
import App from '../client/containers/App'

const app = Express()
const port = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/public', Express.static(path.join(__dirname, 'public')))
app.use((req, res) => {
    const store = createStore(AppReducers)

    const renderedContent = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    )

    const initialState = store.getState()

    return res.render('index', {
        initialState: initialState,
        renderedContent: renderedContent
    })
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})