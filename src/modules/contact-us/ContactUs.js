import React from 'react';
import {Grid, Form, TextArea} from 'semantic-ui-react';

export default class ContactUs extends React.Component {
  
  render() {
    return (
      <Grid container centered stretched columns={2}>
        <Grid.Row centered>
          <Grid.Column textAlign='left' width={12}
                       style={{fontSize: 64, marginTop: 24, marginBottom: 32, fontWeight: 300}}>
            Contact Us
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered stretched>
          <Grid.Column textAlign='left' width={6} style={{marginTop: 16, marginBottom: 16}}>
            <Grid>
              <Grid.Row>
                <Form style={{width: '100%'}}>
                  <Form.Input name={'name'} label='Your name' placeholder='John Doe'/>
                  <Form.Input name={'email'} label='Email' placeholder='johndoe@classporch.com'/>
                  <Form.Input name={'mobile'} label='Mobile Number' placeholder='Please enter with your country code'/>
                  <Form.Field name={'message'} label='Your message' control={TextArea} rows='6'/>
                </Form>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column textAlign='left' width={6} style={{fontSize: 14, marginTop: 16, marginBottom: 16}}>
            <Grid>
              <Grid.Row>
                <div style={{marginLeft: 32}}>
                  <p style={{fontSize: 20}}><b>Get in Touch</b></p>
                  <p>Your Complete Staffing Solution</p>
                  <p><b>Phone:</b> 647-201-1576<br/><b>Phone:</b> 416-648-9945</p>
                  <p><b>Email:</b> onestaffagency@gmail.com</p>
                  <p><b>Address:</b> 8887 The Gore Road Unit 41, Brampton, Ontario L6P 2K9</p>
                </div>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}