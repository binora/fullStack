import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login/login";
import Projects from "./components/Projects/projects";
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo';
import "./App.css";



// apollo client setup
const client = new ApolloClient({ //apollo client instance
  uri: 'http://localhost:5000/graphql'
})

class App extends Component{
  render() {
    return (
      // <Router>
      //   <div>
      //     <ul>
      //       <li>
      //         <Link to="/">Login</Link>
      //       </li>
      //       <li>
      //         <Link to="/project">Projects</Link>
      //       </li>
      //     </ul>
      //     <hr />
      //     <Switch>
      //       <Route exact path="/"><Login /></Route>
      //       <Route path="/project"><Projects /></Route>
      //     </Switch>
      //   </div>
      // </Router>
      <ApolloProvider client={client}>
        <div className="main">
          <Login />
          <Projects />       
        </div>
      </ApolloProvider>
    )
  }

}
export default App;
