import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { handleSubmitVote } from "../actions/questions"

 class UnansweredPoll extends Component {
    state = {
      selectedOption: 'optionOne'
   }
    handleOptionChange = (changeEvent) => {
      
    this.setState({
      selectedOption: changeEvent.target.value
    });
  }
    handleFormSubmit = (formSubmitEvent) => {
      formSubmitEvent.preventDefault();

      console.log('You have selected:', this.state.selectedOption);

      let { id, authedUser, dispatch } = this.props

      dispatch(handleSubmitVote({
        id,
        answer: this.state.selectedOption,
        authedUser
      }))
  }

  render() {
    const { id, questions, users } = this.props
    let avy = questions[id].author

    console.log(users[avy].avatarURL)
    return (
      <div>
        <p>This question was asked by:</p>
        <img className="img" src={users[avy].avatarURL} width="125" length="125" alt="profile pic"/>
        <h1>Would You Rather?</h1>

        <form onSubmit={this.handleFormSubmit}>
    <div className="radio">
      <label>
        <input type="radio" value="optionOne" 
                      checked={this.state.selectedOption === 'optionOne'} 
                      onChange={this.handleOptionChange} />
        {questions[id].optionOne.text}
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="optionTwo" 
                      checked={this.state.selectedOption === 'optionTwo'} 
                      onChange={this.handleOptionChange} />
        {questions[id].optionTwo.text}
      </label>
    </div>
    <br/>
    <button className="btn btn-default" type="submit">Vote</button>    
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

export default withRouter(connect(mapStateToProps)(UnansweredPoll))