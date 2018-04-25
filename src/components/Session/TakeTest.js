import React, {Component} from 'react';
import TakeTestModal from './TakeTestModal'

class TakeTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            modal: false,
            user: {}
        }
    }

    componentWillMount() {
        const pathname = window.location.pathname;
        const token = pathname.split('/')[3];
        const tokens = (localStorage.getItem('tokens') && JSON.parse(localStorage.getItem('tokens'))) || [];
        tokens.forEach((t) => {
            if(t.token.toString() === token) {
                this.setState({
                    user: t.user
                })
            }
        })
    }

    handleModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    render() {
        const {modal, user} = this.state;
        return (
            <div className="container body-content">
                <h3>{`Welcome ${user.FirstName} ${user.LastName}`} </h3>
                <div className="row token-actions">
                    <h4 className="align-right">
                        <a className="btn-blue" onClick={this.handleModal}>Take Technical Test</a>
                    </h4>
                </div>
                <TakeTestModal show={modal} />
            </div>
        );
    }
}

export default TakeTest;