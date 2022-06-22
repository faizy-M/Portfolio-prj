import React from 'react';
import { Component } from 'react';
import { Card, CardBody, CardSubtitle, CardTitle, CardText} from 'reactstrap';
import api from '../axios';

class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        profile: [],
        reservations: [],
        orders: [],
        complains: []
      };
      console.log('Profile constructor');
    }
    renderOrder({ order }){
        return(
          <div>
            <div>{order.id}</div>
            <div>{order.total}</div>
          </div>
        );
    }
    renderReservation({ reservation }) {
        return (
            <Card>
                <CardTitle>{reservation.table}</CardTitle>
                <CardBody>
                    <CardSubtitle>{reservation.date}</CardSubtitle>
                    <CardText>{reservation.time}</CardText>
                </CardBody>
            </Card>
        );
    }
    //contextapi
    componentDidMount() {
        api.get('/customers/')
        .then(res => {
          this.setState({ profile: res.data });
        }).catch(err => {
            console.log(err.response);
        })
    }

    render() {
        const profile = () => {
            console.log("profile : " + this.state.profile);
            var profile = this.state.profile;
            return (
                <div className="col-12 col-md-6 m-1" key={profile.id}>
                    <div>{profile.name}</div>
                    <div>{profile.username}</div>
                    <div>{profile.stars}</div>
                </div>
            );
        };
        const orders = this.state.orders.map((order) => {
            return (
                <div className="col-12 col-md-3 m-1" key={dish.id}>
                    {this.renderOrder(order)}
                </div>
            );
        });
        const reservation = this.state.reservations.map((reservation) => {
            return (
                <div className="col-12 col-md-3 m-1" key={dish.id}>
                    {this.renderReservation(reservation)}
                </div>
            );
        });
        const complains = this.state.complains.map((complain) => {
            return (
                <div>
                    <div>{complain.id}</div>
                    <div>{complain.S_id}</div>
                    <div>{complain.description}</div>
                </div>
            );
        });
        if (this.state.profile.err) {
            console.log(this.state.dishes.err);
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4>Couldn't load Profile page!</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        <h3>Menu Items</h3>
                    </div>
                    <h4> Your Profile </h4>
                    <div className="row">
                        {profile}
                    </div>
                    <h4> Your Orders </h4>
                    <div className="row">
                        {orders}
                    </div>
                    <h4> Your Reservations </h4>
                    <div className="row">
                        {reservation}
                    </div>
                    <h3> Your Complains </h3>
                    <div className="row"> 
                        {complains}
                    </div>
                </div>
            );
        }
    }
}
  
export default Profile;