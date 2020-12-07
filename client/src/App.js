import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Saved from "./pages/Saved/saved";
import Search from "./pages/Search/search";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/index";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route exact path="/" component={Search} />
        <Route exact path="/saved" component={Saved} />
        <Route exact path="/search" component={Search} />
      </div>
      <Footer />
    </Router>
  );
}

export default App;