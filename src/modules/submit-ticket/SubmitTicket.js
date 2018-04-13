import React, { Component } from 'react';
import {history} from '../../redux/store';
import {connect} from 'react-redux';
import {getCategories} from '../../redux/actions';
import { Button, Checkbox, Form, Grid, Segment, TextArea,Icon,Dropdown } from 'semantic-ui-react'

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
    }

}

class SubmitTicket extends Component {

    constructor(props){
        super(props);

        this.state = {
            cat: [{ text: 'Jenny Hess', value: 'Jenny Hess'}]
        }
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

    render() {

        
        return (
            <div>
                <Grid columns={2} divided>
                    <Grid.Row centered>
                    <Grid.Column>
                    <h4 className="ui header" style={styles.header} >Submit A <span style={styles.headerHelp}>Ticket</span></h4>
                        {/* <Segment> */}
                            {/* Form */}
                            <Form style= {styles.form}>
                                <Form.Field>
                                <label style={styles.labels}>Email*</label>
                                <input placeholder='Email' />
                                </Form.Field>
                                <Form.Field>
                                <label style={styles.labels}>Subject*</label>
                                <input placeholder='Subject' />
                                </Form.Field>

                                <Form.Field>
                                <label style={styles.labels}>Category*</label>
                                 <Dropdown placeholder='Category' search selection options={this.state.categories}/>
                                </Form.Field>

                                <Form.Field>
                                <label style={styles.labels}>Description</label>
                                <textarea/>
                                </Form.Field>
                                
                                {/* <Form.Field style={styles.labels} id='form-textarea-control-opinion' control={TextArea} placeholder='Description' /> */}
                                <Form.Field>
                                <label style={styles.labels}>Attachments</label>
                                <label style={styles.labels} id="#bb" style={styles.label}> <Icon name='attach' /> Add File
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



const mapStateToProps = ({dashboard}) => {
    const {FAQSubj,FAQ,STUDENTFAQ,TUTORSFAQ,TECHNICALFAQ,CATEGORIES} = dashboard;
    return {FAQSubj,FAQ,STUDENTFAQ,TUTORSFAQ,TECHNICALFAQ,CATEGORIES}
  };
  const mapActionToProps = () => {
    return {getCategories}
  };
  
  
  
  export default connect(mapStateToProps, mapActionToProps())(SubmitTicket);