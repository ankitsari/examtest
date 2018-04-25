import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import ExamModal from './ExamModal';
import swal from 'sweetalert';
import { getManageExamsList } from '../../Redux/actions/index'
import './index.css'

const data = [
    {
        id: 1,
        testTitle: 'Postfix mathematical expression',
        description: 'Problem – Part 1\n' +
        'Given a string representing a postfix mathematical expression, write an algorithm that will evaluate the expression. The postfix expression must support the following ....',
    },
    {
        id: 2,
        testTitle: 'Karthik Kaveriselvan',
        description: '01/01/2017',
    },
    {
        id: 3,
        testTitle: 'Karthik Kaveriselvan',
        description: '01/01/2017',
    },
    {
        id: 4,
        testTitle: 'Karthik Kaveriselvan',
        description: '01/01/2017',
    },
    {
        id: 5,
        testTitle: 'Karthik Kaveriselvan',
        description: '01/01/2017',
    },
];

const mapStateToProps = state => ({
    examsList: state.exams && state.exams.exams,
});

const mapDispatchToProps = dispatch => ({
    fetchExams: dispatch(getManageExamsList),
});


class ManageExam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            examList: data,
            isModal: false,
        }
    }

    componentWillMount() {
        this.props.fetchExams()
    }

    removeTest = () => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to leave this page?",
            icon: "warning",
            dangerMode: true,
        })
        .then(willDelete => {
            if (willDelete) {
                swal("Deleted!", "Your imaginary file has been deleted!", "success");
            }
        });
    };

    handleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })
    }

    render() {
        const {examList, isModal} = this.state;
        return (
            <div className="manage-exam">
                <div className="flex-row mt-3">
                    <h2>Manage Exam</h2>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-blue mb-2" onClick={this.handleModal}>Create New Test</button>
                </div>
                <div className="flex-row mt-3">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Test Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            examList && examList.length > 0 && examList.map((exam, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{exam.testTitle}</td>
                                        <td className="description-width">{exam.description}</td>
                                        <td>
                                            <a className="btn btn-blue mr-1" onClick={this.removeTest}>Delete</a>
                                            <Link to={`/manage-exam/edit/${exam.id}`} className="btn btn-blue" onClick={this.onShowModal}>Edit</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                        {
                            examList && examList.length === 0 &&
                            <tr>
                                <td colSpan={3} className="text-center">
                                    No Records Found!
                                </td>
                            </tr>
                        }
                        </tbody>
                    </table>

                </div>
                <ExamModal title={'Create'} handleModal={this.handleModal} show={isModal}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageExam);
