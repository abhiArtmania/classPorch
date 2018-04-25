
/**
 * Created by raffi.
 * User: raffi
 * Date: 1/23/18
 */
import React, {Component} from 'react';
import {history} from '../../redux/store';
import {connect} from 'react-redux';
import { Accordion, Icon, Pagination, Dimmer, Loader,Segment,Header,Search   } from 'semantic-ui-react'
import {getFAQ,getSearchFAQ,setSearchFAQ} from '../../redux/actions';

import './index.scss';

var styles = {
  header: {
      // margin: '50px',
      // margin: '0 auto',
      // display: 'block',
      // textAlign: 'center',
      margin: '50px',
      fontSize: '50px',
      
  },
  searchbox: {
    // margin: '0 auto',
    // marginTop: '2%',
    // width: '20%',
    // size: '100'
    width: '30%',
    margin: '0 auto',
    borderRadius: '20px',
    marginTop: '-37px'
  },
  accordion: {
    marginBottom: '40px'
  },
  iconLeft: {
    marginLeft: '30%',
    color: '#F5A623'
  }

}

class Faq extends Component {
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
      ],
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.resultRenderer = this.resultRenderer.bind(this);

  }
	state=
	{
		loading:false,
		items:[],
		activeIndex: 0,
		activePage:1
		
	};
componentDidMount=async() => 
{
		
	this.setState({loading:true})
	setTimeout(()=>this.setState({loading:false}), 1500);	
	await this.props.getFAQ(this.props.match.params.cat);
	this.setState({items:this.props.FAQ})
			
}


  handleClick = (e, titleProps) => {
	
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  

  onPageChanged(e,{activePage})
  {
	  
	  this.setState({loading:true})
	  setTimeout(()=>this.setState({loading:false,activePage:activePage}), 1500);
	  let view=document.querySelector(".accord_container .pagination");
	  window.scrollTo(0,0)
	  
	 
  }



  handleSearchChange = (e, { value }) => {
    // if(value === null){this.props.getFAQ('faq');}

  // this.props.getFAQ(value);
  // setTimeout(() => {
  //   this.setState({items:this.props.FAQ})
  // }, 0.5);
  

  this.props.getSearchFAQ(value);
    setTimeout(() => {
    this.setState({Searchitems:this.props.SEARCHFAQ})
  }, 0.5);
  
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      const re = new RegExp(this.state.value, 'i');
      const isMatch = result => re.test(result.question);
      console.log("Search k wqt ki state: ",this.state.Searchitems)
      // const results = this.state.options.filter(isMatch).map(result => ({ ...result, key: result.id }));
      if(this.state.Searchitems.error === "No faq found!"){this.setState({Searchitems: []})}
      const results = this.state.Searchitems.filter(isMatch).map(result => ({ ...result, key: result.id }));

      this.setState({
        isLoading: false,
        results: results,
      });
    }, 500)
    // console.log(this.state.items)
  }

  resultRenderer({ id, question }) {
    console.log("Render pr agya")
    return <span id={id} key={id}>{question}</span>
  }

  goSearch = (e, { result }) => {
    this.props.setSearchFAQ(result);
    history.push("/SearchedFaq")
  }

    render() {
      const { isLoading, value, results } = this.state
      console.log(this.props.FAQ)
      
		const length=this.props.FAQ.length;
		const {activePage}=this.state;
		const loading=(this.props.loading || this.state.loading)
		const totalPages=(length%10)?(Math.floor(length/10)+1) : length/10;
		let items;
		if(length<=10) items=this.props.FAQ;
		else if(activePage==totalPages) items=this.props.FAQ.slice((activePage-1)*10)
		else items=this.props.FAQ.slice(activePage*10-10,activePage*10)
		// {console.log("ye items hain",items)}
		const raws=items.map((item,i) => <div>
		
		<Accordion.Title active={this.state.activeIndex === i} index={i} onClick={this.handleClick}  style={{backgroundColor:"white"}}>
          <Icon name='dropdown' />
         {item.question}
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === i} style={{backgroundColor:"white"}}>
          <p>
            {item.answer}
          </p>
        </Accordion.Content></div>)
        return <div>
        
        <div style={{textAlign:"center", fontWeight:"bold",margin:"45px 0", fontSize:"2em", color:"black"}}><span>Frequently Asked Questions <span style={{color:"#F5A623"}}>{this.props.FAQSubj}</span>:</span>
        
        </div> 
        <Icon style={styles.iconLeft} onClick={()=>{history.goBack()}} name='arrow left' size='big' /> 
        <Search
        fluid
        input={{fluid: true,}}
            style={styles.searchbox}
              loading={isLoading}
              resultRenderer={this.resultRenderer}
              onSearchChange={this.handleSearchChange}
              results={results}
              value={value}
              onResultSelect={this.goSearch}
            />
        {loading ?  (<Segment> <Dimmer active inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
        <br/>
        <br/>
      </Segment>
      ):(
        <div className="accord_container">  
         <Accordion styled style={styles.accordion}>
       {raws}
        </Accordion>
         { length>10 && <Pagination defaultActivePage={this.state.activePage} totalPages={totalPages} onPageChange={this.onPageChanged.bind(this)} />}
        </div>
        )}
        </div>
    }
}


const mapStateToProps = ({dashboard}) => {
  const {FAQ, SEARCHFAQ, loading,FAQSubj} = dashboard;
  return {FAQ, SEARCHFAQ, loading, FAQSubj}
};

const mapActionToProps = () => {
  return {getFAQ,getSearchFAQ,setSearchFAQ}
};



export default connect(mapStateToProps, mapActionToProps())(Faq);