import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import RedirectPage from '../components/RedirectPage';
import Dashboard from '../components/search/Dashboard';
import NotFoundPage from '../components/NotFoundPage';
import '../App.css';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import Player from '../components/player/player';
import MainPage from '../components/main/MainPage';
import MyPlayList from '../components/create_playlist/MyPlayList';

class AppRouter extends React.Component {
  state = {
    expiryTime: '0'
  };

  componentDidMount() {
    let expiryTime;
    try {
      expiryTime = JSON.parse(localStorage.getItem('expiry_time'));
    } catch (error) {
      expiryTime = '0';
    }
    this.setState({ expiryTime });
  }

  setExpiryTime = (expiryTime) => {
    this.setState({ expiryTime });
  };

  isValidSession = () => {
    const currentTime = new Date().getTime();
    const expiryTime = this.state.expiryTime;
    const isSessionValid = currentTime < expiryTime;

    return isSessionValid;
  };

  render() {
    return (
      <BrowserRouter>
      {/* <div className="wrap"> */}
      <Header />
      <Sidebar />
        <div className="main">
          <Switch>
            <Route
              path="/"
              exact={true}
              render={(props) => (
                <Home isValidSession={this.isValidSession} {...props} />
              )}
            />
            <Route
              path="/redirect"
              render={(props) => (
                <RedirectPage
                isValidSession={this.isValidSession}
                setExpiryTime={this.setExpiryTime}
                {...props}
                />
                )}
                />
            <Route
              path="/dashboard"
              render={(props) => (
                <Dashboard isValidSession={this.isValidSession} {...props} />)}/>
            <Route path="/dashboard" component={Dashboard} />

            <Route
              path="/myPlayList"
              render={(props) => (
                <MyPlayList isValidSession={this.isValidSession} {...props} />)}/>

            <Route path="/myPlayList" component={MyPlayList} />

            <Route path="/main" component={MainPage} />

            
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
