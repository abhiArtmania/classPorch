
/**
 * Created by raffi.
 * User: raffi
 * Date: 1/23/18
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Accordion, Icon, Pagination, Dimmer, Loader,Segment   } from 'semantic-ui-react'
import {getFAQ} from '../../redux/actions';

import './index.scss';

class Faq extends Component {
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
	await this.props.getFAQ();
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
    render() {
		const length=this.props.FAQ.length;
		const {activePage}=this.state;
		const loading=(this.props.loading || this.state.loading)
		const totalPages=(length%10)?(Math.floor(length/10)+1) : length/10;
		let items;
		if(length<=10) items=this.props.FAQ;
		else if(activePage==totalPages) items=this.props.FAQ.slice((activePage-1)*10)
		else items=this.props.FAQ.slice(activePage*10-10,activePage*10)
		
		const raws=items.map((item,i) => <div>
		
		<Accordion.Title active={this.state.activeIndex === i} index={i} onClick={this.handleClick}>
          <Icon name='dropdown' />
         {item.question}
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === i}>
          <p>
            {item.answer}
          </p>
        </Accordion.Content></div>)
        return <div>
        
        <div style={{textAlign:"center", fontWeight:"bold",margin:"75px 0", fontSize:"2em", color:"steelblue"}}><span style={{ backgroundColor:"beige"}}>Frequently asked questions <span style={{color:"red"}}>{this.props.FAQSubj}</span>:</span></div> 
        {loading ?  (<Segment> <Dimmer active inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
      </Segment>
      ):(
        <div className="accord_container">  
         <Accordion styled>
       {raws}
        </Accordion>
         { length>10 && <Pagination defaultActivePage={this.state.activePage} totalPages={totalPages} onPageChange={this.onPageChanged.bind(this)} />}
        </div>
        )}
        </div>
    }
}


const mapStateToProps = ({dashboard}) => {
  const {FAQ, loading,FAQSubj} = dashboard;
  return {FAQ, loading, FAQSubj}
};

const mapActionToProps = () => {
  return {getFAQ}
};



export default connect(mapStateToProps, mapActionToProps())(Faq);