import { _getUsers, _getQuestions } from '../_DATA'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

export function handleInitialData () {
  return (dispatch) => {
    return Promise.all([
      _getUsers(),
      _getQuestions()
    ]).then(([ users, questions ]) => {
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
    })
  }
}

