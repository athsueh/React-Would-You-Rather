import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

 class CreateQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
      }
      handleChange = (e) => {
        const optionOneText = e.target.value
    
        this.setState(() => ({
            optionOneText
        }))
      }
      handleChange2 = (e) => {
        const optionTwoText = e.target.value
    
        this.setState(() => ({
            optionTwoText
        }))
      }
      handleSubmit = (e) => {
        e.preventDefault()
    
        const { optionOneText, optionTwoText } = this.state
        const { dispatch, authedUser } = this.props

        const placeholderQuestion = {
            optionOneText,
            optionTwoText,
            author: authedUser
        }
    
        //function formatQuestion ({ optionOneText, optionTwoText, author }) {

        dispatch(handleAddQuestion( placeholderQuestion ))
    
        this.setState(() => ({
          text: ''
        }))

        this.props.history.push(`/`)
      }

  render() {
    const { optionOneText, optionTwoText } = this.state

    return (
      <div>
        <h1>Create New Question</h1>
        <h2>Would You Rather...</h2>
        <h3 className='center'>Compose new Question</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="...Option 1"
            value={optionOneText}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          />
          <textarea
            placeholder="...Option 2"
            value={optionTwoText}
            onChange={this.handleChange2}
            className='textarea'
            maxLength={280}
          />
          <br />
          <button
            className='btn'
            type='submit'
            disabled={optionOneText === '' || optionTwoText === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {    
    return {
        authedUser,            
    };
}

export default withRouter(connect(mapStateToProps)(CreateQuestion))