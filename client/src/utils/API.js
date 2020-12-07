import axios from 'axios';

export default {
  // Gets all books
  getBooks: function() {
    return axios.get('/api/books');
    // const response = await fetch("/api/books")
    // return await response.json();
  },

  // Saves a book to the database
  saveBook: function(savedBooks) {
    return axios.post('/api/books', savedBooks);
  },

  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete('/api/books/' + id);
  },

};
