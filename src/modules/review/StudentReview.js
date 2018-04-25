import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Card,Rating, TextArea, Button, Divider } from 'semantic-ui-react'
import {submitReview} from '../../redux/actions';

var styles = {
    cardGroup: {
        // backgroundColor: 'red',
        marginBottom: '10px',
        marginTop: '20px'
    },
    card: {
        margin: '0 auto',
        marginTop: '20px',
        width: '70%',
        padding: '10px'
    },
    stars: {
        marginTop: '4px',
    },
    ratingRow: {
        marginBottom: '8px'
    }
}

class StudentReview extends Component {
    constructor(props){
        super(props);
        this.state = {
            averageRating: '0.00',

            communication_rating: 0,
            knowledge_rating: 0,
            adaptibility_rating: 0,
            recommendation_rating: 0,
            message: '',
            private_comment: ''
        }

        this.calcAverageRating = this.calcAverageRating.bind(this);
    }
    handleRate1 = (e, { rating, maxRating }) => {
        console.log(rating)
        this.setState({ communication_rating: rating, maxRating },()=>{
            this.calcAverageRating();
        })
        // console.log('rateing',rating1)
        
    }
    handleRate2 = (e, { rating, maxRating }) => {
        this.setState({ knowledge_rating: rating, maxRating },()=>{
            this.calcAverageRating();
        })
        // this.calcAverageRating();
    }
    handleRate3 = (e, { rating, maxRating }) => {
        this.setState({ adaptibility_rating: rating, maxRating },()=>{
            this.calcAverageRating();
        })
        // this.calcAverageRating();
    }
    handleRate4 = (e, { rating, maxRating }) => {
        this.setState({ recommendation_rating: rating, maxRating },()=>{
            this.calcAverageRating();
        })
        // this.calcAverageRating();
    }

    calcAverageRating(){
        console.log('function rating enetered')
        let averageRating = (this.state.communication_rating + this.state.knowledge_rating + this.state.adaptibility_rating + this.state.recommendation_rating)/4;
        // console.log(this.state.communication_rating)
        this.setState({averageRating: averageRating},()=>{console.log(this.state.averageRating)})
    }

    _inputHandler = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    reviewSubmit=async() =>  {

        let body = {
            review: {
                message: this.state.message,
                other_rating: this.state.averageRating,
                communication_rating: this.state.communication_rating,
                knowledge_rating: this.state.knowledge_rating,
                // cc: this.state.email,
                // bcc: this.state.email,
                adaptibility_rating: this.state.adaptibility_rating,
                recommendation_rating: this.state.recommendation_rating,
                // recipient_id: 4,
                private_comment: this.state.private_comment
            }
        }
        console.log(body);
    
        setTimeout(()=>this.setState({loading:false}), 1500);	
        await this.props.submitReview(body);

        // this.setState({
        //         email: '',
        //         subject: '',
        //         ticket_category_id: '',
        //         description: '',
        //         fileText: 'Add File'
        // })
    
    }


    render() {
        return (
            <div>
                <Card.Group style={styles.cardGroup}>

                    <Card style={styles.card}>
                    <Card.Content>
                        <Card.Header>Public Feedback</Card.Header>
                        <Card.Meta>This feedback will be shared  on your tutor's profile only after they've left feedback for you.</Card.Meta>
                        <br/>
                        <Card.Description style={{marginBottom:'5px'}}><span style={{fontWeight: 'bold'}}>Feedback to Tutor</span></Card.Description>
                        <Card.Description style={styles.ratingRow}><Rating style={styles.stars} icon='star' maxRating={5} onRate={this.handleRate1} /> &nbsp; Communication</Card.Description>
                        <Card.Description style={styles.ratingRow}><Rating style={styles.stars} icon='star' maxRating={5} onRate={this.handleRate2} /> &nbsp; Knowledge/Understanding</Card.Description>
                        <Card.Description style={styles.ratingRow}><Rating style={styles.stars} icon='star' maxRating={5} onRate={this.handleRate3} /> &nbsp; Adaptability</Card.Description>
                        <Card.Description style={styles.ratingRow}><Rating style={styles.stars} icon='star' maxRating={5} onRate={this.handleRate4} /> &nbsp; Recommendation</Card.Description>
                        
                        <Card.Description style={{marginBottom:'5px'}}>Total Score: <span style={{fontWeight: 'bold'}}>{this.state.averageRating}</span></Card.Description>
                        <br/>
                        <Card.Description style={{marginBottom:'5px'}}><span style={{fontWeight: 'bold'}}>Share your experience with this tutor to the ClassPorch community:</span></Card.Description>
                        <Card.Description><TextArea name='message' onChange={this._inputHandler} value={this.state.message} placeholder='Write your comments here' style={{ minHeight: 100, width: '70%' }} /></Card.Description>
                        {/* <Card.Description style={{marginTop:'-5px'}}>See an <span style={{color: '#FFA500'}}>example of appropriate feedback</span></Card.Description>                         */}

                        {/* <Card.Description style={{marginBottom:'5px'}}><span style={{fontWeight: 'bold'}}>Share your experience with this tutor (This will be kept private):</span></Card.Description>
                        <Card.Description><TextArea name='private_comment' onChange={this._inputHandler} value={this.state.private_comment} placeholder='Write your comments here' style={{ minHeight: 100, width: '70%' }} /></Card.Description> */}
                        {/* <Card.Description style={{marginTop:'-5px'}}>See an <span style={{color: '#FFA500'}}>example of appropriate feedback</span></Card.Description>                         */}

                    </Card.Content>
                    </Card>



                    <Card style={styles.card}>
                    <Card.Content>
                        <Card.Header>Private Feedback</Card.Header>
                        <Card.Meta>This feedback will kept anonymous and never shared directly with the tutor.</Card.Meta>
                        <br/>

                        <Card.Description style={{marginBottom:'5px'}}><span style={{fontWeight: 'bold'}}>Any further comments you would like to share (Optional):</span></Card.Description>
                        <Card.Description><TextArea name='private_comment' onChange={this._inputHandler} value={this.state.private_comment} placeholder='Write your comments here' style={{ minHeight: 100, width: '70%' }} /></Card.Description>
                        {/* <Card.Description style={{marginTop:'-5px'}}>See an <span style={{color: '#FFA500'}}>example of appropriate feedback</span></Card.Description>                         */}

                    </Card.Content>
                    </Card>

                    

                </Card.Group>

                {/* <Button.Group style={{marginLeft: '14.5%', marginBottom: '50px'}}>
                        <Button>Cancel</Button>
                        <Button.Or /> */}
                        <Button style={{backgroundColor: '#F5A623', color: 'white',marginLeft: '14.5%', marginBottom: '50px'}} onClick={this.reviewSubmit} >Submit Review</Button>
                {/* </Button.Group> */}
            </div>
        );
    }
}


  const mapActionToProps = () => {
    return {submitReview}
  };
  
  
  
  export default connect(null, mapActionToProps())(StudentReview);