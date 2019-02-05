import React, { Component } from 'react';
import './App.css';
import photos from './data/photos.json';

const API_URL =
	'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=9a0c761a0f9917ec4fdf98588e5d8de8&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1&auth_token=72157706407148935-479b53704d59b1e2&api_sig=08fbc227be3a17b8551abb6ff033a5f0';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initialPhotos: [],
			photos: []
		};
	}

	componentDidMount() {
		// this.getPhotos();
		this.setPhotos();
	}

	getPhotos = () => {
		fetch(API_URL)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({ initialPhotos: data.photos.photo, photos: data.photos.photo });
			});
	};
	setPhotos = () => {
		this.setState({ initialPhotos: photos.photos.photo, photos: photos.photos.photo });
	};

	filterPhotos = (e) => {
		let updatedPhotos = this.state.initialPhotos;

		updatedPhotos = updatedPhotos.filter((item) => {
			return item.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
		});

		this.setState({ photos: updatedPhotos });
	};

	render() {
		console.log(this.state.photos);
		return (
			<div className="app-photos">
				<div className="container">
					<div className="findCard">
						<input placeholder="Search..." onChange={this.filterPhotos} />
					</div>
					<div className="cards">
						{this.state.photos.map((photo, idx) => {
							return (
								<div className="card">
									<div key={idx}>
										<img
											src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
											alt="img"
										/>
										<div className="discard">
											<h5>{photo.title}</h5>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
