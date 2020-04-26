import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/login";
import Projects from "./components/Projects/projects";
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo';
import "./App.css";



// apollo client setup
const client = new ApolloClient({ //apollo client instance
  uri: 'http://localhost:5000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
            <Switch>
              <Route exact path="/"><Login client={client}/></Route>
              <Route path="/projects"><Projects client={client}/></Route>
            </Switch>
        </Router>
      </ApolloProvider>
    )
  }

}
export default App;
