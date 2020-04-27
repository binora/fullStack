import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { loginUserQuery } from "../../queries/queries";
import { graphql } from "react-apollo";
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
        this.redirectToProjectPage = this.redirectToProjectPage.bind(this)

    }
    //adding the updated state values to the query variables
    submitForm(e) {
        e.preventDefault();
        const { client } = this.props;
        const data  = this.props.data;
        console.log(data);
        client.query({
            query: loginUserQuery,
            variables: {
                username: this.state.username,
                password: this.state.password,
            }
        }).then(({ data }) => {
            return (this.redirectToProjectPage(data))
        });
    }

    // showEditor(data) {
    //     console.log(data);
    //     const { user } = data
    //     if (user.role === "Admin" || user.role === "Editor") {
    //         console.log(`${user.role} logged In`);
    //         return <Redirect to ="/editQuestion" />
    //     }

    // }

    redirectToProjectPage(data) {
        console.log(data);
        const { user } = data
        if (user === null) {
            alert("Unknown user")
            return
        }
        localStorage.setItem("token", user.token);
        this.setState({
            ...this.state, toProjects: true
        })
    }

    render() {
        if (this.state.toProjects) {
            return <Redirect to="/projects" />
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
                    <button type="submit">Submit</button>
                </form>
            </div>

        )
    }
}

export default graphql(loginUserQuery)(Login);