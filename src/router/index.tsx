import * as React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { index } from '../views/index'
import { error } from '../views/error'

export const Router = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={index}></Route>
                <Route path="*" component={error}></Route>
            </Switch>
        </HashRouter>
    )
}