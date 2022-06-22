import React from 'react';
import { Jumbotron } from 'react';

function Home(props) {
    console.log(props.user);
    return(
      <div>
        {/* <Jumbotron>
            <div className="container">
                <div className="row row-header">
                    <div className="col-12 col-sm-6">
                        <h1>Project Website</h1>
                        <p>Hope you like it!</p>
                    </div>
                </div>
            </div>
        </Jumbotron> */}
        <div>
          <h4>Home</h4>
        </div>
      </div>
    );
}

export default Home;   