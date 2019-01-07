import React from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Login from './Login'
import Poll from './Poll'
import CreateQuestion from './CreateQuestion'
import Leaderboard from './Leaderboard'
import { Route, BrowserRouter } from 'react-router-dom'
import Navigation from './Navigation';


class App extends React.Component {
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

    return (
      <BrowserRouter>
      <div>
        <Navigation />
        <Route exact path='/' render={() => (
          <Dashboard />
        )} />
        <Route path='/question/:id' render={() => (
          <Poll />
        )} />         
        <Route path='/add' render={() => (
          <CreateQuestion />
        )} /> 
        <Route path='/leaderboard' render={() => (
          <Leaderboard />
        )} /> 
      </div>
      </BrowserRouter>
    )
  }
}

export default connect((state) => ({
  loading: state.loading,
  authedUser: state.authedUser
}))(App)