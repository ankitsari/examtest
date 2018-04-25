import React, {Component} from 'react';
import Modal from 'react-bootstrap4-modal';

class TakeTestModal extends Component {
    constructor(props) {
        super(props);
        this.state ={
        }
    }

    render() {;
        return (
            <Modal visible={this.props.show}>
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">×</button>
                    <h5 className="modal-title">Start Techincal Test</h5>
                </div>
                <div className="modal-body">
                    <p>Once you start taking the test your start time will be logged, are you sure you are ready to start or do you need more time?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.props.handleModal}>
                        Need more time
                    </button>
                    <a href={'/TechnicalTest/TestStart'} className="btn btn-primary" >
                        Ready to start
                    </a>
                </div>
            </Modal>
        );
    }
}
export default TakeTestModal
