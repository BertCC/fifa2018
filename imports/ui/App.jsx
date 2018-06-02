import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

import TopBar from './TopBar.jsx';
import SelectionList from './SelectionList.jsx';
import SelectionNew from './SelectionNew.jsx';
import Users from './Users.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import MatchList from './MatchList.jsx';
import MatchNew from './MatchNew.jsx';
import MatchEdit from './MatchEdit.jsx';
import TeamList from './TeamList.jsx';
import GameStateEdit from './GameStateEdit.jsx';

const Welcome = () => (
  <div className="container">
    <h3>Welcome to the 2018 FIFA Game for Consensus !</h3>
    <br/>
    <p>WARNING: This is work in progress and should be used only for testing!</p>
    <br/>
    <h4>Rules</h4>
    <p>
    -	Pick 1 team from each group by clicking on <Link to="/new-selection">New Selection</Link> . Groups were created following the FIFA ranking before the WC2018<br/>
    -	Each player can make 1 selection, please name it with your name like JohnDoeSet (no email involved here).<br/>
    -	How you get points:<br/>
    &nbsp;&nbsp;o	During the World Cup, every nations  will play 3 games during the group stage. Then 16 nations will go to the elimination phase<br/>
    &nbsp;&nbsp;o	The teams you selected will keep gaining points for you as long as they keep playing (not eliminated). Wins, draws and goals get you points.<br/>
    &nbsp;&nbsp;o	Each win of a team in your selection makes you gain <b>3</b> points, each draw <b>1</b> point, each goal scored gains additional Y points (Y = <b>0.3</b> during group stage, <b>0.5</b> during elimination phase)<br/>
    &nbsp;&nbsp;o	Penalty kicks are not accounted. Only the winner (3 points) and goals during regulation time from each side are counted for points<br/>
    - After the competition kicks off, it is not possible to create/delete/replace a selection. Your selection can be done <b>until June 13th</b>, just before the opening game of FIFA 2018 <br/>
    -	The player with most total points win. In case of a tie, if this is the same team selection, the first player who enters win, if this is different teams selections, all those folks win.<br/>
    </p>
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
          <TopBar/>

          <PrivateRoute exact path='/' component={Welcome}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <PrivateRoute path='/selection-list' exact component={SelectionList}/>
          <PrivateRoute path='/selection-list/:id' component={SelectionList}/>
          <PrivateRoute path='/new-selection' component={SelectionNew}/>
          <PrivateRoute path='/users' component={Users}/>
          <PrivateRoute path='/match-list' component={MatchList}/>
          <PrivateRoute path='/new-match' component={MatchNew}/>
          <PrivateRoute path='/edit-match/:id' component={MatchEdit}/>
          <PrivateRoute path='/team-list' component={TeamList}/>
          <PrivateRoute path='/game-state' component={GameStateEdit}/>
        </div>
      </BrowserRouter>
    )
  }
}
