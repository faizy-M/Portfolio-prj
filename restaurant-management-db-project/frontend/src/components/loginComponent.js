import React from "react";
import { Component } from "react";
import api from "../axios";

function login(email, password) {
    api.get("/login", { email, password })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }

class LoginPage extends Component {
  constructor(props) {
      super(props);
        this.state = {
            username: "",
            password: ""
        }
  }
   handleSubmit = () => {
    login(this.state.username, this.state.password)
      .then((res) => {
        console.log('Succesfully logged in!');
      })
      .catch((e) => {
        // history.push("/login");
        let err =
          e.response.status === 401
            ? "Invalid email or password"
            : JSON.stringify(e.response.data);
      });
  }

  render() {
    return(
    <div>
        <form>
            <p className="mb-4">Please login to your account</p>
            <div className="mb-4">
            <input
                type="text"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Username"
                onChange={(e) => this.setState(username => e.target.value)}
                value={this.state.username}
            />
            </div>
            <div class="mb-4">
            <input
                type="password"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput1"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => this.setState(password => e.target.value)}
            />
            </div>
            <div class="text-center pt-1 mb-12 pb-1">
            <button
                class="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                type="button"
                onClick={this.handleSubmit}>
                Log in
            </button>
            </div>
            {/* <div class="flex items-center justify-between pb-6">
            <p class="mb-0 mr-2">Don't have an account?</p>
            <button
                type="button"
                class="inline-block px-6 py-2 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick={() => history.push("/register")}
                style={{
                background:
                    "linear-gradient(256deg, rgba(58,180,152,1) 0%, rgba(29,176,253,1) 50%, rgba(127,69,252,1) 100%)",
                }}
            >
                Register
            </button>
            </div> */}
        </form>
    </div>
    );
  }
    
};
export default LoginPage;
