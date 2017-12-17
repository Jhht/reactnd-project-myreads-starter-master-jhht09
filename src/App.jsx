import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookLibrary from './BookLibrary'
import { Route } from 'react-router-dom'
import SearchPage from './SearchPage'


class BooksApp extends Component {
  state = {
      books: [],
      showSearchPage : false
    }

    //trigger after cmp add to DOM
    componentDidMount(){
      BooksAPI.getAll().then((books) => {
        this.setState({books})
      })
    }

    render(){
      return (
        <div className="app">
          <Route exact path="/" render={() => (
            <BookLibrary books={this.state.books} />
          )}/>
          <Route path="/search" render={() => (
            <SearchPage books={this.state.books} />
          )}/>
        </div>
      )
    }
}

export default BooksApp
