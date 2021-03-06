import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListQuestion from './ListQuestion'

class Dashboard extends Component {
  state = {
    answered: false
  }

  sortTime = (q) => {
    const qs = this.props.qs
    const qIds = (q).sort((a,b) => (
        (qs[b].timestamp)-
        (qs[a].timestamp)                
    ))
    return qIds
  }

  displayQuestions = () => {
    let qIds = ''
    if (this.state.answered === false) {
      qIds = this.props.unansweredQIds 
    } else { 
      qIds = this.props.answeredQIds
    }

    if (qIds !== null){
      console.log(qIds)
      qIds = this.sortTime(qIds)
    }

    return <div>
      { this.sortTime(qIds).map(id => <ListQuestion key={id} id={id} />)  }
    </div>

  }

  render() {
    return (
      <div>
        <h3 className='center'>Your Timeline</h3>
        <div className="buttons">
          <button onClick={() => this.setState({ answered: false}) }> Unanswered </button>
          <button onClick={() => this.setState({ answered: true}) }> Answered </button>          
        </div>
        <h2>Now Displaying {this.state.answered? 'Answered':'Unanswered'} Questions</h2>
        <ul className='dashboard-list'>
          {!this.state.answered && this.props.unansweredQIds.length === 0 ? 
            <p>Looks like there are no unanswered questions. Why not make one?</p>:""} 
          { this.displayQuestions() }
        </ul>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let userId = state.authedUser
  let questions = Object.values(state.questions)
  let authedUser = state.users[userId]
  let answeredQIds = Object.keys(authedUser.answers)
  let unansweredQIds = questions.filter(q => !answeredQIds.includes(q.id)).map(q => q.id)
  let qs = state.questions

  return { authedUser, answeredQIds, unansweredQIds, qs }
}

export default connect(mapStateToProps)(Dashboard)
