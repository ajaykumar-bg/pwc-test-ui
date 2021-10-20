import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UserList from './user-list.component';
import SearchBar from '../common/search-bar.component';
import { SERVER_URL } from '../../constants';

const API_URL = `${SERVER_URL}/users`;

function UsersContainer() {
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [searchKey, setSearchKey] = useState('');
	const [error, setError] = useState('');

	const getAllUsers = () => {
		setLoading(true);
		let url = API_URL;
		axios
			.get(url)
			.then((response) => {
				setUsers(response.data);
				setFilteredUsers(response.data);
			})
			.catch((err) => {
				setError(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	useEffect(() => {
		let fUsers = users;
		if (searchKey) {
			// Like search
			let regex = new RegExp(searchKey, 'i');
			fUsers = users.filter(
				(user) =>
					regex.test(user.name) ||
					regex.test(user.username) ||
					regex.test(user.email) ||
					regex.test(user.phone) ||
					regex.test(user.website) ||
					regex.test(user.company.name) ||
					regex.test(user.address.suite) ||
					regex.test(user.address.street) ||
					regex.test(user.address.city) ||
					regex.test(user.address.zipcode)
			);

			// Fixed field search
			/*
			fUsers = users.filter(
				(user) =>
					user.name === searchKey ||
					user.username === searchKey ||
					user.email === searchKey ||
					user.phone === searchKey ||
					user.website === searchKey ||
					user.company.name === searchKey ||
					user.address.suite === searchKey ||
					user.address.street === searchKey ||
					user.address.city === searchKey ||
					user.address.zipcode === searchKey
			);
			*/
		}
		setFilteredUsers(fUsers);
	}, [users, searchKey]);

	return (
		<div>
			<h1>User List</h1>

			<SearchBar searchKey={searchKey} setSearchKey={setSearchKey} />
			{error && <div className='error'>{error}</div>}
			{loading ? (
				<div className='loading'>Loading...</div>
			) : (
				<>
					{filteredUsers.length ? (
						<UserList users={filteredUsers} />
					) : (
						<div>No users found</div>
					)}
				</>
			)}
		</div>
	);
}

export default UsersContainer;
