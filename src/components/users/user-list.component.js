import React from 'react';

function UserList({ users = [] }) {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Username</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Website</th>
					<th>Company</th>
					<th>Address</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<tr key={user.id}>
						<td>{user.name}</td>
						<td>{user.username}</td>
						<td>{user.email}</td>
						<td>{user.phone}</td>
						<td>{user.website}</td>
						<td>{user.company.name}</td>
						<td>
							{`${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default React.memo(UserList);
