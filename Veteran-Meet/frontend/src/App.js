import "./App.css";
import Login from "./components/Login";
import Main from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";
import RegisterPage from "./Pages/Auth/Register";
import LoginPage from "./Pages/Auth/Login";
import ProfilePage from "./Pages/Profile";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { userState } from "./states/userState";
import { Redirect } from "react-router-dom";
import HomePage from "./Pages/Home";
import ChatPage from "./Pages/Chat/index";
import OrganizationPage from "./Pages/Organization";
import VisitProfile from "./Pages/Profile/VisitProfile";
import FollowerPage from "./Pages/Followers";
import EventsPage from "./Pages/Events";
function App() {
  const [user, setUser] = userState.use();
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {user.token === false ? <Redirect to="/register" /> : <HomePage />}
        </Route>
        <Route exact path="/profile">
          {user.token === false ? <Redirect to="/register" /> : <ProfilePage />}
        </Route>
        <Route exact path="/profile/:id">
          {user.token === true ? <Redirect to="/register" /> : <VisitProfile />}
        </Route>
        <Route exact path="/chat">
          {user.token === false ? <Redirect to="/register" /> : <ChatPage />}
        </Route>
        <Route exact path="/followers">
          {user.token === false ? <Redirect to="/register" /> : <FollowerPage />}
        </Route>

        <Route exact path="/events">
          {user.token === false ? <Redirect to="/register" /> : <EventsPage />}
        </Route>
        <Route exact path="/organizations">
          {user.token === false ? (
            <Redirect to="/register" />
          ) : (
            <OrganizationPage />
          )}
        </Route>
        <Route to="/login" component={LoginPage} />
        <Route to="/register" component={RegisterPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
