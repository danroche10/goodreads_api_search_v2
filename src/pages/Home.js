import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../App.css";
import BooksResult from "../components/BooksResult";
//import { Grid } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { AuthyContext } from "../contexts/AuthyContext";
import { SearchContext } from "../contexts/SearchContext";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";

var parseString = require("xml2js").parseString;

const Home = () => {
  const [search, setSearch] = useContext(SearchContext);

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  let author = "";
  try {
    author = search.toProperCase();
  } catch {
    author = "Jane Austen";
  }

  useEffect(() => {
    const abortController = new AbortController();
    let apiKey = "ALVzK8NwSNC6KG0i7LIMgg";

    const fetchData = async () => {
      const result = await axios(
        `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=${apiKey}&q=${author}`
      );

      let books = "";
      let array = [];
      let filteredData = [];
      const xml = result.data;
      parseString(xml, function (err, result) {
        books = result.GoodreadsResponse.search[0].results[0].work;
        if (books) {
          for (let i = 0; i < books.length; i++) {
            array.push({
              author2: books[i].best_book[0].author[0].name[0],
              authorId: books[i].best_book[0].author[0].id[0]._,
            });
          }
        }
      });

      filteredData = array.filter((x) => x.author2 === author);

      try {
        setAuthy(filteredData[0].authorId);
      } catch {
        setError("error");
      }
    };
    fetchData();
  }, [search]);

  const [authy, setAuthy] = useContext(AuthyContext);

  const [error, setError] = useState("");

  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setError("");

    setSearch(data.author.toString());
  };
  /*
  React.useEffect(() => {
    const data2 = localStorage.getItem("chosen-author");
    if (data2) {
      setAut(JSON.parse(data2));
    }
  }, []);
*/

  /*
  React.useEffect(() => {
    localStorage.setItem("chosen-author", JSON.stringify(authy));
  });
*/

  return (
    <div className="home">
      <br></br>

      <div className="pageTitle">Goodreads API Search</div>

      <div className="title">
        {" "}
        <LocalLibraryIcon className="icons" />
        Search for your favourite author!
      </div>
      <br></br>
      <form onSubmit={handleSubmit(onSubmit)} className="searchParent">
        <input
          className="searchBar"
          type="text"
          placeholder="e.g. Plato"
          name="author"
          ref={register({ required: true })}
        />
        <br></br>
        <input type="submit" className="submit" />
      </form>

      {error ? (
        <div className="sorry">
          Sorry, we couldn't find what you were looking for. Search again!
        </div>
      ) : (
        <BooksResult authy={authy} key={authy} />
      )}
      <br></br>
    </div>
  );
};
export default Home;
