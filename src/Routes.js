import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {history} from './redux/store';
import {
  Home,
  LoginRedux,
  SignUpMethods,
  SignUpTutor,
  SignUpStudent,
  DashboardTutor,
  DashboardStudent,
  ProfileStudent,
  LinkAccount,
  RequestMoney,
  PreviousExpenses,
  ProfileTutor,
  AddCredits,
  SearchResults,
  Chat,
  Messaging,
  TermsOfService,
  TosStudent,
  TosTutor,
  PrivacyPolicy,
  ContactUs
} from './modules';
import AboutUs from "./modules/AboutUs/AboutUs";

const Routes = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path={'/'} component={Home}/>
        <Route exact path={'/about-us'} component={AboutUs}/>
        <Route exact path={'/chats'} component={Chat}/>
        <Route exact path={'/messages'} component={Messaging}/>
        <Route exact path='/contact' component={ContactUs}/>
        <Route exact path='/privacy-policy' component={PrivacyPolicy}/>
        <Route exact path='/login' component={LoginRedux}/>
        <Route exact path='/search' component={SearchResults}/>
        <Route exact path='/add-credits' component={AddCredits}/>
        <Route exact path='/link-account' component={LinkAccount}/>
        <Route exact path='/request-money' component={RequestMoney}/>
        <Route exact path='/previous-expenses' component={PreviousExpenses}/>
        <Route exact path={'/terms-of-service'} component={TermsOfService}/>
        <Route exact path={'/terms-of-service/tutor'} component={TosTutor}/>
        <Route exact path={'/terms-of-service/student'} component={TosStudent}/>
        <Route exact path={'/dashboard/student'} component={DashboardStudent}/>
        <Route exact path={'/dashboard/tutor'} component={DashboardTutor}/>
        <Route exact path={'/profile/student'} component={ProfileStudent}/>
        <Route exact path={'/profile/tutor'} component={ProfileTutor}/>
        <Route exact path={'/sign-up/tutor'} component={SignUpTutor}/>
        <Route exact path={'/sign-up/student'} component={SignUpStudent}/>
        <Route exact path={'/sign-up'} component={SignUpMethods}/>
        <Redirect to={'/'}/>
      </Switch>
    </ConnectedRouter>
  );
};

export default Routes;