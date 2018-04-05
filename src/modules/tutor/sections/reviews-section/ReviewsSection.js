
import React, {Component} from 'react'
import { array } from 'prop-types'
import { Grid, Segment, Image } from 'semantic-ui-react'
import '../../styles.css'
import defaultAvatar from 'assets/avatar/default.png';
import { Rating } from 'components/common'


class ReviewsSegment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allReviews: [],
      displayReviews: [],
      hiddenReviews: true
    }
  }

  componentWillMount(){
    this.setState({ 
      allReviews: this.props.data,
      displayReviews: this.props.data.slice(0,2),
      hiddenReviews: this.props.data.length > 2,
    })
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.data.length > 0) {
      this.setState({ 
        allReviews: nextProps.data,
        displayReviews: nextProps.data.slice(0,2),
        hiddenReviews: nextProps.data.length > 2,
      })
    }
  }

  renderReviews = (reviews) => {
    return reviews.map(review => {
      return(
        <Grid.Row className="review__group" columns={2} key={`review_${review.id}`} >
          <Grid.Column width={3} textAlign='left' >
            <Image
              src={review.reviewer.image ? review.reviewer.image : defaultAvatar}
              size='tiny'
              shape='circular'
            />
          </Grid.Column>
          <Grid.Column width={10} textAlign='left'>
            <div style={styles.top}>
              <span style={styles.name}> {review.reviewer.name} </span>
              <span style={styles.rating}>
                <Rating rate={review.rating} name={review.id} />
              </span>
            </div>
            <div style={styles.content}>
              {review.message}
            </div>
          </Grid.Column>
          <Grid.Column width={3}>
          </Grid.Column>
        </Grid.Row>
      )
    })
  };

  onExpandReviews = () => {
    if(this.state.allReviews.length){
      return this.setState({ displayReviews: this.state.allReviews, hiddenReviews: false })
    }
  };

  render(){
    const { allReviews, displayReviews, hiddenReviews } = this.state;
    const segmentMessage = allReviews.length ? `+${allReviews.length-2} more` : 'No reviews yet';

    return(
      <Grid padded relaxed style={{width:'100%'}} >
        <div className="ui clearing divider" style={{width:'100%', margin: 14}}></div> 
        <Grid.Row centered >
          <Grid.Column width={16} textAlign='left' >
            <h2 className="tutor__heading">
              Reviews
              <span className="total__reviews">
                {allReviews.length === 1 ? "(1 Review)" : `(${allReviews.length} Reviews)`}
              </span>
            </h2>
          </Grid.Column>
        </Grid.Row>

        { this.renderReviews(displayReviews) }

        {hiddenReviews && (
          <Grid.Row centered >
            <Grid.Column width={8} >
              <Segment
                style={styles.segment}
                inverted
                textAlign='center'
                onClick={this.onExpandReviews}
              >
                {segmentMessage}
              </Segment> 
            </Grid.Column>
          </Grid.Row>)}
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
  },
  name:{
    fontSize:'16px', 
    textTransform:'capitalize',
    fontWeight:'bold',
    lineHeight: "38px"
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

ReviewsSegment.propTypes = {
  data: array,
}

ReviewsSegment.defaultProps = {
  data: [],
}

export default ReviewsSegment
