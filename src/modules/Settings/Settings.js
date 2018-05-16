import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react'

import { getFAQ, updatePersonalInfo } from '../../redux/actions';
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
  submitPersonalInfo = () => {
    this.props.updatePersonalInfo({ "user": this.state.profile });
  }
  updatePersonInfo = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      profile: {
        ...prevState.profile,
        [name]: value
      }
    }));
  }
  resetProps = (data) => {
    this.setState({ profile: data });
  }
  render() {
    const panes = [
      { menuItem: 'Personal Info', render: () => <Tab.Pane><PersonalInfo {...this.state.profile} resetProps={this.resetProps} onChange={this.updatePersonInfo} onSubmitForm={this.submitPersonalInfo} /></Tab.Pane> },
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
}

const mapStateToProps = ({ dashboard, auth }) => {
  const { FAQ, loading, FAQSubj, profile } = dashboard;
  const { personalInfoUpdating, personalInfoUpdated } = auth;
  return { FAQ, loading, FAQSubj, profile, personalInfoUpdating, personalInfoUpdated }
};

const mapActionToProps = () => {
  return { getFAQ, updatePersonalInfo }
};

export default connect(mapStateToProps, mapActionToProps())(Settings);