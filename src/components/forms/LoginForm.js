import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';

class LoginForm extends React.Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        erros: {}
    }

    onChange = e => this.setState({data: {...this.state.data, [e.target.name]: e.target.value}});

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({loading:true})
            this.props.submit(this.state.data).catch(err => this.setState({errors:err.response.data.errors, loading:false}));
        }
    };

    validate = (data) => {
        const errors = {};
        if(!Validator.isEmail(data.email)) {
            errors.email = "Incorrect email"
        }
        if(!data.password) {
            errors.password = "Password can not be empty";
        }
        return errors;
    }

    render(){
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                { errors.global && <Message negative>
                    <Message.Header>There was an error</Message.Header>
                    <p>{errors.global}</p>
                </Message>}
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="eg@ie.com" value={this.state.data.email} onChange={this.onChange}/>
                    {this.state.data.errors.email && <Inline Error text = {this.state.data.errors.email} />}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="*****" value={this.state.data.password} onChange={this.onChange}/>
                    {this.state.data.errors.password && <Inline Error text = {this.state.data.errors.password} />}
                </Form.Field>
               <Button primary>Login</Button> 
            </Form>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;