import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Card,Rating, TextArea, Button, Divider } from 'semantic-ui-react'
import {submitTutorReview} from '../../redux/actions';

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

class TutorReview extends Component {
    constructor(props){
        super(props);
        this.state = {
            averageRating: '0.00',

            Cooperation: 0,
            Communication: 0,
            UnderstandingofMaterial: 0,
            recommendation_rating: 0,
            message: '',
            private_comment: ''
        }

        this.calcAverageRating = this.calcAverageRating.bind(this);
    }
    handleRate1 = (e, { rating, maxRating }) => {
        console.log(rating)
        this.setState({ Cooperation: rating, maxRating },()=>{
            this.calcAverageRating();
        })
        // console.log('rateing',rating1)
        
    }
    handleRate2 = (e, { rating, maxRating }) => {
        this.setState({ Communication: rating, maxRating },()=>{
            this.calcAverageRating();
        })
        // this.calcAverageRating();
    }
    handleRate3 = (e, { rating, maxRating }) => {
        this.setState({ UnderstandingofMaterial: rating, maxRating },()=>{
            this.calcAverageRating();
        })
        // this.calcAverageRating();
    }

    calcAverageRating(){
        console.log('function rating enetered')
        let averageRating = (this.state.Cooperation + this.state.Communication + this.state.UnderstandingofMaterial)/3;
        averageRating = Math.round(averageRating * 100)/100;
        // averageRating.toFixed(2);
        console.log(averageRating)
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
                // other_rating: this.state.averageRating,
                communication_rating: this.state.Communication,
                adaptibility_rating: this.state.UnderstandingofMaterial,
                other_rating: this.state.Cooperation,
                // recommendation_rating: this.state.Cooperation,
                // recipient_id: 4,
                private_comment: this.state.private_comment
            }
        }
        console.log(body);
    
        // setTimeout(()=>this.setState({loading:false}), 1500);	
        // await this.props.submitTutorReview(body);
    
    }

    render() {
        return (
            <div>
                <Card.Group style={styles.cardGroup}>

                    <Card style={styles.card}>
                    <Card.Content>
                        <Card.Header>Private Feedback</Card.Header>
                        <Card.Meta>This feedback will kept anonymous and never shared directly with the student.</Card.Meta>
                        <br/>
                        <Card.Description style={{marginBottom:'5px'}}><span style={{fontWeight: 'bold'}}>Feedback to Student</span></Card.Description>
                        <Card.Description style={styles.ratingRow}><Rating style={styles.stars} icon='star' maxRating={5} onRate={this.handleRate1} /> &nbsp; Cooperation</Card.Description>
                        <Card.Description style={styles.ratingRow}><Rating style={styles.stars} icon='star' maxRating={5} onRate={this.handleRate2} /> &nbsp; Communication</Card.Description>
                        <Card.Description style={styles.ratingRow}><Rating style={styles.stars} icon='star' maxRating={5} onRate={this.handleRate3} /> &nbsp; Understanding of Material</Card.Description>
                        {/* <Card.Description style={styles.ratingRow}><Rating style={styles.stars} icon='star' maxRating={5} onRate={this.handleRate4} /> &nbsp; Recommendation</Card.Description> */}
                        
                        <Card.Description style={{marginBottom:'5px'}}>Total Score: <span style={{fontWeight: 'bold'}}>{this.state.averageRating}</span></Card.Description>
                        <br/>
                        <Card.Description style={{marginBottom:'5px'}}><span style={{fontWeight: 'bold'}}>Share your experience with this student:</span></Card.Description>
                        <Card.Description><TextArea name='private_comment' onChange={this._inputHandler} value={this.state.private_comment} placeholder='Write your comments here' style={{ minHeight: 100, width: '70%' }} /></Card.Description>
                        {/* <Card.Description style={{marginTop:'-5px'}}>See an <span style={{color: '#FFA500'}}>example of appropriate feedback</span></Card.Description>                         */}

                        {/* <Card.Description style={{marginBottom:'5px'}}><span style={{fontWeight: 'bold'}}>Share your experience with this tutor (This will be kept private):</span></Card.Description>
                        <Card.Description><TextArea name='private_comment' onChange={this._inputHandler} value={this.state.private_comment} placeholder='Write your comments here' style={{ minHeight: 100, width: '70%' }} /></Card.Description> */}
                        {/* <Card.Description style={{marginTop:'-5px'}}>See an <span style={{color: '#FFA500'}}>example of appropriate feedback</span></Card.Description>                         */}

                    </Card.Content>
                    </Card>



                    {/* <Card style={styles.card}>
                    <Card.Content>
                        <Card.Header>Private Feedback</Card.Header>
                        <Card.Meta>This feedback will kept anonymous and never shared directly with the tutor.</Card.Meta>
                        <br/>

                        <Card.Description style={{marginBottom:'5px'}}><span style={{fontWeight: 'bold'}}>Any further comments you would like to share (Optional):</span></Card.Description>
                        <Card.Description><TextArea name='private_comment' onChange={this._inputHandler} value={this.state.private_comment} placeholder='Write your comments here' style={{ minHeight: 100, width: '70%' }} /></Card.Description>
                        
                    </Card.Content>
                    </Card> */}

                    

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
    return {submitTutorReview}
  };
  
  
  
  export default connect(null, mapActionToProps())(TutorReview);