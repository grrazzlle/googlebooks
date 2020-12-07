import React, { Component } from "react";
import API from "../../utils/API";
import "./saved.css"
import {Row, Col} from "../../components/Grid"


class Saved extends Component {
    state = {
        savedBooks: []
    };

    //when this component mounts, grab all books that were save to the database 
    componentDidMount() {
        API.getBooks()
            .then(res => this.setState({ savedBooks: res.data }))
            .catch(err => console.log(err))
    }

    //function to remove book by id
    handleDeleteButton = id => {
        API.deleteBook(id)
            .then(res => this.componentDidMount())
            .catch(err => console.log(err))
    }

    render() {
        return (this.state.savedBooks.length === 0) ? (
          <div className="card">
              <div className="card-body player">
                  <div className="article">
                      <h3>Books that You Saved</h3>
                  </div>
              </div>
          </div>
      ):(
          <div className="card">
              <div className="card-body player">
                  <div className="article">
                      <h3>Books that You Saved</h3>
                      {this.state.savedBooks.map(savedbook => {
                          return (
                              <div className="saved-list list-group-item" key={savedbook._id}>
                                  <Row className="SearchResult" id={savedbook.title + "Card"} >
                                      {/* col-3 show image of the book */}
                                      <Col size="2" className="bookImage">
                                          <img src={savedbook.image} alt={savedbook.title} />
                                      </Col>
                                      <Col size="1" className="emptyCol"/>
                                      {/* col-9 show information of the book */}
                                      <Col size="9" className="bookInfo">
                                          <Row>
                                              <h2 className="bookTitle">{savedbook.title}</h2>
                                          </Row>
                                          <Row>
                                              <h3 className="bookAuthor">{savedbook.authors}</h3>
                                          </Row>
                                          <Row>
                                              <p className="bookDescription">{savedbook.description}</p>
                                          </Row>
                                      </Col>
                                  </Row>
                                  <br></br>
                                  <Row className="buttonDiv ">
                                      <button className="deleteBook btn btn-danger" id={savedbook._id} onClick={() => this.handleDeleteButton(savedbook._id)}>
                                          Delete Book
                                      </button>
                                      <a href={savedbook.link} target="_blank" rel="noopener noreferrer">
                                          <button className="viewBook btn btn-success">
                                              View Book
                                          </button>
                                      </a>
                                  </Row>
                              </div>
                          );
                      })}
                  </div>
              </div>
          </div>
      )
    }
}



export default Saved