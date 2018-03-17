
/**
 * Created by raffi.
 * User: raffi
 * Date: 1/23/18
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Accordion, Icon, Pagination, Dimmer, Loader   } from 'semantic-ui-react'
import {getFAQ} from '../../redux/actions';

import './index.scss';

class Faq extends Component {
	state=
	{
		loading:true,
		items:[],
		activeIndex: 0,
		activePage:1
		
	};
componentDidMount=async() => 
{
		
		
	await this.props.getFAQ();
	this.setState({items:this.props.FAQ,loading:false})
			
}


  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }	
  onPageChanged(e,{activePage})
  {
	  let view=document.querySelector(".accord_container .pagination");
	  window.scrollTo(0,0)
	  this.setState({activePage:activePage})
	 
  }
    render() {
		const length=this.state.items.length;
		const {activePage}=this.state;
		
		const totalPages=(length%10)?(Math.floor(length/10)+1) : length/10;
		let items;
		if(length<=10) items=this.state.items;
		else if(activePage==totalPages) items=this.state.items.slice((activePage-1)*10)
		else items=this.state.items.slice(activePage*10-10,activePage*10)
		
		const raws=items.map((item,i) => <div>
		
		<Accordion.Title active={this.state.activeIndex === i} index={i} onClick={this.handleClick}>
          <Icon name='dropdown' />
         {item.question}{i+1}
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === i}>
          <p>
            {item.answer}
          </p>
        </Accordion.Content></div>)
        return <div>
        {this.state.loading &&   <div style={{position:"fixed", top:"0",bottom:"0",left:"0",right:"0"}}><Dimmer active inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
      </div>}
        <div style={{textAlign:"center", fontWeight:"bold",margin:"75px 0", fontSize:"2em", color:"steelblue"}}><span style={{ backgroundColor:"beige"}}>Frequently asked questions:</span></div> 
        <div className="accord_container">  
         <Accordion styled>
       {raws}
        </Accordion>
         { length>10 && <Pagination defaultActivePage={1} totalPages={totalPages} onPageChange={this.onPageChanged.bind(this)} />}
        </div>
        </div>
    }
}


const mapStateToProps = ({dashboard}) => {
  const {FAQ} = dashboard;
  return {FAQ}
};

const mapActionToProps = () => {
  return {getFAQ}
};



export default connect(mapStateToProps, mapActionToProps())(Faq);
