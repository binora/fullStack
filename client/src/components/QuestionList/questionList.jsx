
import React, { Component } from "react";
import { getQuestionsQuery } from "../../queries/queries";
import { graphql } from "react-apollo";
import EditQuestionModel from "../EditQuestion/editQuestion"

class QuestionList extends Component {
    constructor() {
        super()
        this.state = {
            showModal: false
        }
    }

    displayQuestions() {
        const data = this.props.data;
        if (data.loading) {
            return <div>Loading Questions...</div>
        }
        return data.questions.map(item => {
            return (
                <div key={item.id}>
                    <p>Question : {item.question}</p>
                    <p>Answer : {item.answer}</p>
                    <button>{item.priority}</button><br></br>
                    <button type="button" className="edit-button" onClick={this.showEditQuestionModal}>Edit Question</button>
                    <EditQuestionModel item= {item} showModal={this.state.showModal} handleClose={this.hideEditQuestionModal} />
                </div>
            )
        })
    }

    showEditQuestionModal = () => {
        console.log("open");
        this.setState({ showModal: true });
    }

    hideEditQuestionModal = () => {
        console.log("closed")
        this.setState({ showModal: false });
    }
    render() {
        return (
            <div className="question-answer-wrapper">
                <h1>QuestionList</h1>
                <h2>Project Name :{this.props.name}</h2>
                {this.displayQuestions()}

            </div>
        )
    }
}

export default graphql(getQuestionsQuery)(QuestionList);
