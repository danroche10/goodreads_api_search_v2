import React, { useContext } from "react";
import { Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { BookContext } from "../contexts/BookContext";

function BookCard({ publication_year, averageRating, bookImage, title }) {
  const [book, setBook] = useContext(BookContext);

  return (
    <div className="bookCard">
      <Image
        floated="right"
        size="mini"
        className="bookImage"
        src={bookImage}
      />
      <div className="boldy">Title</div>
      <div className="boldy2">{title}</div>
      <div className="boldy">Publication year</div>
      <div className="boldy2">{publication_year}</div>
      <div className="boldy">Average Rating</div>
      <div className="boldy2">{averageRating}</div>

      <Button className="button" as={Link} to={`/${title}`}>
        <Button
          color="blue"
          basic
          className="choseBookButton"
          key={title.id}
          value={title}
          onClick={(e) => setBook(e.currentTarget.value)}
        >
          View
        </Button>
      </Button>
    </div>
  );
}
export default BookCard;
