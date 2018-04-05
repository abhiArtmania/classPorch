import React from 'react';
import {history} from '../../redux/store';
import {connect} from 'react-redux';
import {Grid, Form, TextArea, Button, Card, Image, Header, Icon, Modal,Container,Segment,Input,Search,Label } from 'semantic-ui-react';
import logoDark from '../../assets/logo_dark.png';
import Parent from '../../assets/support/parents3.jpg'
import Tutors from '../../assets/support/tutors4.jpg'
import Technical from '../../assets/support/technica2.jpg'
import {setFAQSubject,getFAQ} from '../../redux/actions';
import './index.scss';
import _ from 'lodash'
import faker from 'faker'


// const source = _.times(5, () => ({
//   title: faker.company.companyName(),
//   description: faker.company.catchPhrase(),
//   image: faker.internet.avatar(),
//   price: faker.finance.amount(0, 100, 2, '$'),
// }))
const source = _.times(5, () => (
  {
  title: 'hk',
  description: 'hkdesc',
},
{
  title: 'pk',
  description: 'pkdesc'
}

))


const resultRenderer = ({ title }) => <Label content={title} />

var styles = {
  icons: {
      width: '50%',
      height: '50%',
      margin: '0 auto',
      display: 'block',
  },
  card: {
    height: '40%',
    boxShadow: 'none'
    // boxShadow: '1px 10px 14px -6px rgba(0,0,0,0.75)',
},
cardFooter: {
  backgroundColor: '#F5A623',
  color: 'white'
},
footerContent: {
  color: 'white'
},
searchboxContainer: {
  backgroundColor: '#F5A623',
  height: '120%',
},
searchbox: {
  margin: '0 auto',
  marginTop: '2%',
  width: '20%',
  
},
header: {
  marginTop: '10%',
  textAlign: 'center',
  fontSize: '50px'
},
headerHelp: {
  color: 'white'
}
}
class Support extends React.Component {

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
  }

  componentWillMount() {
    // this.resetComponent()
  }

//   componentDidMount=async() => 
// {
		
// 	await this.props.getFAQ(this.props.match.params.cat);
// 	this.setState({items:this.props.FAQ})
			
// }

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
      console.log("Search k wqt ki state: ",this.state.items)
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
    return <div id={id} key={id}>{question}</div>
  }
	
  goFAQ(sub)
  {
	  this.props.setFAQSubject(sub)
	  history.push("/faq/ParentTeacher")
  }
  search(){
    console.log("Searhc!!!")
  }
  goFAQTutor(sub)
  {
	  this.props.setFAQSubject(sub)
	  history.push("/faq/Tutor")
  }
  goFAQTechnical(sub)
  {
	  this.props.setFAQSubject(sub)
	  history.push("/faq/Technical")
  }
  close = () => this.setState({ modalVisible: false });
  render() {
    const { isLoading, value, results } = this.state
    return (
 
    <div>
      {/* <Container style={styles.searchboxContainer}>
      sefdf
      </Container> */}
    <Grid columns='equal'>
    <Grid.Row >
      <Grid.Column >
        <Segment style={styles.searchboxContainer}>
        <Button floated='right' onClick={()=>{history.push('/submit-ticket')}}>Submit Ticket</Button>
        <h1 className="ui header" style={styles.header} >Want any <span style={styles.headerHelp}>help?</span></h1>
        {/* <Input icon='search' fluid iconPosition='left' placeholder='Search here...' style={styles.searchbox}/> */}
        {/* <Search style={styles.searchbox}
          resultRenderer={resultRenderer}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            {...this.props}
          /> */}
          <Search
            style={styles.searchbox}
              loading={isLoading}
              resultRenderer={this.resultRenderer}
              onSearchChange={this.handleSearchChange}
              results={results}
              value={value}
            />
        </Segment>
      </Grid.Column>
    </Grid.Row>
    </Grid>
    <Card.Group style={{margin: "50px 15px", marginTop: '8%'}} itemsPerRow="3" stackable={true}>
    
    <Card  className="buttonCard" onClick={this.goFAQ.bind(this,"for Students/Parents")}>
    <Image src={Parent} style={styles.icons} />
      <Card.Content style={{margin: "auto", padding:"25px",textAlign:"center"}}>
        <Card.Header>
          For Students/Parents
        </Card.Header>
        <Card.Meta>
          FAQ
        </Card.Meta>
        <Card.Description>
         _______
        </Card.Description>
      </Card.Content>
      <Card.Content extra style={styles.cardFooter}>
            <a>
            <Icon name='question' style={styles.footerContent} />
            <span style={styles.footerContent}>14 Questions Found!</span>
            </a>
      </Card.Content>
    </Card>
    <Card className="buttonCard" onClick={this.goFAQTutor.bind(this,"for Tutors")}>
    <Image src={Tutors} style={styles.icons}/>
      <Card.Content style={{margin: "auto", padding:"25px",textAlign:"center"}}>
        <Card.Header>
          For Tutors
        </Card.Header>
        <Card.Meta>
          FAQ
        </Card.Meta>
        <Card.Description>
         _______
        </Card.Description>
      </Card.Content>
      <Card.Content extra style={styles.cardFooter}>
            <a>
            <Icon name='question' style={styles.footerContent} />
            <span style={styles.footerContent}>7 Questions Found!</span>
            </a>
      </Card.Content>
    </Card>
    <Card className="buttonCard" onClick={this.goFAQTechnical.bind(this,"Technical Support")}>
    <Image src={Technical} style={styles.icons}/>
      <Card.Content style={{margin: "auto", padding:"25px",textAlign:"center"}}>
        <Card.Header>
          Technical Support
        </Card.Header>
        <Card.Meta>
          FAQ
        </Card.Meta>
        <Card.Description>
         _______
        </Card.Description>
      </Card.Content>
      <Card.Content extra style={styles.cardFooter}>
            <a>
            <Icon name='question' style={styles.footerContent} />
            <span style={styles.footerContent}>22 Questions Found!</span>
            </a>
      </Card.Content>
    </Card>

   
    </Card.Group>
 
 
                
                </div>
             
    );
  }
}

const mapStateToProps = ({dashboard}) => {
  const {FAQSubj,FAQ} = dashboard;
  return {FAQSubj,FAQ}
};
const mapActionToProps = () => {
  return {setFAQSubject,getFAQ}
};



export default connect(mapStateToProps, mapActionToProps())(Support);
