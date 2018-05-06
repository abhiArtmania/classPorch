
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
import { PreviousExpenses } from './PreviousExpenses';
import { Billing } from './Billing';

class Settings extends Component {
  state =
    {
      loading: false,
      items: [],
      activeIndex: 0,
      activePage: 1,
      profile: this.props.profile

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
      { menuItem: 'Personal Info', render: () => <Tab.Pane><PersonalInfo {...this.state.profile} resetProps={this.resetProps} onChange={this.updatePersonInfo} /></Tab.Pane> },
      { menuItem: 'Previous Expenses', render: () => <Tab.Pane><PreviousExpenses {...this.props.profile} /></Tab.Pane> },
      { menuItem: 'Billing ', render: () => <Tab.Pane><Billing /> </Tab.Pane> },
      { menuItem: 'Change Password ', render: () => <PasswordInfo  {...this.props.profile} /> },
      { menuItem: 'Notification Settings ', render: () => <NotificationSettings /> },
    ]
    return <div style={{ padding: '20px' }}>
      <div className="outer-setting"  >
        <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} />
      </div>
    </div>
  }



  updatePersonInfo = (event) => {
    const profile = JSON.parse(JSON.stringify(this.state.profile));
    profile[event.target.name] = event.target.value;
    this.setState({ profile })
  }

  resetProps = (data) => {
    this.setState({ profile: data });
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