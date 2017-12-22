import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookLibrary from './BookLibrary'
import { Route } from 'react-router-dom'
import SearchPage from './SearchPage'
import DetailPage from './DetailPage'


class BooksApp extends Component {
  state = {
      books: []
    }

    // /detail code - under development
    findBookInList = id => {
      return this.state.books.findIndex(book => book.id === id);
    };


    // /detail code - under development
    getBook = async id => {
      // Checks if the book is already loaded and returns it if it is.
      const bookIdx = this.findBookInList(id);
      if (bookIdx !== -1) {
        return Promise.resolve(this.state.books[bookIdx]);
      }
      
      try {
        const book = await BooksAPI.get(id);
        book.shelf = "none";
        return book;
      } catch (e) {
        console.error(`There was an API error: ${e}`);
      }
    };

    //trigger after cmp add to DOM
    componentDidMount(){
      BooksAPI.getAll().then((books) => {
        this.setState({books})
      });
    }

    updateBook = (book, shelf) => {
      console.log(book + ' -- ' + shelf)

      book.shelf = shelf;
      BooksAPI.update(book, shelf).then(response => {
        BooksAPI.getAll().then(books => {
          book.shelf = books.find(b => b.id === book.id).shelf
          this.setState({ books : books})
        });
    })
  }

    render(){///details is under development
      return (
        <div className="app">
          <Route exact path="/" render={() => (
            <BookLibrary books={this.state.books} />
          )}/>
          <Route path="/search" render={() => (
            <SearchPage books={this.state.books} onUpdateBookLibrary={(book, shelf) => { this.updateBook(book, shelf) }}/>
          )}/> 
           <Route path="/details/:id" 
                  render={({ match }) =>
                    <DetailPage 
                      findBookInList={this.findBookInList}
                      getBook={this.getBook}
                      bookId={match.params.id} />
                  }/>
        </div>
      )
    }
}

export default BooksApp
