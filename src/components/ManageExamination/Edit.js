import React, {Component} from 'react';
import ExamModal from './ExamModal';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
        }
    }

    render() {
        return <ExamModal/>
    }
}

export default Edit;