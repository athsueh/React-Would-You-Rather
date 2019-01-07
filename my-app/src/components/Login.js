import React, { Component } from 'react';
import { setAuthedUser } from '../actions/authedUser';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'


class Login extends Component {
    state = {
        name: ''
    }

    onChange = (e) => {
        console.log(e.target.value)
        this.setState({ name: e.target.value });
    }

    onLogin = () => {
        const { name } = this.state;
        const { dispatch } = this.props;

        dispatch(setAuthedUser(name));
        this.props.history.push(`/`)
    }



    render() {
        const { name } = this.state;
        const { users } = this.props;
        return (
            <div>
                <h1>Login</h1>
                <h3>Please Select a User to Login as:</h3>
                <select onChange={this.onChange}>
                <option value=""></option>
                    {Object.keys(users).map(function (key) {                        
                        return (
                            <option value={users[key].id} key={key}>{users[key].id}</option>
                        );
                    })}
                </select>
                <button onClick={this.onLogin} disabled={name === ''}>
                    Login
                </button>

            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    };
}

export default withRouter(connect(mapStateToProps)(Login))