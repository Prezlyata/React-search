import React, { Component } from 'react';
import './App.css';

const API_URL =
	'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=6e7e169c9890dd483c8b55ec4a4336e5&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1&auth_token=72157703070794842-6c1ce4456a587370&api_sig=13d0a05385a8ab8e4fc85a253166530c';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initialPhotos: [],
			photos: []
		};
	}

	componentDidMount() {
		this.getPhotos();
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
