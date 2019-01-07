import { _saveQuestionAnswer, _saveQuestion } from '../_DATA'
import { addVote } from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions (questions) {
    return {
      type: RECEIVE_QUESTIONS,
      questions,
    }
}

function submitVote ({ id, authedUser, answer }) {
  return {
    type: ANSWER_QUESTION,
    id,
    authedUser,
    answer,
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleSubmitVote (info) {
  return (dispatch) => {
    dispatch(submitVote(info)) // updates the questions in _DATA.js
    dispatch(addVote(info)) // updates the users
   
    return _saveQuestionAnswer({
      authedUser: info.authedUser,
      qid: info.id,
      answer: info.answer,
    })
      .catch((e) => {
        console.warn('Error in handleVote: ', e)
        dispatch(submitVote(info))
        dispatch(addVote(info))
        alert('The was an error voting. Try again.')
      })
  }
}
//function formatQuestion ({ optionOneText, optionTwoText, author }) {

export function handleAddQuestion (question) {
  return (dispatch) => {
    return _saveQuestion( question )   
      .then((question) => dispatch(addQuestion(question))) 
  }
}

