import React, { Component } from "react";
import "./editor.styles.scss";
import { graphql } from "react-apollo";
import { flowRight as compose } from 'lodash';
import { getQuestionsQuery, editQuestionMutation } from "../../queries/queries";


// ({ handleClose, showModal, children, item })
class EditModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            question: '',
            answer: ''
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.item === this.props.item) {
            return
        }
        this.setState({
            question: this.props.item.question,
            answer: this.props.item.answer
        });
    }

    //To fix
    submitForm(e) {
        console.log("submitted");
        console.log(this.props);
        e.preventDefault();
        this.props.editQuestionMutation({
            variables: {
                question: this.state.question,
                answer: this.state.answer
            },
            refetchQueries: [{
                query: getQuestionsQuery
            }]
        });
        this.setState({
            question: this.props.item.question,
            answer: this.props.item.answer
        });

    }

    render() {
        const showHideClassName = this.props.showEditModal ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName} >
                <div className="modal-main">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Edit Question</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="ques-answer">
                                <p className="title">Question</p>
                                <textarea rows="4" cols="50" name="question" value={this.state.question}
                                    onChange={(e) => this.setState({ question: e.target.value })} />
                                <p className="title">Answer</p>
                                <textarea rows="4" cols="50" name="answer"
                                    value={this.state.answer} onChange={(e) => this.setState({ answer: e.target.value })} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.handleClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.submitForm.bind(this)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}


export default compose(
    graphql(editQuestionMutation, { name: "editQuestionMutation" }))(EditModal);

