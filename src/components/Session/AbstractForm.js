import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { clone, cloneDeep, isEqual } from 'lodash';
import { isEmail, isEmpty } from 'validator';
import { createSession } from '../../utils/_data';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class AbstractForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false,
            fields: {
                FirstName: '',
                LastName: '',
                Email: '',
                Notes: '',
                Source: '',
                TestId: '',
            },
            errors: {
                FirstName: '',
                LastName: '',
                Email: '',
                Notes: '',
                Source: '',
                TestId: '',
            }
        }
    }

    validate(name, value) {
        switch (name) {
            case 'firstName':
                if (isEmpty(value)) {
                    return 'First name is Required';
                } else {
                    return '';
                }
            case 'lastName':
                if (isEmpty(value)) {
                    return 'Last name is Required';
                } else {
                    return '';
                }
            case 'email':
                if (isEmpty(value)) {
                    return 'Email is Required';
                } else if (!isEmail(value)) {
                    return 'Email is invalid';
                } else {
                    return '';
                }
            case 'source':
                if (isEmpty(value)) {
                    return 'Source Field is Required';
                } else {
                    return '';
                }
            case 'test':
                if (isEmpty(value)) {
                    return 'Test Field is Required';
                } else {
                    return '';
                }
            default: {
                return ''
            }

        }
    }

    handleChange = ({ target: { value, name } }) => {
        let newState = cloneDeep(this.state);
        newState.errors[name] = this.validate(name, value);
        newState.fields[name] = value;

        if (!isEqual(this.state, newState)) {
            this.setState(newState);
        }
    };
    handleSubmit = (ev) => {
        ev.preventDefault();
        const fields = clone(this.state.fields);
        let validationErrors = {};
        Object.keys(fields).map(name => {
            const error = this.validate(name, fields[name]);
            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });
        if (Object.keys(validationErrors).length > 0) {
            this.setState({ errors: validationErrors });
            return;
        }

        const random = Math.floor(Math.random() * Math.pow(2, 32));
        this.setState({
            link: `http://localhost:3000/createSession/token/${random}`
        })
        let data = {
            token: random,
            user: fields,
        }
        let tokens = localStorage.getItem('tokens') && JSON.parse(localStorage.getItem('tokens'))
        if(tokens && tokens.length) {
            tokens.push(data)
        } else {
            tokens = [data]
        }
        localStorage.setItem('tokens', JSON.stringify(tokens))
        /*createSession(fields).then((res) => {
            const random = Math.floor(Math.random() * Math.pow(2, 32));
            this.setState({
                link: `http://localhost:3000/createSession/token/${random}`
            })
            let data = {
                token: random,
                user: fields,
            }
            localStorage.setItem('tokens', JSON.stringify(data))
        }).catch((err) => {
            console.log(err)
        })*/
    };

    render() {
        const { link } = this.state;
        return (
            <div className="form-horizontal" >
                { link ?
                    <div className="row">
                        <div className="mt-4 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-12">
                            <h2>Token Url</h2>
                        </div>
                        <div className="col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-12 text-center">
                            <input type="text" id="txtUrl" className="form-control" value={link} style={{border: '1px dashed #999', borderRadius: 0, display: 'inline-block', maxWidth: '85%'}} />
                            <CopyToClipboard text={link} onCopy={() => this.setState({copied: true})}>
                                <input type="button" className="btn btn-primary" style={{borderRadius: 0}} value="Copy url" />
                            </CopyToClipboard>
                            {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                        </div>
                    </div>
                :
                <div>
                    <div className="header">
                        <h2 style={{marginTop: "unset"}}>{this.props.label}</h2>
                    </div>
                    <hr/>
                    <div className="form col-offset-sm-3 offset-sm-3 col-md-6 offset-md-3 col-sm-6 col-xs-12">

                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">First Name</label>
                    <div className="col-sm-8">
                        <input type="text"
                               name="FirstName"
                               className="form-control" value={this.state.fields.FirstName}
                               onChange={this.handleChange}/>
                        <small className="error">{this.state.errors.firstName}</small>
                    </div>
                </div>


                <div className="form-group row">
                    <label className="col-sm-4 col-form-label ">Last Name</label>
                    <div className="col-sm-8">
                        <input type="text"
                               name="LastName"
                               className="form-control" value={this.state.fields.LastName}
                               onChange={this.handleChange}/>
                        <small className="error">{this.state.errors.lastName}</small>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Email</label>
                    <div className="col-sm-8">
                        <input type="text"
                               name="Email"
                               className="form-control" value={this.state.fields.Email}
                               onChange={this.handleChange}/>
                            <small className="error">{this.state.errors.email}</small>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Notes</label>
                    <div className="col-sm-8">
                        <textarea className="form-control"
                                  name="Notes"
                                  value={this.state.fields.Notes}
                                  onChange={this.handleChange}/>
                    </div>
                </div>


                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Source</label>
                    <div className="col-sm-8">
                        <select className="form-control"
                                name="Source"
                                value={this.state.fields.Source}
                                onChange={this.handleChange}>
                            <option value="">--Select--</option>
                            <option value="1">Upwork</option>
                            <option value="2">Referral</option>
                            <option value="3">LinkedIn</option>
                            <option value="4">Other</option>
                        </select>
                            <small className="error">{this.state.errors.source}</small>
                    </div>
                </div>


                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Test</label>
                    <div className="col-sm-8">
                        <select className="form-control"
                                name="TestId"
                                value={this.state.fields.TestId}
                                onChange={this.handleChange}>
                            <option value="">--Select--</option>
                            <option value="1">Postfix mathematical expression</option>
                            <option value="3">UI Test</option>
                            <option value="4">Basic Performance of a Program</option>
                            <option value="7">test</option>
                        </select>
                            <small className="error">{this.state.errors.test}</small>
                    </div>
                </div>


                <div className="form-group row">
                    <div className="col-md-3 offset-md-3">
                        <Link className="form-control btn btn-primary" to={'/'}>Back To List</Link>
                    </div>
                    <div className="col-md-3">
                        <button className="form-control btn btn-success" onClick={this.handleSubmit}>Create</button>
                    </div>
                </div>
            </div>
                </div>
                }
            </div>
        );
    }
}

export default AbstractForm;