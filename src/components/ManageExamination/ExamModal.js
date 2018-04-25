import React, {Component} from 'react';
import Modal from 'react-bootstrap4-modal';
import CKEditor from "react-ckeditor-component";

class ExamModal extends Component {
    constructor(props) {
        super(props);
        this.state ={
            firstName:'',
            description:'',
            question:'',
            questionList:[{
                title: 'Question #1'
            },]
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onQuestion = (e) =>{
        let newContent = e.editor.getData();
        this.setState({
            description: newContent
        })
    };

    addQuestion=()=>{
        const {questionList} = this.state;
        const inserted = {
            title: '',
            isNew: true,
        };
        questionList.push(inserted);
        this.setState({
            questionList
        })
    };

    removeQuestion=()=> {
        const {questionList} = this.state;
        questionList.pop(questionList);
        this.setState({
            questionList
        })
    };


    render() {
        const {questionList, firstName, description} = this.state;
        return (
            <Modal visible={this.props.show}>
                <div className="modal-header">
                    <h5 className="modal-title">Create</h5>
                </div>
                <div className="modal-body">
                    <div className="form-horizontal" >
                        <div className="form-group row">
                            <label className="col-md-3 col-form-label">Test Title</label>
                            <div className="col-md-9">
                                <input type="text"
                                       name="firstName"
                                       value={firstName}
                                       onChange={this.onChange}
                                       className="form-control"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3">Hide Copy Paste Textbox</label>
                            <div className="col-md-9">
                                <input type="checkbox"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3 ">Description</label>
                            <div className="col-md-9">
                                <CKEditor
                                    activeClass="p10"
                                    content={description}
                                    events={{
                                        "change": this.onQuestion
                                    }}
                                />
                            </div>
                        </div>

                        {
                            (questionList || questionList.length) && questionList.map((que,i)=>{
                                return(
                                    (que.isNew || que.title) &&
                                            <div className="form-group row" key={i}>
                                                <label className="col-md-3 ">Question #{i+1}</label>
                                                <div className="col-md-9">
                                                    <CKEditor
                                                        activeClass="p10"
                                                        content={que.title}
                                                        events={{
                                                            "change": this.onQuestion
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                );
                            })
                        }
                        <div className="text-right">
                            {questionList.length < 20 && <button type="button" className="btn btn-primary" onClick={this.addQuestion}>
                                Add Question
                            </button>}&nbsp;
                            <button type="button" className="btn btn-primary" onClick={this.removeQuestion}>
                                Remove Question
                            </button>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.props.handleModal}>
                        close
                    </button>
                    <button type="button" className="btn btn-primary" >
                        Save
                    </button>
                </div>
            </Modal>
        );
    }
}
export default ExamModal
