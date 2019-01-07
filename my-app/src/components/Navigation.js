import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

class Navigation extends Component {
    onLogout = () => {
        const { dispatch } = this.props;
    
        dispatch(setAuthedUser(''))
    }

    render() {
        const { users, authedUser } = this.props   
        return (
            <div>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' activeClassName='active'>New Question</NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>Leaderboard</NavLink>
                    </li>
                    <li>
                        Now Logged in as {users[authedUser].name}.                          
                    </li>
                    <li>
                        <button className="btn btn-default" onClick={this.onLogout}>Logout</button>   
                    </li>
                </ul>    
            </div>
        )
    }
}


function mapStateToProps({ users, authedUser, dispatch }) {        
    return {
        users,
        authedUser,
        dispatch,        
    };
}

export default withRouter(connect(mapStateToProps)(Navigation))