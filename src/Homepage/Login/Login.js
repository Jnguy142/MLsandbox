import React, { Component } from 'react';
import Loginform from './Loginform';
import Signupform from './Signupform';
import Loader from './Loader';

var conditionalRender = (authState, props) => {
  if (authState) {
    return <Loader/>
  } else {
    return <Loginform 
      signIn={props.signIn} />
  }
}

// <div className="modal-container">
// <modal show={props.popupState} onHide={props.closePopup}>
//   <div>
//     {conditionalRender(props.authenticating, props)}
//   </div>
// </modal>

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { formtype: 'login'};
    this.switchForm = this.switchForm.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  switchForm() {
    if ( this.state.formtype === 'login') {
      this.setState({formtype: 'signup'});
    }
    if ( this.state.formtype === 'signup') {
      this.setState({formtype: 'login'});
    }
  }

  renderForm() {
    if ( this.state.formtype === 'login') {
      return (<Loginform switchForm={this.switchForm} signIn={this.props.signIn}/>);
    }
    if ( this.state.formtype === 'signup') {
      return (<Signupform switchForm={this.switchForm} signUp={this.props.signUp}/>);
    }
  }

  render(){
    return (
      <div id="auth-popup" className="modal fade" tabIndex="-1" role="dialog" 
      aria-labelledby="exampleModalLiveLabel" style={{display: "none"}} aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              { this.renderForm() }
            </div>
          </div>
        </div>
      </div>
    
    );
  }
}

export default Login;
