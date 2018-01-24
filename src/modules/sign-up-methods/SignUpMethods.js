import React, {Component} from 'react';
import {Grid, Button, Icon} from 'semantic-ui-react';
import MenuChangeStore from '../../menu';
import './styles.css';
import {history} from '../../redux/store';
import {connect} from "react-redux";
import FacebookLogin from "react-facebook-login";
import {loginUser} from "../../redux/actions";

class SignUpMethods extends Component {

    componentWillMount() {
        if (history.location.state) {
            this.setState({isStudent: history.location.state.from === "student"})
        }
        console.log(history)
        this.items = [
            {
                key: 'home',
                name: 'home',
                buttonTitle: 'HOME'
            }, {
                key: 'contact-us',
                name: 'contact-us',
                buttonTitle: 'CONTACT US'
            }
        ];
        MenuChangeStore.changeMenu(this.items);
    }

    openTutorSignUp(e) {
        history.push('/sign-up/tutor');
    }

    openStudentSignUp(e) {
        history.push('/sign-up/student');
    }


    loadingLoginFacebook() {
        if (this.props.loading) {
            return 'Please wait, logging you in ....'
        }
        return 'Login with Facebook'
    }
    responseFacebook = (response) => {
        console.log(JSON.stringify(response, null, 4));
        if (!response.accessToken) {
            history.push('/login');
        } else if (response.accessToken && response.email === undefined) {
            this.setState({isEmailFacebook: false});
            this.setState({fbResponseWithoutEmail: response})
            // prompt user to enter email
        } else {
            this.props.loginUser(this.makeLoginApiRequestBody(response.email, null, "facebook", response.accessToken, null))
        }

    };

    makeLoginApiRequestBody(email, password = "", provider = "", access_token = "", secret = "") {
        return {
            "user": {
                "email": email,
                "password": password,
                "provider": provider,
                "access_token": access_token,
                "secret": secret,
            }
        }
    }
    render() {
        let renderSignUpType = <Button size='massive' color='orange' circular
                                       onClick={this.openTutorSignUp.bind(this)}>Tutor</Button>;
        if (this.state && this.state.isStudent) {
            renderSignUpType = <FacebookLogin
                appId="1065627320236017"
                textButton="Sign up with Facebook"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,email,user_friends,user_actions.books"
                callback={this.responseFacebook}
                cssClass='login-button-facebook login-button-facebook-tutor'
                icon={<Icon className='login-no-border-icon' size='large' name='facebook'/>}
            />
        }
        return (
            <Grid className='sign-up-methods-body' id={'sign-up'}>
                <Grid.Row centered>
                    <p className='sign-up-methods-header'>How would you like to Sign Up?</p>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={4}>
                        {renderSignUpType}
                    </Grid.Column>
                    <Grid.Column width={1}>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Button size='massive' color='olive' circular
                                onClick={this.openStudentSignUp.bind(this)}>Student</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return state
};


export default connect(mapStateToProps,{loginUser})(SignUpMethods);

