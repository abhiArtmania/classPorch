
import React, {Component} from 'react'
import { Grid, Segment, Image } from 'semantic-ui-react'
import {connect} from 'react-redux'
import '../../styles.css'
import ReactStars from 'react-stars'


class ReviewsSegment extends Component {

    state = {
        allReviews:[],
        displayReviews:[],
        hiddenReviews:true,
        reviews:this.props.reviews|| null
    };

    componentWillMount(){
        this.setState({ 
            allReviews: Object.values(this.props.reviews),
            displayReviews: Object.values(this.props.reviews).slice(0,2),
        })
    }

    renderReviews = () => {
        console.log(this.state);
        console.log(this.state.reviews);
        if((this.state.reviews).length>0){
            return this.state.reviews.map((review,i) => {
                return(
                    <Grid.Row columns={2} centered key={i}  >
                        <Grid.Column width={2} textAlign='left' >
                            <Image src={review.reviewer_profile_picture} size='tiny' shape='circular' />
                        </Grid.Column>
                        <Grid.Column width={9} textAlign='left'  >
                            <div style={styles.top}>
                                <span style = {styles.name}> {review.reviewer.name} </span>
                                <span style = {styles.rating}> 
                                      <ReactStars
                                         value = {review.rating||0}
                                         count={5}
                                         edit={false}
                                         size={30}
                                         color2={'#ffd700'} />   
                                </span>
                            </div>
                            <div style = {styles.content}>
                                {review.review}
                            </div>
                        </Grid.Column>
                        <Grid.Column width={1}>
                        </Grid.Column>
                    </Grid.Row>
                )
            })
        }
        
    };

    onExpandReviews = () => {
        if(this.state.allReviews.length){
           return this.setState({ displayReviews: this.state.allReviews, hiddenReviews:false })
        }
    };

    render(){
        const {allReviews,displayReviews,hiddenReviews} = this.state;
        const segmentMessage = allReviews.length? `+${allReviews.length-2} more` : 'No reviews yet';
        console.log(this.props.profile);
        return(
            <Grid padded relaxed style={{width:'100%'}} >
                <Grid.Row centered >
                    <Grid.Column width={16} textAlign='left' >
                    <h2>Reviews</h2>
                            <div className="total-reviews">
                                <h3 className="review-count">({this.state.reviews?(this.state.reviews).length:''} Reviews)</h3>
                            </div> 
                    </Grid.Column>
                </Grid.Row>

                { this.renderReviews(displayReviews) }

                { hiddenReviews ? (<Grid.Row centered >
                    <Grid.Column width={8} >
                        <Segment style={styles.segment} inverted textAlign='center' onClick={this.onExpandReviews}>
                             {segmentMessage}
                        </Segment> 
                    </Grid.Column>
                </Grid.Row>) : null }

            </Grid>
        )
    }
}

const styles = {
    heading:{
        fontSize:'1.1em',
        fontWeight:600,
        marginTop:50,
    },
    top:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:10
    },
    name:{
        // paddingLeft:20,
        // paddingRight:20,
        fontSize:'16px', 
        textTransform:'capitalize',
        fontWeight:'bold'
    },
    rating:{
        paddingLeft:20,
        marginTop:10,
        paddingRight:20,
    },
    content:{
        fontSize:15
    },
    segment:{
        backgroundColor:'#eee',
        color:'#555',
        height:45,
    }
};

const mapStateToProps = ({profileState}) => {
    /*let {reviews} = profileState;
     reviews = {
        "0":{
                 "reviewer_name":"Phil Stevens",
                 "reviewer_profile_picture":"faker.internet.avatar()",
	 			"review":"mark is a good teacher.",
	 			"rating": 3
             },
         "1":{
                 "reviewer_name":"Phil Stevens",
                "reviewer_profile_picture":"faker.internet.avatar()",
	 			"review":"mark is a good teacher.",
 			"rating": 3
             },
         "2":{
                "reviewer_name":"Phil Stevens",
                 "reviewer_profile_picture":"faker.internet.avatar()",
	 			"review":"mark is a good teacher.",
	 			"rating": 3
             }
         }
    return  {reviews}*/
};

export default connect(mapStateToProps,{})(ReviewsSegment)
