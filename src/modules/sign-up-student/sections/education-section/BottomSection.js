import React from 'react';
import { Grid, Checkbox, Button } from 'semantic-ui-react';
import './styles.css';
import { Link } from "react-router-dom";

export default class BottomSection extends React.Component {
    state = { isAgreedToTerms: false };
    constructor(props) {
        super(props);
        this.Formvalidation = this.Formvalidation.bind(this);
    }

    agreedToTerms = (e) => {
        const { isAgreedToTerms } = this.state;
        this.props.isAgreedToTerms(!isAgreedToTerms);
        this.setState({
            isAgreedToTerms: !isAgreedToTerms
        });
    };

    Formvalidation() {

        var str=''
        if (document.getElementById("password").value == "") {
            document.getElementById("lblpassword").innerHTML = "required"
           str +='password,'
        }
        else {
            document.getElementById("lblpassword").innerHTML = ""
        }

        if (document.getElementById("CPassword").value == "") {
            document.getElementById("lblCpassword").innerHTML = "required"
            str +='Cpassword,'
        }
        else {
            if(document.getElementById("CPassword").value != document.getElementById("password").value){
                document.getElementById("lblCpassword").innerHTML = "password mismatch"
                str +='Mismatchpassword,'
            }
            else{
                document.getElementById("lblCpassword").innerHTML = ""
            }
        }


        if (document.getElementById("email").value == "") {
            document.getElementById("lblemail").innerHTML = "required"
           str +='lblemail,'
        }
        else {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("email").value))
            {
                document.getElementById("lblemail").innerHTML = ""
            }
            else{
                document.getElementById("lblemail").innerHTML = "email id is invalid"
            }

        }

        if (document.getElementById("Cemail").value == "") {
            document.getElementById("lblCemail").innerHTML = "required"
            str +='lblemail,'
        }
        else {
            if(document.getElementById("Cemail").value != document.getElementById("email").value){
                document.getElementById("lblCemail").innerHTML = "email mismatch"
                str +='lblCemail,'
            }
            else{
                document.getElementById("lblCemail").innerHTML = ""
            }
        }

        if(str !='')
        {
            return false;
        }

    }

    render() {
        const { isAgreedToTerms } = this.state;
        return (
                <Grid.Row centered>
                    <Grid.Column width={8} textAlign='left' style={{marginTop:"130px"}}>
                        <Checkbox name='terms_agreed_check' className='terms-agreed-check' checked={isAgreedToTerms} onClick={this.agreedToTerms} required />
                        <span>
                            I have read and agree to the
                            <Link to={'/privacy-policy'} className='sign-up-bottom-span-links'> Privacy Policy </Link>
                            and
                            <Link to={'/terms-of-service/student'} className='sign-up-bottom-span-links'> Terms of Service </Link>
                            documents of ClassPorch.
                        </span><br />
                       {this.props.agreeMessage && <span style={{color:"red",marginLeft:"35px"}}>You must agree on the terms and conditions of ClassPorch.</span>}
                    </Grid.Column>
                </Grid.Row>
        );
    }
}
