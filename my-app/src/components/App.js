import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Login from './Login'
import Poll from './Poll'
import CreateQuestion from './CreateQuestion'
import Leaderboard from './Leaderboard'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Navigation from './Navigation';


class App extends Component {
  componentDidMount () {
    const { dispatch } = this.props

    dispatch(handleInitialData())
  }
  render() {
    const { authedUser } = this.props
    if (this.props.loading === true) {
      return <h3>Loading</h3>
    }

    if (!authedUser) {
      return <div>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
    </div>
    }

    const NoMatch = () => (
      <div>
        <h1>ERROR 404</h1>
        <p>Looks like this page does not exist. Try navigating home. </p>
      </div>
    )

    return (
      <BrowserRouter>
      <Fragment>      
        <Navigation />
        <Switch>
        <Route path='/' exact component ={Dashboard} />
        <Route path='/question/:id' component={Poll} />
        <Route path='/add' component={CreateQuestion} />
        <Route path='/leaderboard' component={Leaderboard} />
        <Route component={NoMatch} />    
        </Switch>
      </Fragment>
      </BrowserRouter>
    )
  }
}

export default connect((state) => ({
  loading: state.loading,
  authedUser: state.authedUser
}))(App)