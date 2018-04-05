import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { ConnectedRouter } from "react-router-redux"
import { history } from "./redux/store"
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
  Notification,
  Messaging,
  TermsOfService,
  TosStudent,
  TosTutor,
  PrivacyPolicy,
  ContactUs3,
  Faq,
  Support,
  Contact,
  Tutor,
  Settings
} from "./modules"
import CompletedSession from './modules/completed-sessions/CompletedSession'
import ScheduledSession from './modules/scheduled-sessions/ScheduledSessions'
import SubmitTicket from './modules/submit-ticket/SubmitTicket';
import AboutUs from "./modules/AboutUs/AboutUs"
import { iWant } from "./modules/IWant/IWant"


const Routes = () => {
  const token = localStorage.getItem("store")
  const authed = token && JSON.parse(token) && JSON.parse(token).auth.authToken
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/about-us"} component={AboutUs} />
        <Route exact path={"/contact-us"} component={Contact} />
        <Route exact path={"/i-want"} component={iWant} />
        <Route exact path={"/chats"} component={Chat} />
        <Route exact path={"/messages"} component={Messaging} />
        <Route exact path={"/notification"} component={Notification} />
        <Route exact path="/contact" component={ContactUs3} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/login" component={LoginRedux} />
        <Route exact path="/search" component={SearchResults} />
        <Route exact path="/faq/:cat" component={Faq} />
        {/* <Route exact path="/faq/Tutor" component={Faq} /> */}
        {/* <Route exact path="/faq/Technical" component={Faq} /> */}
        <Route exact path="/support" component={Support} />
        <Route exact path="/submit-ticket" component={SubmitTicket} />
        <Route exact path={"/terms-of-service"} component={TermsOfService} />
        <Route exact path={"/terms-of-service/tutor"} component={TosTutor} />
        <Route exact path={"/terms-of-service/student"} component={TosStudent} />
        <Route exact path={"/sign-up/tutor"} component={SignUpTutor} />
        <Route exact path={"/sign-up/student"} component={SignUpStudent} />
        <Route exact path={"/sign-up"} component={SignUpMethods}/>
        {/* <Route exact path={"/completed-sessions"} component={CompletedSession} /> */}
        <Route
          exact
          render={props =>
            authed || history.isAuth ? (
              <LinkAccount />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
              )
          }
          path="/link-account"
        />
        <Route
          exact
          path="/add-credits"
          render={props =>
            authed || history.isAuth ? (
              <AddCredits />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
              )
          }
        />,
        <Route
          exact
          path="/request-money"
          render={props =>
            authed || history.isAuth ? (
              <RequestMoney />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
              )
          }
        />,
        <Route
          exact
          path="/add-credits"
          render={props =>
            authed || history.isAuth ? (
              <AddCredits />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
              )
          }
        />,
        <Route
          exact
          path="/settings"
          render={props =>
            authed || history.isAuth ? (
              <Settings />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
              )
          }
        />,
        <Route
          exact
          path="/previous-expenses"
          render={props =>
            authed || history.isAuth ? (
              <PreviousExpenses />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
              )
          }
        />,
        <Route
          exact
          path={"/dashboard/student"}
          render={props =>
            authed || history.isAuth ? (
              <DashboardStudent />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
              )
          }
        />,
        <Route
          exact
          path={"/completed-sessions"}
          render={props =>
            authed || history.isAuth ? (
              <CompletedSession />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
              )
          }
        />,
        <Route
          exact
          path={"/scheduled-sessions"}
          render={props =>
            authed || history.isAuth ? (
              <ScheduledSession />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
              )
          }
        />,
        <Route
          exact
          path={"/dashboard/tutor"}
          render={props =>
            authed || history.isAuth ? (
              <DashboardTutor />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
              )
          }
        />,
        <Route
          exact
          path={"/profile/student"}
          render={props =>
            authed || history.isAuth ? (
              <ProfileStudent />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
              )
          }
        />,
        <Route
          exact
          path={"/profile/tutor"}
          render={props =>
            authed || history.isAuth ? (
              <ProfileTutor />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
              )
          }
        />,
        <Route
          exact
          path={"/tutors/:tutorId"}
          render={props =>
            authed || history.isAuth ? (
              <Tutor route={props} />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
              )
          }
        />
        <Redirect to={"/"} />
      </Switch>
    </ConnectedRouter>
  )
}

export default Routes
