import React from 'react';
import { Component } from 'react';
import { Card, CardBody, CardSubtitle, CardTitle, CardText} from 'reactstrap';
import api from '../axios';

function RenderMenuItem({ dish }) {
    return (
        <Card>
            <CardTitle>{dish.description}</CardTitle>
            <CardBody>
                <CardSubtitle>{dish.price}</CardSubtitle>
                <CardText>{dish.dishType}</CardText>
            </CardBody>
        </Card>
    );
}

class Menu extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dishes: [[],[],[]],
        deals: []
      };
      console.log('Menu constructor');
    }
    
    componentDidMount() {
        api.get('/dishes')
        .then(res => {
          this.setState({ dishes: res.data });
        }).catch(err => {
            console.log(err.response);
        })
        api.get('/dishes/dishes/deals')
        .then(res => {
            console.log( 'Deals : ' + res.data);
            this.setState({deals: res.data});
        }).catch(err => {console.log(err.response);
        })
    }

    render() {
        const breakfast = this.state.dishes[0].map((dish) => {
            console.log("Dish",dish)
            return (
                <div className="col-12 col-md-3 m-1" key={dish.id}>
                    <RenderMenuItem dish={dish} />
                </div>
            );
        });
        const lunch = this.state.dishes[1].map((dish) => {
            return (
                <div className="col-12 col-md-3 m-1" key={dish.id}>
                    <RenderMenuItem dish={dish} />
                </div>
            );
        });
        const dinner = this.state.dishes[2].map((dish) => {
            return (
                <div className="col-12 col-md-3 m-1" key={dish.id}>
                    <RenderMenuItem dish={dish} />
                </div>
            );
        });
        const deals = this.state.deals.map((deal) => {
            return(
                <div>
                    <div className="col-12" key={deal.id}>
                        <RenderMenuItem dish={deal} />
                    </div>
                </div>
            );
        });
        if (this.state.dishes.err) {
            console.log(this.state.dishes.err);
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4>Couldn't load dishes</h4>
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
                    <h4> Breakfast </h4>
                    <div className="row">
                        {breakfast}
                    </div>
                    <h4> Lunch </h4>
                    <div className="row">
                        {lunch}
                    </div>
                    <h4> Dinner </h4>
                    <div className="row">
                        {dinner}
                    </div>
                    <h3> Our Deals </h3>
                    <div className="row"> 
                        {deals}
                    </div>
                </div>
            );
        }
    }
}
  
export default Menu;