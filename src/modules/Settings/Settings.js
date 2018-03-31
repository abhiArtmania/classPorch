
/**
 * Created by raffi.
 * User: raffi
 * Date: 1/23/18
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Tab  } from 'semantic-ui-react'
import {getFAQ} from '../../redux/actions';

import './index.scss';

class Settings extends Component {
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


  
    render() {
		
        const panes = [
          { menuItem: 'Personal Info', render: () => <Tab.Pane>Personal Info</Tab.Pane> },
          { menuItem: 'Previous Expenses', render: () => <Tab.Pane>Previous Expenses</Tab.Pane> },
          { menuItem: 'Billing ', render: () => <Tab.Pane>Billing</Tab.Pane> },
          { menuItem: 'Change Password ', render: () => <Tab.Pane>Change Password</Tab.Pane> },
          { menuItem: 'Notification Settings ', render: () => <Tab.Pane>Notification Settings</Tab.Pane> },
        ]
        return <div style={{padding:'20px'}}>
        <div className="outer-setting"  >
          <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} />
        </div>
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



export default connect(mapStateToProps, mapActionToProps())(Settings);