import React, { Component } from 'react'

class DetailPage extends Component {

	state = {
		book : {}
	}

	componentDidMount() {
		console.log(this.props)
    	const { getBook, bookId } = this.props;
    	getBook(bookId).then(book => {
    		console.log(book)
      		this.setState({ book });
    	});
  	}

	render(){
		return(
			<div className="search-books-results">

				<span>{this.state.book.title}</span>

			</div>
		)

	}
}

export default DetailPage