import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { loginUserQuery } from "../../queries/queries";
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import "./login.styles.scss";

/*

login ---> username, password ----> server ---> checks in database ---> 


*/

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            toProjects: false,
        }
        this.redirectToProjects = this.redirectToProjects.bind(this)

    }
    //adding the updated state values to the query variables
    submitForm(e) {
        e.preventDefault();
        const { client } = this.props
        client.query({
            query: loginUserQuery,
            variables: {
                username: this.state.username,
                password: this.state.password,
            }
        }).then(({ data }) => this.redirectToProjects(data));
    }

    redirectToProjects(data) {
        const { user } = data
        if (user === null) {
            alert("Unknown user")
            return
        }
        this.setState({...this.state, toProjects: true})
    }

    render() {
        if (this.state.toProjects) {
            return <Redirect to="/projects"/>
        }
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
                    {/* <div className="field">
                        <label>Role :</label>
                        <input type="text" onChange={(e) => this.setState({ role: e.target.value })} required />
                    </div> */}
                    <button type="submit">Submit</button>
                </form>
                {/* <span >
                    {this.displayUsers()}
                </span> */}
            </div>

        )
    }
}

export default Login;