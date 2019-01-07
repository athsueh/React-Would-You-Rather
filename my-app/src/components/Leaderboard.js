import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class Leaderboard extends Component {
    sortScore = (u) => {
        const users = Object.values(u).sort((a,b) => (
            (Object.keys(b.answers).length+Object.keys(b.questions).length)-
            (Object.keys(a.answers).length+Object.keys(a.questions).length)                
        ))
        return users
    }

    displayUser = (user) => {
        return (
            <div key = {user.name}>
                <h2>{user.name}</h2>
                <img className="img" src={user.avatarURL} width="125" length="125" alt="profile pic"/>
                <p>Questions Asked: {user.questions.length}</p>
                <p>Questions Answered: {Object.keys(user.answers).length}</p>
                <p>Total Score: {user.questions.length+Object.keys(user.answers).length}</p>
            </div>
        )    
    }
    
    displayUsers = () => {
        const { users } = this.props        
        return (
            <div>
                {this.sortScore(users).map(u => this.displayUser(u))}            
            </div>
        )
    }

    render() {       
        
        return (
            <div>
                <h1>Leaderboard</h1>
                {this.displayUsers()}                
            </div>            
        )
    }
}

function mapStateToProps({ users }) {        
    return {
        users: Object.values(users)
    };
}

export default withRouter(connect(mapStateToProps)(Leaderboard))