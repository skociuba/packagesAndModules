import React, {useState} from 'react';
import Button from '@material/react-button';
import PropTypes from 'prop-types';
const Search = ({onSearch, btnText}) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
      setValue('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" value={value} onChange={handleChange} />
        {onSearch && <Button type="submit">{btnText}</Button>}
      </form>
    </div>
  );
};

Search.propTypes = {
  btnText: PropTypes.string,
  onSearch: PropTypes.func,
};

Search.defaultProps = {
  btnText: 'search',
};

export default Search;
