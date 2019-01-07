export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_VOTE = 'ADD_VOTE'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function addVote ({ id, authedUser, answer }) {
  return {
    type: ADD_VOTE,
    id,
    authedUser,
    answer
  }
}

export function addQuestion ({ id, author }) {
  return {
    type: ADD_QUESTION,
    id,
    author    
  }
}