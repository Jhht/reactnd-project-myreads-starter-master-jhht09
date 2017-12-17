import React, { Component } from 'react'
import PropTypes from 'prop-types'
import serializeForm from 'form-serialize'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class BookEntry extends Component {

	static props = {
		book: PropTypes.object.isRequired
	}

	handleSubmit = (book ,e) => {
		e.preventDefault()
		console.log(' handleSubmit ' + e.target.value)

		if(this.props.onUpdateBook)
			this.props.onUpdateBook(book , e.target.value)
	}


	render(){

		const { book } = this.props

		return (
		        <div className="book">
		            <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url("{book.imageLinks.smallThumbnail}")' }}></div>
		                
						<form  className="book-shelf-changer">
			                <select value={book.shelf} onChange={e => this.handleSubmit(book, e)} >
			                    <option value="none" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
			                    <option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
			                    <option value="none">None</option>
			                </select>
		                </form>

		            </div>
		         	<div className="book-title">{book.title}</div>
		            <div className="book-authors">{book.author}</div>
		        </div>
		)
	}
}

export default BookEntry