import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'


class ListQuestion extends Component {
    displayPoll = (id) => {
        this.props.history.push(`/question/${id}`)
    }
    render() {        
        const { questions, id } = this.props;

        if (id === null){
            return (
                <p>error: invalid question</p>
            )
        }

        return (
            <div onClick={() => { this.displayPoll(id)} }>
                <h1>Would You Rather?</h1>
                <p>{questions[id].optionOne.text}</p>
                <p>{questions[id].optionTwo.text}</p>                
                <p>Click to view details</p>
                <br/>
            </div>            
        )
    }
}

function mapStateToProps({ questions }) {
    return {
        questions
    };
}

export default withRouter(connect(mapStateToProps)(ListQuestion))