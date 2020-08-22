import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import "./app.css";

// Components
import Index from "./components/Index/Index";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    );
  }
}

export default App;
