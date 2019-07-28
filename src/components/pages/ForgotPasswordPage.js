import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Message} from 'semantic-ui-react';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import {resetPassword} from '../../actions/auth';

class ForgotPasswordPage extends React.Component {
    state = {
        success: false
    }

    submit = data => this.props.resetPassword(data).then(() =>
        this.setState({success:true}));
    
    render() {
        return (
            <div>
                {this.state.success ? (<Message>The Email has been successfully sent.</Message>) : (
                    <ForgotPasswordForm  submit={this.submit} />
                    )}
                </div>
        );
    }
}

ForgotPasswordPage.propTypes = {
    resetPassword: PropTypes.func.isRequired
};

export default connect(null, {resetPassword})(ForgotPasswordPage);