import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getProjectsQuery } from "../../queries/queries";
import QuestionList from "../QuestionList/questionList";
import { Link } from "react-router-dom";
import "./projects.styles.scss";


class Projects extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            toEditor: false
        }
    }

    showProjectListComponent() {
        // const { client } = this.props;
        const data = this.props.data;
        if (data.loading) {
            return <div>Loading Projects...</div>
        }
        return data.projects.map(project => {
            console.log(project)
            return (
                <li key={project.id} onClick={(e) => {
                    this.setState({ ...this.state, project })
                }} >
                    <Link to={`/projects/${project.id}`}>{project.name}</Link>
                </li>
            )
        })

    }

    showQuestionComponent() {
        if (this.state.project) {
            const { name } = this.state.project;
            return <QuestionList client={this.props.client} name={name} />
        }
    }
    // showEditor() {
    //     if (this.state.toEditor) {
    //         console.log("true");
    //         return  <Redirect to ="/editQuestion" />

    //     }
    // }
    render() {
        return (
            <div className="projects">
                <h2>Projects List</h2>
                <ul>{this.showProjectListComponent()} </ul>
                {this.showQuestionComponent()}
            </div>
        )
    }

}

export default graphql(getProjectsQuery)(Projects);