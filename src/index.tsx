import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router } from './router'

import '../public/styles/normalize.scss'

ReactDOM.render(
    <React.StrictMode>
        <Router></Router>
    </React.StrictMode>,
    document.getElementById("app")
)