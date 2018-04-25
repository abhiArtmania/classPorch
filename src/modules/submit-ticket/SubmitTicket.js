import React, { Component } from 'react';
import {history} from '../../redux/store';
import {connect} from 'react-redux';
import {getCategories,submitTicket} from '../../redux/actions';
import { Button, Checkbox, Form, Grid, Segment, TextArea,Icon,Dropdown,Loader,Dimmer } from 'semantic-ui-react'

var styles = {
    form: {
        margin: '5%',
    },
    header: {
        margin: '15px',
        textAlign: 'center',
        fontSize: '40px'
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
    labels: {
        float: 'left'
    },
}

class SubmitTicket extends Component {

    constructor(props){
        super(props);

        this.state = {
            // cat: [{ text: 'Jenny Hess', value: 'Jenny Hess'}]
            email: '',
            subject: '',
            ticket_category_id: '',
            description: '',
            attachment: '',
            loading: false,
            fileText: 'Add File'
        }

        this.fileHandler = this.fileHandler.bind(this);
        this._inputHandler = this._inputHandler.bind(this);
    }

    componentDidMount=async() => 
  {
    await this.props.getCategories();
    if(this.props.CATEGORIES["ticket_categories"]) this.setState({ 
        categories: this.props.CATEGORIES["ticket_categories"].map(x => {
            return { key:x.id, text:x.name, value:x.id }
        })   
    })
       
  }



//   getCategories = (catCount) => {
//     let arrayCategories = [];
//     for (let i = 0; i < catCount; i++) {
//       let inHrs = (i + 1).toString();
//       arrayCategories.push({ key: inHrs, value: inHrs, text: inHrs })
//     }
//     return arrayCategories
//   };
fileHandler(){
    this.setState({fileText: document.querySelector('input[type="file"]').files[0]['name']})
}

setValue(e, data) {
    this.setState({ ticket_category_id: data.value })
  }

_inputHandler = (ev) => {
    this.setState({
        [ev.target.name]: ev.target.value
    })
}

formSubmit=async() =>  {
    this.setState({loading:true})
    let contact_ticket = {
        first_name: this.props.firstName,
        last_name: this.props.lastName,
        // cc: this.state.email,
        // bcc: this.state.email,
        subject: this.state.subject,
        description: this.state.description,
        ticket_category_id: this.state.ticket_category_id,
        attachment: document.getElementById('File').files[0],
        contact_type: 'Ticket'
    }
    // console.log(contact_ticket.attachment);
    let form = document.getElementById('ticket_form');

    setTimeout(()=>this.setState({loading:false}), 1500);	
    await this.props.submitTicket(contact_ticket,form);
    this.setState({
            email: '',
            subject: '',
            ticket_category_id: '',
            description: '',
            fileText: 'Add File'
    })
    this.formReset()

}
formReset(){
    document.getElementById("ticket_form").reset();
}

    render() {

        
        return (
            <div>
                <Grid columns={2} divided>
                    <Grid.Row centered>
                    <Grid.Column>
                    <h4 className="ui header" style={styles.header} >Submit A <span style={styles.headerHelp}>Ticket</span></h4>
                        {/* <Segment> */}
                            {/* Form */}
                            <Form id='ticket_form' enctype="multipart/form-data" style= {styles.form}>
                                <Form.Field>
                                <label style={styles.labels}>Email*</label>
                                <input placeholder='Email' name='email' onChange={this._inputHandler} value={this.state.email}/>
                                </Form.Field>
                                <Form.Field>
                                <label style={styles.labels}>Subject*</label>
                                <input placeholder='Subject' name='subject' onChange={this._inputHandler} value={this.state.subject} />
                                </Form.Field>

                                <Form.Field>
                                <label style={styles.labels}>Category*</label>
                                 <Dropdown placeholder='Category' onChange={this.setValue.bind(this)} value={this.state.ticket_category_id} search selection options={this.state.categories}/>
                                </Form.Field>

                                <Form.Field>
                                <label style={styles.labels}>Description</label>
                                <textarea name='description' onChange={this._inputHandler} value={this.state.description}/>
                                </Form.Field>
                                
                                {/* <Form.Field style={styles.labels} id='form-textarea-control-opinion' control={TextArea} placeholder='Description' /> */}
                                <Form.Field>
                                <label style={styles.labels}>Attachments</label>
                                <label style={styles.labels} id="#bb" style={styles.label}> <Icon name='attach' /> {this.state.fileText}
                                <input type="file" id="File" name='attachment' size="60" onChange={this.fileHandler} />
                                </label> 
                                
                                </Form.Field>
                                {
                                    (this.state.loading) ? (<Dimmer active inverted>
                                    <Loader inverted>Submitting</Loader>
                                    </Dimmer>
                                    
                                    ) : (<div></div>)
                                }
                                <Button type='submit' style={styles.btnSubmit} onClick={this.formSubmit}>Submit</Button>
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



const mapStateToProps = ({auth, dashboard}) => {
    const {FAQSubj,FAQ,STUDENTFAQ,TUTORSFAQ,TECHNICALFAQ,CATEGORIES} = dashboard;
    const {id, role, firstName, lastName} = auth;
    return {firstName, lastName, CATEGORIES};
  };

// const mapStateToProps = ({dashboard}) => {
//     const {FAQSubj,FAQ,STUDENTFAQ,TUTORSFAQ,TECHNICALFAQ,CATEGORIES} = dashboard;
//     return {FAQSubj,FAQ,STUDENTFAQ,TUTORSFAQ,TECHNICALFAQ,CATEGORIES}
//   };
  const mapActionToProps = () => {
    return {getCategories,submitTicket}
  };
  
  
  
  export default connect(mapStateToProps, mapActionToProps())(SubmitTicket);