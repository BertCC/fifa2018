import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

import TopBar from './TopBar.jsx';
import TeamList from './TeamList.jsx';
import NewTeam from './NewTeam.jsx';
import Users from './Users.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import MatchList from './MatchList.jsx';
import MatchNew from './MatchNew.jsx';
import MatchEdit from './MatchEdit.jsx';
import CountryList from './CountryList.jsx';

const Welcome = () => (
  <div className="container">
    <h3>Welcome to the 2018 FIFA Game made by the OpenTV-forevers!</h3>
    <p>You can create up to 3 teams selecting a team from each groups.</p>
  </div>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Meteor.userId() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <TopBar location={this.location}/>

          <PrivateRoute exact path='/' component={Welcome}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <PrivateRoute path='/team-list' component={TeamList}/>
          <PrivateRoute path='/new-team' component={NewTeam}/>
          <PrivateRoute path='/users' component={Users}/>
          <PrivateRoute path='/match-list' component={MatchList}/>
          <PrivateRoute path='/new-match' component={MatchNew}/>
          <PrivateRoute path='/edit-match/:id' component={MatchEdit}/>
          <PrivateRoute path='/country-list' component={CountryList}/>
        </div>
      </BrowserRouter>
    )
  }
}
