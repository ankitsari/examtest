import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import Session from './components/Session';
import Create from './components/Session/Create';
import Edit from './components/Session/Edit';
import ManageExamination from './components/ManageExamination';
import View from './components/Session/View';
import TakeTest from './components/Session/TakeTest';
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import store from './Redux/store'
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Header/>
                <div className="container">
                    <Route exact path="/" component={Session} />
                    <Route exact path="/session/create" component={Create} />
                    <Route exact path="/session/edit/:id" component={Edit} />
                    <Route exact path="/session/view/:id" component={View} />
                    <Route exact path="/createSession/token/:token" component={TakeTest} />
                    <Route exact path="/manage-exam" component={ManageExamination} />
                </div>
                <Footer/>
            </div>
        </Router>
    </Provider>,
    document.getElementById( 'root' )
);
registerServiceWorker();

