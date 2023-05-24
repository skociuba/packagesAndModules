import React, {useEffect, useRef, useState, forwardRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

import {cx} from '../../../emotion.instance';

import {Checkbox} from './../Checkbox';
import {CustomInput} from './../CustomInput/index';
import {
  container,
  labelWrapper,
  select,
  input,
  optionGroupLabel,
  indicators,
  indicator,
  optionsWrapper,
  optionGroup,
  option,
} from './Select.style';

const KEY = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: 'Space',
  ALT: 'Alt',
  TAB: 'Tab',
  ARROW_DOWN: 'ArrowDown',
  ARROW_UP: 'ArrowUp',
};

const Select = forwardRef(
  (
    {
      id,
      testId,
      placeholder,
      noOptionsMessage,
      children,
      isDisabled,
      disabled,
      isLoading,
      isMulti,
      options,
      defaultValue,
      value,
      error,
      showOpenIndicator,
      onChange,
      onInputChange,
      label,
      showLabel,
      showActiveOptionOnOptionsList,
      getOptionLabel,
      ariaLabel,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isBlurred, setIsBlurred] = useState(true);
    const [childOptions, setChildOptions] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState(defaultValue?.label || value?.label);
    const [selectedValue, setSelectedValue] = useState(defaultValue?.value || value?.value);
    const [selectedItems, setSelectedItems] = useState(
      defaultValue ? [defaultValue] : value ? value : [],
    );
    const [openedGroups, setOpenedGroup] = useState([]);
    const node = useRef();
    const inputNode = useRef();
    const addGroup = (item) => setOpenedGroup([...new Set([...openedGroups, item])]);
    const removeGroup = (item) =>
      setOpenedGroup([...new Set([...openedGroups].filter((group) => group !== item))]);

    const handleFocus = (e) => {
      if (!node?.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const isSelected = (item) =>
      selectedItems?.find((selected) => selected?.value === item) || false;

    const isMultiSelected = (item) => {
      const getSelectedItem = selectedItems?.find((selected) => selected?.value === item);
      return !!getSelectedItem?.value;
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleFocus);

      return () => {
        document.addEventListener('mousedown', handleFocus);
      };
    }, []);

    useEffect(() => {
      if (React.Children.count(children)) {
        setChildOptions(
          React.Children.toArray(children)
            .filter(
              (child) =>
                ['Option', 'OptGroup'].includes(child.type.displayName) ||
                ['option', 'optgroup'].includes(child.type),
            )
            .map((child, index) => ({
              isGroup: child.type.displayName === 'OptGroup' || child.type === 'optgroup',
              children:
                child.type.displayName === 'OptGroup'
                  ? child.props.children.map((subChild) => ({
                      children: subChild.props.children,
                      label: subChild.props.label,
                      value: subChild.props.value,
                      isDisabled: subChild.props.disabled,
                    }))
                  : child.props.children,
              label: child.props.label,
              value:
                child.type.displayName === 'OptGroup' || child.type === 'optgroup'
                  ? index
                  : child.props.value,
              isDisabled: child.props.disabled,
            })),
        );
      }
    }, [children]);

    useEffect(() => {
      if (value) {
        if (isMulti) {
          if (value.length === 0) {
            setSelectedItems(value);
          }
        } else {
          const optionToSet = childOptions.find(
            ({value: childValue}) => childValue === value?.value,
          );
          if (optionToSet && selectedValue !== optionToSet?.value) {
            handleElementChoose(
              optionToSet?.value,
              optionToSet?.isDisabled,
              optionToSet?.label,
              optionToSet?.children,
            );
          }
        }
      }
    }, [value, isMulti]);

    const onClear = () => {
      setSelectedLabel('');
      setSelectedValue('');
    };

    const getKey = (object, position) => {
      const key = object && Object?.keys(object);
      return key[position];
    };
    const getLabel = (object) => {
      const key = object && Object?.keys(object);
      const data = key?.map((elem) => JSON.parse(`{"${[elem]}":"${object[elem]}"}`));
      const obj = Object.assign({}, ...data);
      return obj;
    };

    const handleElementChoose = (item, optionDisabled, optionLabel, optionChildren) => {
      if (!optionDisabled) {
        if (!isMulti) {
          onChange({value: item});
          setSelectedLabel(optionChildren || optionLabel || getLabel(item));
          setSelectedValue(item);
          setIsOpen(false);
          setIsBlurred(true);
        } else {
          let toUpdate;
          if (isSelected(item)) {
            toUpdate = selectedItems.filter((selected) => selected.value !== item);
          } else {
            toUpdate = [
              ...selectedItems,
              {
                value: item,
                isDisabled: optionDisabled,
                label: optionLabel,
                children: optionChildren,
              },
            ];
          }
          onChange({value: toUpdate.map((itemToUpdate) => itemToUpdate.value)});
          setSelectedItems(toUpdate);
        }
      }
    };

    const generateOption = (
      index,
      disabledOption,
      item,
      optionLabel,
      optionChildren,
      isNested,
      rawText,
    ) => {
      const optionName = rawText
        ? optionLabel || optionChildren || item
        : getOptionLabel(optionChildren || optionLabel || item);

      return (
        <li
          data-testid="option"
          role="option"
          id={typeof item === 'string' ? item : Object.values(item)}
          aria-selected={
            isMulti
              ? isMultiSelected(item)
              : item === selectedValue || item[getKey(item, 0)] === selectedItems
          }
          key={index}
          className={option({
            isDisabled: disabledOption,
            isNested,
            isMulti,
            isLoading,
          })}
          tabIndex="0"
          onBlur={(e) => {
            if (!isMulti && !node.current.contains(e.target)) {
              setIsOpen(false);
            }
          }}
          onKeyDown={(e) => {
            const {key} = e;
            if ([KEY.ENTER, KEY.SPACE].includes(key)) {
              handleElementChoose(item, disabledOption, optionLabel, optionChildren);
            }
            if (key === KEY.ESCAPE) {
              setIsOpen(false);
            }
          }}
          onClick={() => handleElementChoose(item, disabledOption, optionLabel, optionChildren)}>
          {isMulti && (
            <Checkbox disabled={disabledOption} checked={isSelected(item)} onChange={() => {}} />
          )}{' '}
          {optionName} {optionName === selectedLabel && showActiveOptionOnOptionsList}
        </li>
      );
    };

    const getMultipleLabel =
      selectedItems?.length && selectedItems.map((multiLabel) => multiLabel.children);

    const createProperId = (str) => str?.replace(/\s+/g, '-')?.toLowerCase();

    const currentOption =
      selectedValue && typeof selectedValue !== 'string'
        ? Object.values(selectedValue)[0]
        : selectedValue || getMultipleLabel || placeholder;

    const listId = createProperId(ariaLabel) || createProperId(placeholder);

    useImperativeHandle(ref, () => ({onClear}), []);

    return (
      <div ref={ref} className={container}>
        <div
          ref={node}
          data-testid={testId}
          aria-expanded={isOpen}
          aria-describedby={id ? `${id}'${error ? '-error' : ''}` : null}
          aria-haspopup="listbox"
          aria-label={`current option is ${currentOption}`}
          id={id}
          className={container}
          onFocus={() => setIsBlurred(false)}
          role="combobox">
          {showLabel && (
            <div className={labelWrapper}>
              <label htmlFor={placeholder}>{label}</label>
            </div>
          )}
          <button
            id={listId}
            aria-label={
              currentOption
                ? `${ariaLabel ? ariaLabel + ' ' : ''}current option is ${currentOption}`
                : null
            }
            data-testid="select"
            className={select({
              isDisabled: isDisabled || disabled,
              error,
              isLoading,
              isOpen,
            })}
            onKeyDown={(key) => {
              if (!disabled && !isDisabled && [KEY.ENTER, KEY.SPACE].includes(key)) {
                setIsOpen(!isOpen);
              } else if (key === KEY.ESCAPE) {
                setIsOpen(false);
              }
            }}
            onClick={(e) => {
              if (!disabled && !isDisabled && !inputNode?.current?.contains(e.target)) {
                setIsOpen(!isOpen);
              }
            }}
            role="button"
            aria-expanded={isOpen && !(isDisabled || disabled)}
            aria-haspopup="listbox"
            tabIndex="0">
            <div className={input}>
              {onInputChange && !isBlurred ? (
                <CustomInput
                  aria-activedescendant={currentOption}
                  aria-expanded={isOpen}
                  inputRef={inputNode}
                  onChange={({target: {value: inputValue}}) => {
                    onInputChange(inputValue);
                  }}
                  placeholder={
                    selectedValue || selectedLabel
                      ? getOptionLabel(selectedLabel || selectedValue)
                      : placeholder
                  }
                  disabled={isDisabled || disabled}
                  onBlur={() => setIsBlurred(true)}
                  onClick={() => setIsOpen(true)}
                  role="combobox"
                />
              ) : isMulti ? (
                selectedItems?.length ? (
                  selectedItems.map(
                    (item, index) =>
                      `${getOptionLabel(item.children || item.label || item.value)}${
                        index < selectedItems.length - 1 ? ', ' : ''
                      }`,
                  )
                ) : (
                  placeholder
                )
              ) : selectedLabel || selectedValue ? (
                getOptionLabel(selectedLabel || selectedValue)
              ) : (
                placeholder
              )}
            </div>
            <div className={indicators}>
              {isLoading && <RotateLeftIcon />}
              {showOpenIndicator && (
                <div className={indicator}>
                  {isOpen ? (
                    <KeyboardControlKeyIcon fontSize="large" />
                  ) : (
                    <KeyboardArrowDownIcon fontSize="large" />
                  )}
                </div>
              )}
            </div>
          </button>
          {isOpen && !(isDisabled || disabled) && (
            <ul
              aria-activedescendant={currentOption}
              aria-expanded={isOpen}
              aria-labelledby={id}
              data-testid="options"
              role="listbox"
              className={optionsWrapper({
                length: childOptions?.length || options?.length || 1,
                width: node?.current?.offsetWidth,
                isMulti,
              })}>
              {!childOptions?.length && !options?.length
                ? generateOption(0, true, 0, noOptionsMessage, null, false, true)
                : [...(childOptions?.length ? childOptions : options)]?.map(
                    (
                      {
                        isGroup,
                        label: optionLabel,
                        children: optionChildren,
                        value: optionValue,
                        isDisabled: disabledOption,
                      },
                      index,
                    ) =>
                      isGroup ? (
                        <li className={optionGroup} key={index} data-testid="optionGroup">
                          <ul
                            key={index}
                            tabIndex="0"
                            className={cx(option({disabled: disabledOption}), optionGroupLabel)}
                            onKeyDown={(key) => {
                              if ([KEY.ENTER, KEY.SPACE].includes(key) && !disabledOption) {
                                if (openedGroups.includes(optionValue)) {
                                  removeGroup(optionValue);
                                } else {
                                  addGroup(optionValue);
                                }
                              }
                              if (key === KEY.ESCAPE) {
                                setIsOpen(false);
                              }
                            }}
                            onClick={() => {
                              if (!disabledOption && !openedGroups.includes(optionValue)) {
                                addGroup(optionValue);
                              } else {
                                removeGroup(optionValue);
                              }
                            }}>
                            {optionLabel}
                            {openedGroups.includes(optionValue) ? '^' : 'V'}
                          </ul>
                          {openedGroups.includes(optionValue) &&
                            optionChildren.map(
                              (
                                {
                                  labe: subOptionLabel,
                                  children: subOptionChildren,
                                  value: subOptionValue,
                                  isDisabled: disabledSubOption,
                                },
                                subOptionIndex,
                              ) =>
                                generateOption(
                                  `${index}-${subOptionIndex}`,
                                  disabledSubOption,
                                  subOptionValue,
                                  subOptionLabel,
                                  subOptionChildren,
                                  true,
                                ),
                            )}
                        </li>
                      ) : (
                        generateOption(
                          index,
                          disabledOption,
                          optionValue,
                          optionLabel,
                          optionChildren,
                          false,
                        )
                      ),
                  )}
            </ul>
          )}
        </div>
      </div>
    );
  },
);

Select.PropTypes = {
  children: PropTypes.node,
  ariaLabel: PropTypes.string,
  id: PropTypes.string,
  testId: PropTypes.string,
  placeholder: PropTypes.string,
  noOptionsMessage: PropTypes.string,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        children: PropTypes.node,
        disabled: PropTypes.bool,
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ),
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        children: PropTypes.node,
        disabled: PropTypes.bool,
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ),
  ]),
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showOpenIndicator: PropTypes.bool,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  showActiveOptionOnOptionsList: PropTypes.bool,
  getOptionLabel: PropTypes.func,
};
Select.defaultProps = {
  placeholder: 'Please select',
  noOptionsMessage: 'no options message',
  isDisabled: false,
  disabled: false,
  isLoading: false,
  isMulti: false,
  error: false,
  showOpenIndicator: true,
  onChange: () => {},
  label: 'label',
  showLabel: false,
  showActiveOptionOnOptionsList: false,
  getOptionLabel: (label) => label,
};

export default Select;
