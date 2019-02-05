import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

describe('App component', () => {
	const wrapperShallow = shallow(<App />);
	const wrapperMount = mount(<App />);
	const instance = wrapperMount.instance();

	test('renders', () => {
		expect(wrapperShallow.exists()).toBe(true);
	});

	test('Fetch data and update initial state', () => {
		instance.setPhotos();
		expect(wrapperMount.state().initialPhotos.length).toBe(13);
		expect(wrapperMount.state().photos.length).toBe(13);
	});

	test("Filter data by query 'Color', should return 2", () => {
		instance.setPhotos();
		let updatedPhotos = wrapperMount.state().initialPhotos;
		updatedPhotos = updatedPhotos.filter((item) => {
			return item.title.toLowerCase().search('color'.toLowerCase()) !== -1;
		});
		expect(updatedPhotos.length).toBe(2);
	});

	test("Filter data by query 'WWW', should return 0", () => {
		instance.setPhotos();
		let updatedPhotos = wrapperMount.state().initialPhotos;
		updatedPhotos = updatedPhotos.filter((item) => {
			return item.title.toLowerCase().search('WWW'.toLowerCase()) !== -1;
		});
		expect(updatedPhotos.length).toBe(0);
	});
});
