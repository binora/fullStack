/*  
Making queries from React component
- Contruct a query
- Bind the query to the component
- recieved query data is reflected in the component
*/

import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getProjectsQuery } from "../../queries/queries";
import { Link } from "react-router-dom";
import "./projects.styles.scss";


class Projects extends Component {
    displayProjects() {
        var data = this.props.data; //props is the recieved data from query
        if (data.loading) {
            return <div>Loading Projects...</div>
        }
        return data.projects.map(project => {
            // return <li key={project.id}></li>
            // return <li key={project.id}>{project.name}</li>
            return (
                <li key={project.id}>
                    <Link to={`/projects/${project.id}`}>{project.name}</Link>
                </li>
                )
        })
    }
    render() {
        console.log(this.props.data);
        return (
            <div className="projects">
                <h2>Projects List</h2>
                <ul>
                    {this.displayProjects()}
                </ul>
            </div>
        )
    }

}
export default graphql(getProjectsQuery)(Projects);