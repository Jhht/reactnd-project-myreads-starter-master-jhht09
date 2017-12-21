import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import SearchButton from './SearchButton'
import * as BooksAPI from './BooksAPI';


//CMP AS BOOK TABLE _ CONTAINS CMP BOOKROW

class BookLibrary extends Component {

	static propTypes ={
		books: PropTypes.array.isRequired
	}

	updateBook = (book, shelf) => {
		console.log(book + ' -- ' + shelf)

		let temp = this.props.books;
	    book.shelf = shelf
	    BooksAPI.update(book, shelf).then(response => {
	    	this.setState({
	    		books: temp
	     	})
		})
	}


	render(){

		const books = this.props.books
		console.log(books)


		return (
			<div className="list-books">
		        <div className="list-books-title">
		          <h1>MyReads</h1>
		        </div>
				<div className="list-books-content">
					<BookShelf onUpdateBookLibrary={(book, shelf)=>{this.updateBook(book, shelf)}} shelfBooks={books.filter((book) => book.shelf ==='currentlyReading')}shelfName='Currently Reading' />
					<BookShelf onUpdateBookLibrary={(book, shelf) => { this.updateBook(book, shelf) }} shelfBooks={books.filter((book) => book.shelf === 'wantToRead')}shelfName='Want to read' />
					<BookShelf onUpdateBookLibrary={(book, shelf) => { this.updateBook(book, shelf) }} shelfBooks={books.filter((book) => book.shelf === 'read')} shelfName='Read' />
					<SearchButton />
				</div>
			</div>
		)
	}
}

export default BookLibrary