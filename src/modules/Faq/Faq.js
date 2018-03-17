
/**
 * Created by raffi.
 * User: raffi
 * Date: 1/23/18
 */
import { apiEndpoints } from '../../ApiEndpoints';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Accordion, Icon, Pagination  } from 'semantic-ui-react'
//import {getFAQ} from '../../redux/actions';
import './index.scss';

export class Faq extends Component {
	state=
	{
		items:[],
		activeIndex: 0,
		activePage:1
		
	};
componentDidMount()
{
	
	fetch(`${apiEndpoints.base}/faq`, {
                headers: {
                    'auth-token': 'd3FxhQYWG0FIZqn1X1UN_Q'
                }
            })
	.then(rawRes => {console.log(rawRes); return rawRes.json()})
	.then(res =>{if(res.meta.code=="200") this.setState({items:res.response})})
			
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
	  
	  this.setState({activePage:activePage})
	  //view.scrollIntoView(false);
  }
    render() {
		const length=this.state.items.length;
		const {activePage}=this.state;
		const totalPages=(length % 10)? Math.floor(length/10+1) : length/10;
		let items;
		if(length<=10) items=this.state.items;
		else if(activePage==totalPages) items=this.state.items.slice((activePage-1)*10-1)
		else items=this.state.items.slice(activePage*10-10,activePage*10)
		const raws=items.map((item,i) => 
		<div>
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

const mapStateToProps = ({auth}) => {
  const {authToken} = auth;
 // const {FAQ} = dashboard;
  return {authToken}
};

/*const mapActionsToProps = () => {
  return {getFAQ}
};
*/
export default connect(mapStateToProps, {})(Faq);
