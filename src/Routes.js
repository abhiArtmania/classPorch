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
import {iWant} from "./modules/IWant/IWant";
import {Faq} from "./modules/Faq/Faq";

const Routes = () => {
    const token = localStorage.getItem('store');
    let authed = false;
    if (token && JSON.parse(token) && JSON.parse(token).auth.authToken) {
        authed = true;
    }
    console.log(authed)
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path={'/'} component={Home}/>
                <Route exact path={'/about-us'} component={AboutUs}/>
                <Route exact path={'/i-want'} component={iWant}/>
                <Route exact path={'/chats'} component={Chat}/>
                <Route exact path={'/messages'} component={Messaging}/>
                <Route exact path='/contact' component={ContactUs}/>
                <Route exact path='/privacy-policy' component={PrivacyPolicy}/>
                <Route exact path='/login' component={LoginRedux}/>
                <Route exact path='/search' component={SearchResults}/>
                <Route exact path='/faq' component={Faq}/>
                <Route exact path={'/terms-of-service'} component={TermsOfService}/>
                <Route exact path={'/terms-of-service/tutor'} component={TosTutor}/>
                <Route exact path={'/terms-of-service/student'} component={TosStudent}/>
                <Route exact path={'/sign-up/tutor'} component={SignUpTutor}/>
                <Route exact path={'/sign-up/student'} component={SignUpStudent}/>
                <Route exact path={'/sign-up'} component={SignUpMethods}/>
                <Route exact render={(props) => authed === true
                    ? <LinkAccount />
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>} path='/link-account'/>
                <Route exact path='/add-credits' render={(props) => authed === true
                    ? <AddCredits />
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}/>,

                <Route exact path='/request-money' render={(props) => authed === true
                    ? <RequestMoney />
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}/>,


                <Route exact path='/previous-expenses' render={(props) => authed === true
                    ? <PreviousExpenses />
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}/>,


                <Route exact path={'/dashboard/student'} render={(props) => authed === true
                    ? <DashboardStudent />
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}/>,


                <Route exact path={'/dashboard/tutor'} render={(props) => authed === true
                    ? <DashboardTutor />
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}/>,


                <Route exact path={'/profile/student'} render={(props) => authed === true
                    ? <ProfileStudent />
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}/>,


                <Route exact path={'/profile/tutor'} render={(props) => authed === true
                    ? <ProfileTutor />
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}/>
                <Redirect to={'/'}/>
            </Switch>
        </ConnectedRouter>
    );
};

export default Routes;