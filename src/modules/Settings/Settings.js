
/**
 * Created by raffi.
 * User: raffi
 * Date: 1/23/18
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Card, Feed, Grid, Button, Icon, Label, Header, Segment, Divider } from 'semantic-ui-react'
import { getFAQ } from '../../redux/actions';
import { PersonalInfo } from './PersonalInfo';
import './index.scss';
import { PasswordInfo } from './PasswordInfo';
import { NotificationSettings } from './NotificationSettings';

class Settings extends Component {
  state =
    {
      loading: false,
      items: [],
      activeIndex: 0,
      activePage: 1

    };
  componentDidMount = async () => {

    this.setState({ loading: true })
    setTimeout(() => this.setState({ loading: false }), 1500);
    await this.props.getFAQ();
    this.setState({ items: this.props.FAQ })

  }



  render() {
    const props = this.props;
    const panes = [
      { menuItem: 'Personal Info', render: () => <Tab.Pane style={{ padding: "0px" }}>{PersonalInfo(this.props.profile)}</Tab.Pane> },
      { menuItem: 'Previous Expenses', render: () => <Tab.Pane>Previous Expenses</Tab.Pane> },
      { menuItem: 'Billing ', render: () => <Tab.Pane>Billing</Tab.Pane> },
      { menuItem: 'Change Password ', render: () => PasswordInfo() },
      { menuItem: 'Notification Settings ', render: () => NotificationSettings() },
    ]
    return <div style={{ padding: '20px' }}>
      <div className="outer-setting"  >
        <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} />
      </div>
    </div>
  }
}




const mapStateToProps = ({ dashboard }) => {
  const { FAQ, loading, FAQSubj, profile } = dashboard;
  return { FAQ, loading, FAQSubj, profile }
};



const mapActionToProps = () => {
  return { getFAQ }
};



export default connect(mapStateToProps, mapActionToProps())(Settings);