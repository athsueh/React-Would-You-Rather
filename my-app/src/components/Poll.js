import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import UnansweredPoll from './UnansweredPoll'
import AnsweredPoll from './AnsweredPoll'

class Poll extends Component {
    
     render() {        
        const { questions, users, authedUser, match } = this.props;
        const id = match.params.id
        const answered = Object.keys(users[authedUser].answers).includes(id)
        console.log(questions[id] === undefined)
        if (questions[id] === undefined){
            return(<div>
                <h1>ERROR 404</h1>
                <p>Looks like this question does not exist. Try navigating home. </p>
            </div>
            )
        }
        if(answered){
            return(
                <div>
                    {/*<h1>{id}</h1>*/}
                    <AnsweredPoll id = {id}/>   
                </div>
            )
        }
        else return(
                <div>
                    {/*<h1>{id}</h1>*/}
                    <UnansweredPoll id = {id}/>                    
                </div>
        )

    }
}

function mapStateToProps({ questions, users, authedUser }) {    

    return {
        questions,
        users,
        authedUser            
    };
}

export default withRouter(connect(mapStateToProps)(Poll))