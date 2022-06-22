import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import LoginPage from './loginComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

//import DishDetail from './DishdetailComponent';
//import { DISHES } from '../shared/dishes';

class Main extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    const user = {id: "2", type: "customer"};
    return (
      <div>
       <Header />
            <Switch>
                <Route exact path="/">
                  { user.id === '' ? <Redirect to="/login" /> : <Home />}
                </Route>
                <Route exact path='/menu'/>
                 { user.id === '' ? <Redirect to="/login" /> : <Menu /> }
                <Route/>
                <Route to="/login" component={LoginPage} />
            </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;