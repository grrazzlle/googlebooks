import React, {useState} from 'react';
import axios from 'axios';
import Container from '../../components/Container/index';
import Row from '../../components/Row/index';
import Column from '../../components/Column/index';
import Card from '../../components/Card/index';
import API from '../../utils/API';
import './search.css';

function Search() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState([]);

  const bookSearchFunc = (event) => {
    event.preventDefault();
    if (!query?.trim()) return;
    axios
        .get(
            `https://www.googleapis.com/books/v1/volumes?q=${query}`,
        )
        .then((res) => {
          setResponse(res.data.items);
          let results = res.data.items;
          // map through the array
          results = results.map((result) => {
          // store each book information in a new object
            result = {
              key: result.id,
              id: result.id,
              title: result.volumeInfo.title,
              author: result.volumeInfo.authors,
              description: result.volumeInfo.description,
              image: result.volumeInfo.imageLinks?.thumbnail,
              link: result.volumeInfo.infoLink,
            };
            return result;
          });
          // reset the sate of the empty books array to the new arrays of objects with properties geting back from the response
          setBooks(results);
        })
        .catch((err) => {
          console.log('ERROR ' + err);
        });
  };

  const handleSavedButton = (event) => {
    // console.log(event)
    event.preventDefault();
    let savedBooks = books.filter((book) => book.id === event.target.id);
    savedBooks = savedBooks[0];
    API.saveBook(savedBooks);
  };

  return (
    <div>
      <div className="row">
        <h1 className="searchTitle">Search for a Book</h1>
      </div>
      <form className="search-form form-inline">
        <input
          className="bookSearch"
          placeholder="Book"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="btn bookSearchBtn "
          onClick={bookSearchFunc}>
          Search
        </button>
      </form>
      <Container style={{marginTop: 30}}>
        <Row>
          {response.map((items) => {
            const image = items.volumeInfo?.imageLinks?.thumbnail ?? 'https://via.placeholder.com/128x192.png?text=Unavailable';

            return (
              <Column key={items.id}>
                <Card
                  title={items.volumeInfo.title}
                  authors={items.volumeInfo.authors}
                  description={items.volumeInfo.description}
                  image={image}
                  link={items.volumeInfo.canonicalVolumeLink}
                  id={items.id}
                  handleSavedButton={handleSavedButton}
                />
              </Column>);
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Search;
