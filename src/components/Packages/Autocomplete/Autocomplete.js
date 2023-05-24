import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {CustomInput} from './../CustomInput/index';
import {
  inputBar,
  autocompleteContainer,
  listItem,
  listContainer,
  labelContainer,
} from './Autocomplete.style';

const KEY = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  ARROW_DOWN: 'ArrowDown',
  ARROW_UP: 'ArrowUp',
};

const Autocomplete = ({
  testId,
  id,
  label,
  placeholder,
  disableInput,
  listAriaLabel,
  isInputLoading,
  btnKind,
  btnText,
  disableBtn,
  listBtnLabel,
  list,
  error,
  noOptionsMessage,
  onChange,
  onSelect,
  onSubmit,
  filterResults,
}) => {
  const [value, setValue] = useState('');
  const [selectedItemList, setSelectedItemList] = useState(null);
  const [selectedListItemIndex, setSelectedListItemIndex] = useState(null);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (value && list?.length) {
      const items = filterResults
        ? list.filter((item) =>
            !item?.label ? null : item.label.toUpperCase().includes(value.toUpperCase()),
          )
        : list;
      setFilteredList(items);
    }
    if (!value || value === selectedItemList?.label) {
      setFilteredList([]);
    }
  }, [value, list]);

  const noMatch = !!value?.length && !selectedItemList;
  const listContainerSize = filteredList?.length ? filteredList?.length : noMatch ? 1 : 0;
  const isInputDisabled = disableInput || isInputLoading;
  const isBtnDisabled = disableBtn || isInputLoading;

  const handleChange = (e) => {
    const val = e.target.value || '';
    setValue(val);
    setSelectedItemList(null);
    if (onChange) {
      onChange(val);
    }
  };

  const handleSelect = (item, index) => {
    if (onSelect) {
      onSelect(item);
    }
    setSelectedItemList(item);
    setSelectedListItemIndex(index);
    setFilteredList([]);
    setValue(item?.label || '');
  };

  const handleClear = () => {
    setSelectedItemList(null);
    setSelectedListItemIndex(null);
    setFilteredList([]);
  };
  const handleKeyDown = (key, item, index) => {
    if (key === KEY.ESCAPE) {
      handleClear();
    }
    if (key === KEY.ENTER) {
      handleSelect(item, index);
    }
  };
  const handleInputKeyDown = ({key}) => {
    if (key === KEY.ARROW_UP || key === KEY.ARROW_DOWN) {
      if (selectedListItemIndex === null || selectedListItemIndex >= filteredList?.length) {
        setSelectedListItemIndex(0);
      } else {
        setSelectedListItemIndex((i) => i + 1);
      }
    }
    if (key === KEY.ENTER && filteredList?.length) {
      handleSelect(filteredList[selectedListItemIndex], selectedListItemIndex);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(selectedItemList);
    }
  };

  return (
    <div data-testid="autocompleteBar">
      <form
        className={inputBar}
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.key === KEY.ENTER) {
            e.preventDefault();
          }
        }}
        onSubmit={handleSubmit}>
        <div className={autocompleteContainer}>
          {label && (
            <label htmlFor="autocomplete" className={labelContainer}>
              {label}
            </label>
          )}
          <CustomInput
            id={id}
            type="search"
            aria-activedescendant={
              selectedListItemIndex || selectedListItemIndex === 0
                ? selectedListItemIndex + 1
                : selectedListItemIndex
            }
            aria-autocomplete="list"
            aria-expanded={!!filteredList?.length}
            aria-controls={`${id}-results`}
            aria-haspopup="listbox"
            error={error}
            placeholder={placeholder}
            disabled={isInputDisabled}
            value={value}
            isLoading={isInputLoading}
            onKeyDown={handleInputKeyDown}
            onChange={handleChange}
            role="combobox"
          />
          {!!list?.length && (
            <ul
              id={`${id}-results`}
              role="listbox"
              aria-label={listAriaLabel}
              className={listContainer(listContainerSize)}>
              {filteredList?.map((item, i) => {
                const isSelected = selectedListItemIndex === i;
                return (
                  <li
                    key={i}
                    id={i + 1}
                    tabIndex="0"
                    role="option"
                    className={listItem(isSelected)}
                    aria-selected={isSelected}
                    onKeyDown={({key}) => handleKeyDown(key, item, i)}
                    onClick={() => handleSelect(item, i)}>
                    {item?.label}
                  </li>
                );
              })}
              {filteredList?.length === 0 && noMatch && (
                <li
                  id="1"
                  tabIndex="0"
                  role="option"
                  aria-selected="false"
                  className={listItem(false)}>
                  {noOptionsMessage}
                </li>
              )}
            </ul>
          )}
        </div>

        {onSubmit && btnText && (
          <button
            data-testid={testId}
            aria-label={listBtnLabel}
            aria-expanded="false"
            disabled={isBtnDisabled}
            type="submit">
            {btnText}
          </button>
        )}
      </form>
    </div>
  );
};

Autocomplete.PropTypes = {
  id: PropTypes.string,
  btnKind: PropTypes.string,
  btnText: PropTypes.string,
  disableBtn: PropTypes.bool,
  disableInput: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  noOptionsMessage: PropTypes.string,
  isInputLoading: PropTypes.bool,
  testId: PropTypes.string,
  listAriaLabel: PropTypes.string,
  listBtnLabel: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  onSubmit: PropTypes.func,
  filterResults: PropTypes.bool,
};
Autocomplete.defaultProps = {
  id: 'autocomplete',
  btnKind: 'primary',
  btnText: null,
  disableBtn: false,
  disableInput: false,
  label: null,
  placeholder: null,
  noOptionsMessage: '',
  isInputLoading: false,
  filterResults: true,
  listAriaLabel: 'List',
  listBtnLabel: 'Select item',
  list: [],
};

export default Autocomplete;
