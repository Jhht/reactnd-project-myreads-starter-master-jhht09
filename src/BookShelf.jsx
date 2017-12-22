import React, { Component } from 'react'
import BookEntry from './BookEntry'
import PropTypes from 'prop-types'

class BookShelf extends Component {


	static propTypes ={
		shelfBooks: PropTypes.array.isRequired,
		shelfName : PropTypes.string.isRequired
	}


	updateBook = (book ,shelf) => {

		if(this.props.onUpdateBookLibrary){
			this.props.onUpdateBookLibrary(book , shelf)
		}
	}


	render(){
		const shelfBooks = this.props.shelfBooks;
		const shelfName = this.props.shelfName;
		return (
			<div className="bookshelf">
	            <h2 className="bookshelf-title">{shelfName}</h2>
					<div className="bookshelf-books">
						<ol className="books-grid" id="books-grid">
							{shelfBooks.map((book) =>(
								<li key={book.id}>
									<BookEntry book={book} onUpdateBook={(book, shelf) => {
              							this.updateBook(book, shelf) }}/>
								</li>
					        ))}
					    </ol>
					</div>
			</div>
		)
	}
}

export default BookShelf