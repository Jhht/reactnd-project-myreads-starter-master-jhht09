import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookEntry from './BookEntry'
import * as BooksAPI from './BooksAPI';

class SearchPage extends Component {

	static propTypes ={
		books: PropTypes.array.isRequired
	}
	

	state = {//CMP INTERNAL STATE
		query : '',
		displayBooks : []
	}

	updateQuery = (query) => {//UPDATE QUERY FROM SEARCH BAR
		this.setState({ query : query})
	    if (query.length > 0) {
	      BooksAPI.search(query, 20).then((searchedBooks) => {
	        const displayBooks = searchedBooks && !searchedBooks.hasOwnProperty("error") ? searchedBooks : [];
	        //busca los que ya esten en props y ponles el mismo estado



	        BooksAPI.getAll().then((books) => {
	          
	          	for(const appStateBook of this.props.books){
	          		for (let displayBook of displayBooks) {
		      			if(displayBook.id !== appStateBook.id){
	        				displayBook.shelf = 'noneSelect';
	        			}
	          		}
	            }

	          	for(const appStateBook of this.props.books){
	          		for (let displayBook of displayBooks) {
		      			if(displayBook.id === appStateBook.id){
	        				displayBook.shelf = appStateBook.shelf;
	        			}
	          		}
	            }
	          	this.setState({ displayBooks  });
	        });
	      });
    	}
	}

	updateBook = (book, shelf) => {
		
		if(this.props.onUpdateBookLibrary)
			this.props.onUpdateBookLibrary(book , shelf)
	}


	render(){
		const { query } = this.state
	
		return (
			<div className="search-books">
	            <div className="search-books-bar">
	              <Link
					to="/"
					className="close-search"
				>Close</Link>
	              <div className="search-books-input-wrapper">
	                {/*
	                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
	                  You can find these search terms here:
	                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

	                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
	                  you don't find a specific author or title. Every search is limited by search terms.
	                */}
	                <input type="text" placeholder="Search by title or author" value={query}
						onChange={(event) => this.updateQuery(event.target.value)}/>

	              </div>
	            </div>
	            <div className="search-books-results">
	              <ol className="books-grid" id="search-grid">
						{this.state.displayBooks.map((book) =>(
							<li key={book.id}>
								<BookEntry book={book} onUpdateBook={(book, shelf) => {
              						this.updateBook(book, shelf)}}/>
							</li>
					    ))}
					</ol>
	            </div>
          </div>
		)
	}
}

export default SearchPage