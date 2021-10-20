import React, { useState } from 'react';

function SearchBar({ searchKey, setSearchKey }) {
	const [search, setSearch] = useState(searchKey);
	const onSearch = (e) => {
		e.preventDefault();
		setSearchKey(search);
	};

	const reset = () => {
		setSearch('');
		setSearchKey('');
	};

	return (
		<form className='search-input' onSubmit={(e) => onSearch(e)}>
			<input
				type='text'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' onClick={(e) => setSearchKey(search)}>
				Search
			</button>
			<button type='button' onClick={reset} style={{ marginLeft: 2 }}>
				Reset
			</button>
		</form>
	);
}

export default React.memo(SearchBar);
