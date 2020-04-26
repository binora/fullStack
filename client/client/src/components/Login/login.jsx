import React, { Component } from "react";
import { getUserQuery , userMutation } from "../../queries/queries";
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import "./login.styles.scss";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            role: '',
        }

    }
    displayUsers() {
       const {user} = this.props.getUserQuery; 
        // console.log(user);
        if(user){
            return (
                <div>
                    <p> Welcome {user.username}</p>
                </div>
            )
        }
      
    }


    //adding the updated state values to the query variables
    submitForm(e) {
        e.preventDefault();
        console.log(this.props.data);
        this.props.userMutation({
            variables: {
                username : this.state.username,
                password :this.state.password,
                role : this.state.role
            },
            refetchQueries: [{
                query: getUserQuery
            }]
        });
    }

    render() {
        return (
            <div className="login-page">
                <h2>Login Page</h2>
                <form id="user" onSubmit={this.submitForm.bind(this)}>
                    <div className="field">
                        <label>User Name :</label>
                        <input type="text" onChange={(e) => this.setState({ username: e.target.value })} required placeholder="Username" />
                    </div>
                    <div className="field">
                        <label>Password :</label>
                        <input type="password" onChange={(e) => this.setState({ password: e.target.value })} required placeholder="Password" />
                    </div>
                    <div className="field">
                        <label>Role :</label>
                        <input type="text" onChange={(e) => this.setState({ role: e.target.value })} required />
                    </div>
                 <button type="submit">Submit</button>
              </form>
                <span >
                    {this.displayUsers()}
                </span>
            </div>

        )
    }
}

export default compose(
    graphql(getUserQuery, { name: "getUserQuery" }),
    graphql(userMutation, { name: "userMutation" })
    )(Login);