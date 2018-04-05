import React, { Component } from 'react';
import { Button, Checkbox, Form, Grid, Segment, TextArea,Icon } from 'semantic-ui-react'

var styles = {
    form: {
        margin: '5%'
    },
    header: {
        margin: '15px',
        textAlign: 'center',
        fontSize: '50px'
    },
    headerHelp: {
        color: '#F5A623'
    },
    btnSubmit: {
        backgroundColor: '#F5A623',
        color: 'white',
    },
    label: {
        padding: '10px',
        background: 'white',
        border: '0.5px solid #DEDEDE', 
        display: 'table',
        color: 'black',
        width: '100%',
        textAlign: 'center'
    },
}

class SubmitTicket extends Component {
    render() {
        return (
            <div>
                <Grid columns={2} divided>
                    <Grid.Row stretched>
                    <Grid.Column>
                    <h1 className="ui header" style={styles.header} >Submit A <span style={styles.headerHelp}>Ticket</span></h1>
                        {/* <Segment> */}
                            {/* Form */}
                            <Form style= {styles.form}>
                                <Form.Field>
                                <label>Email*</label>
                                <input placeholder='Email' />
                                </Form.Field>
                                <Form.Field>
                                <label>Subject*</label>
                                <input placeholder='Subject' />
                                </Form.Field>
                                <Form.Field id='form-textarea-control-opinion' control={TextArea} label='Description' placeholder='Description' />
                                <Form.Field>
                                <label>Attachments</label>
                                <label id="#bb" style={styles.label}> <Icon name='attach' /> Add File
                                <input type="file" id="File"   size="60" />
                                </label> 
                                
                                </Form.Field>
                                <Button type='submit' style={styles.btnSubmit}>Submit</Button>
                            </Form>
                        {/* </Segment> */}
                    </Grid.Column>
                    {/* <Grid.Column>
                        <Segment>1</Segment>
                        <Segment>2</Segment>
                    </Grid.Column> */}
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default SubmitTicket;