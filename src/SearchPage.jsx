import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookEntry from './BookEntry'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchPage extends Component {

	static propTypes ={
		books: PropTypes.array.isRequired
	}
	

	state = {//CMP INTERNAL STATE
		query : ''
	}

	updateQuery = (query) => {//UPDATE QUERY FROM SEARCH BAR
		this.setState({ query : query })
	}

	clearQuery = () => {//CLEAR QUERY FROM SEARCH BAR
		this.setState({query : ''})
	}


	render(){
		const { query } = this.state
		const books = this.props.books

		let showingBooks//VAR, ES6

		if (query){//SEARCH BAR LOGIC

			const match = new RegExp(escapeRegExp(query), 'i')

			showingBooks = this.props.books.filter((book) => match.test(book.title)||match.test(book.authors))

		
			console.log(showingBooks)
		}else{
			showingBooks = books
		}

		showingBooks.sort(sortBy('title'))//SORT

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
	              <ol className="books-grid">
						{showingBooks.map((book) =>(
							<li key={book.id}>
								<BookEntry book = {book} onUpdateBook={(book, shelf) => {
              						this.updateBook(book, shelf) }}/>
							</li>
					    ))}
					</ol>
	            </div>
          </div>
		)
	}
}

export default SearchPage