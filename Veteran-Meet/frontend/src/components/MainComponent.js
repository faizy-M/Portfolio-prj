import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import Profile from './Profile';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
      super(props);
    }
    render() {
        const HomePage = () => {
            return(
                <Profile 
                veteran={{hobbies : []}}
                />
            );
          }
        return (
            <div>
              <Header />
              Header rendered
              <div>
                <Switch location={this.props.location}>
                  <Route path='/home' component={HomePage} />
                  <Redirect to="/home" />
                </Switch>
              </div>
              <Footer />
            </div>
        );        
    }
}
export default Main;