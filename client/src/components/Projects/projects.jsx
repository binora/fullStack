import React, { Component } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from 'lodash';
import { getProjectsQuery } from "../../queries/queries";
import QuestionList from "../QuestionList/questionList";
import { Link } from "react-router-dom";
import "./projects.styles.scss";


class Projects extends Component {

    constructor(props) {
        super(props)
        this.container = React.createRef();
        this.state = {
            name: '',
            status: '',
            toEditor: false,
            open: false
        }
    }

    showProjectListComponent() {
        const data = this.props.data;
        if (data.loading) {
            return <div>Loading Projects...</div>
        }
        return data.projects.map(project => {
            return (
                <button className="btn btn-primary btn-block" key={project.id} onClick={(e) => { this.setState({ ...this.state, project }) }} >
                    <Link to={`/projects/${project.id}`}>{project.name}</Link>
                </button>
            )
        })

    }
    handleClick = () => {
        this.setState(state => {
            return {
                open: !state.open,
            };
        });
    };
    handleClickOutside = (event) => {
        if (this.container.current && !this.container.current.contains(event.target)) {
            this.setState({
                open: false,
            });
        }
        console.log(this.state.status);
    };
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }


    render() {
        // const { name } = this.state.project;
        return (
            <div className="projects">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <span className="container" ref={this.container}>
                        <button type="button" className="button" onClick={this.handleClick}>☰</button>
                        {this.state.open && (
                            <span className="status dropdown">
                                <select className="dropdown" onChange={(e) => this.setState({ status: e.target.value })}>
                                    <option>Approved</option>
                                    <option>Review</option>
                                </select>
                            </span>
                        )}
                    </span>
                    <span className="navbar-collapse navbarText">
                        {this.showProjectListComponent()}
                    </span>
                </nav>
                {(this.state.project) && (<span className="project-heading">{this.state.project.name}</span>)}
                <QuestionList client={this.props.client} />
            </div>
        )
    }

}

export default graphql(getProjectsQuery)(Projects);