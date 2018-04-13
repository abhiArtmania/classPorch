import React, { Component } from 'react';
import {history} from '../../redux/store';
import {connect} from 'react-redux';
import { Accordion, Icon, Pagination, Dimmer, Loader,Segment,Header,Search ,Grid,Label  } from 'semantic-ui-react'
import {setFAQSubject,getFAQ,getStudentFAQ,getTutorsFAQ,getTechnicalFAQ,setSearchFAQ} from '../../redux/actions';




const resultRenderer = ({ title }) => <Label content={title} />

var styles = {
    question: {
        marginTop: '30px',
        textAlign: 'center'       
},
answer: {
    // margin: '10px',
    width: '100%',
    // margin: ' 20px auto',
    marginLeft: '135px',
    marginTop: '20px',
    textAlign: 'justify',
    marginBottom: '40px',
},
searchbox: {
    float: 'right'
    // margin: '0 auto',
    // marginTop: '2%',
    // width: '20%',
    // size: '100'
    
  },
  segment: {
      boxShadow: 'none',
      backgroundColor: '#F8F8F8',
      border: 'none'
  }
}




class SearchedFaq extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: 'React',
            isLoading: false,
            value: '',
            results: [],
            options: [
              {
                title: 'hk',
                description: 'hkdesc'
              },
              
              {
              title: 'pk',
              description: 'pkdesc'
              }
            ]
          };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.resultRenderer = this.resultRenderer.bind(this);

        // console.log(this.props.SELECTEDSEARCHFAQ);
    }



    handleSearchChange = (e, { value }) => {
        // if(value === null){this.props.getFAQ('faq');}
      this.props.getFAQ(value);
      setTimeout(() => {
        this.setState({items:this.props.FAQ})
      }, 0.5);
      
      
        this.setState({ isLoading: true, value })
    
        setTimeout(() => {
          const re = new RegExp(this.state.value, 'i');
          const isMatch = result => re.test(result.question);
          // console.log("Search k wqt ki state: ",this.state.items)
          // console.log("Ye hai jo selected hai",isMatch)
          // const results = this.state.options.filter(isMatch).map(result => ({ ...result, key: result.id }));
          if(this.state.items.error === "No faq found!"){this.setState({items: []})}
          const results = this.state.items.filter(isMatch).map(result => ({ ...result, key: result.id }));
    
          this.setState({
            isLoading: false,
            results: results,
          });
        }, 500)
        // console.log(this.state.items)
      }
    
      resultRenderer({ id, question }) {
        console.log("Render pr agya")
        return <div id={id} key={id} >{question}</div>
      }

      goSearch = (e, { result }) => {
        this.props.setSearchFAQ(result);
        history.push("/SearchedFaq")
      }




    render() {
        const { isLoading, value, results } = this.state
        // console.log(this.props.SELECTEDSEARCHFAQ.question);
        return (
            <div>
            <Grid columns='equal'>

            <Grid.Column>
              <Segment style = {styles.segment}>
                  <h3 style={styles.question}>{this.props.SELECTEDSEARCHFAQ.question}</h3>
                  <p style={styles.answer}>{this.props.SELECTEDSEARCHFAQ.answer}</p>

            
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Segment style = {styles.segment}>
              <Search 
            style={styles.searchbox}
              loading={isLoading}
              resultRenderer={this.resultRenderer}
              onSearchChange={this.handleSearchChange}
              results={results}
              value={value}
              onResultSelect={this.goSearch}
            />
              </Segment>
            </Grid.Column>
            
          </Grid>

           
          </div>
        );
    }
}



const mapStateToProps = ({dashboard}) => {
    const {FAQSubj,FAQ,STUDENTFAQ,TUTORSFAQ,TECHNICALFAQ,SELECTEDSEARCHFAQ} = dashboard;
    return {FAQSubj,FAQ,STUDENTFAQ,TUTORSFAQ,TECHNICALFAQ,SELECTEDSEARCHFAQ}
  };
  const mapActionToProps = () => {
    return {setFAQSubject,getFAQ,getStudentFAQ,getTutorsFAQ,getTechnicalFAQ,setSearchFAQ}
  };
  
  
  
  export default connect(mapStateToProps, mapActionToProps())(SearchedFaq);



// const mapStateToProps = ({dashboard}) => {
//     const {FAQSubj,FAQ,STUDENTFAQ,TUTORSFAQ,TECHNICALFAQ,SELECTEDSEARCHFAQ} = dashboard;
//     return {FAQSubj,FAQ,STUDENTFAQ,TUTORSFAQ,TECHNICALFAQ,SELECTEDSEARCHFAQ}
//   };
 
  
//   export default connect(mapStateToProps, null)(SearchedFaq);