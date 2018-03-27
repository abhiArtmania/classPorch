import React from 'react';
import {Grid, Checkbox} from 'semantic-ui-react';
import './styles.css';
import {Link} from "react-router-dom";

export default class BottomSection extends React.Component{

  constructor(){
    super();
    this.state={
      isAgreedToTerms: false
    }
  }

    agreedToTerms = (e) => {
        const {isAgreedToTerms} = this.state;
        this.props.isAgreedToTerms(!isAgreedToTerms);
        this.setState({
            isAgreedToTerms: !isAgreedToTerms
        });
    }

    render() {
        const {isAgreedToTerms} = this.state;
        return (
                <Grid.Row centered>
                    <Grid.Column width={8} textAlign='left'>
                        <Checkbox name='terms_agreed_check' className='terms-agreed-check'
                          checked={isAgreedToTerms} onClick={this.agreedToTerms}
                          required/>
                        <span style={{fontSize:"12px"}}>
                          I have read and agree to the
                            <Link to={'/privacy-policy'} className='sign-up-bottom-span-links'> Privacy Policy </Link>
                            and
                            <Link  to = {'/terms-of-service/student'} className='sign-up-bottom-span-links'> Terms of Service </Link>
                            documents of ClassPorch.
                        </span>
                        <br />
                          {this.props.agreeMessage && <span style={{color:"red",marginLeft:"35px"}}>You must agree on the terms and conditions of ClassPorch.</span>}
                    </Grid.Column>
                </Grid.Row>
        );
    }
}
