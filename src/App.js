import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
//import axios from "axios";
import "./App.css";
import Home from "./pages/Home";
import ChosenBook from "./pages/ChosenBook";
import { AuthyContext } from "./contexts/AuthyContext";
import { BookContext } from "./contexts/BookContext";
import { SearchContext } from "./contexts/SearchContext";

const App = () => {
  const [authy, setAuthy] = useState();
  const [book, setBook] = useState();
  const [search, setSearch] = useState();

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      <AuthyContext.Provider value={[authy, setAuthy]}>
        <BookContext.Provider value={[book, setBook]}>
          <Router>
            <Route exact path="/" component={Home} />
            <Route exact path="/:book" component={ChosenBook} />
          </Router>
        </BookContext.Provider>
      </AuthyContext.Provider>
    </SearchContext.Provider>
  );
};
export default App;
