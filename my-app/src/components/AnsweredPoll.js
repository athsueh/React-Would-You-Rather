import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

 class AnsweredPoll extends Component {    
    state = {
      selectedOption: ''
   }
    
  componentWillMount () {
    let { id, users, authedUser } = this.props
    this.setState({ selectedOption: users[authedUser].answers[id] })
  }

  getStats = (id) => {
    let { questions } = this.props
    let optionOneVotes = questions[id].optionOne.votes.length
    let optionTwoVotes = questions[id].optionTwo.votes.length
    let totalVotes = optionOneVotes + optionTwoVotes
    
    return(
      <div>
        <p>Total number of votes for "{questions[id].optionOne.text}:" {optionOneVotes}.</p>
        <p>{(optionOneVotes/totalVotes).toFixed(2)*100}% of users voted for that option.</p>
        <p>Total number of votes for "{questions[id].optionTwo.text}:" {optionTwoVotes}.</p>
        <p>{(optionTwoVotes/totalVotes).toFixed(2)*100}% of users voted for that option.</p>
      </div>
    )
  }

  render() {
    const { id, questions } = this.props
    
    return (
      <div>        
        <h1>You Voted For:</h1>
        <form>
    <div className="radio">
      <label>
        <input type="radio" value="optionOne" 
                      checked={this.state.selectedOption === 'optionOne'} 
                      onChange={this.handleOptionChange}
                      readOnly />
        {questions[id].optionOne.text}
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="optionTwo" 
                      checked={this.state.selectedOption === 'optionTwo'} 
                      onChange={this.handleOptionChange}
                      readOnly />
        {questions[id].optionTwo.text}
      </label>
      {this.getStats(id)}
    
    </div>
  </form>
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

export default withRouter(connect(mapStateToProps)(AnsweredPoll))