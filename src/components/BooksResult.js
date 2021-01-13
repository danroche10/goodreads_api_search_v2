import React, { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import "../App.css";
import BookCard from "./BookCard";
import { Image } from "semantic-ui-react";
import { AuthyContext } from "../contexts/AuthyContext";
import { SearchContext } from "../contexts/SearchContext";

var parseString = require("xml2js").parseString;

const BooksResult = () => {
  const [search, setSearch] = useContext(SearchContext);

  const [authy, setAuthy] = useContext(AuthyContext);

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    let apiKey = "ALVzK8NwSNC6KG0i7LIMgg";

    let authorId = "";

    if (authy === undefined) {
      authorId = 1265;
    } else {
      authorId = authy;
    }

    const fetchData2 = async () => {
      let result = "";
      if (isMounted) {
        result = await axios(
          `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/author/show/${authorId}?format=xml&key=${apiKey}`
        );
      }
      let data2 = [];
      let books2 = "";
      let books3 = "";
      let test = "";
      let authorImage = "";
      let authorName = "";
      const xml = result.data;
      parseString(xml, function (err, result) {
        books2 = result.GoodreadsResponse.author[0].about[0];
        books3 = result.GoodreadsResponse.author[0].books[0].book;
        authorName = result.GoodreadsResponse.author[0].name[0];
        authorImage = result.GoodreadsResponse.author[0].image_url[0];
        test = result.GoodreadsResponse.author[0].books[0];

        for (let i = 0; i < books3.length; i++) {
          data2.push({
            about_book: books3[i].description[0]
              .replace(/<[^>]*>?/gm, "")
              .replace(/(?:https?|ftp):\/\/[\n\S]+/g, ""),
            averageRating: books3[i].average_rating[0],
            bookImage: books3[i].image_url[0],
            link: books3[i].link[0],
            num_pages: books3[i].num_pages[0],
            publication_year: books3[i].publication_year[0],
            title: books3[i].title[0],
            uri: books3[i].uri[0],
            authors: books3[i].authors[0],
            ratings_count: books3[i].ratings_count[0],
          });
        }
      });

      setData3(data2);
      setAuthorImage(authorImage);
      setAuthorName(authorName);
      setData2(
        books2
          .replace(/<[^>]*>?/gm, "")
          .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")
          .replaceAll(/-/gi, "")
      );
    };

    fetchData2();
    return () => {
      isMounted = false;
    };
  }, [search]);

  const [authorImage, setAuthorImage] = useState("");
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [authorName, setAuthorName] = useState([]);

  return (
    <div>
      <h1 className="title">{authorName}</h1>

      <div className="container-2">
        <Image size="mini" src={authorImage} className="authorImage" />
        <div className="description" style={{ fontSize: 12 }}>
          {data2 ? data2 : "Sorry, there is no description for this author :("}
        </div>

        <br></br>
        <div className="container-1">
          {data3
            .sort(
              (a, b) =>
                parseFloat(b.averageRating) - parseFloat(a.averageRating)
            )
            .map((x) => (
              <BookCard
                title={x.title}
                bookImage={x.bookImage}
                about_book={x.about_book}
                averageRating={x.averageRating}
                publication_year={x.publication_year}
              />
            ))}
        </div>
      </div>
      <br></br>
    </div>
  );
};
export default BooksResult;
