import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {BsChevronDoubleUp, BsChevronDoubleDown} from 'react-icons/bs';

const MAP_SORTING_OPTION = ['default', 'desc', 'asc'];

import {sorterContainer, sortingContainer, dataContainer, table} from './TableForDevice.style';
const TableForDevice = ({
  className,
  renderItem,
  headerData,
  bodyData,
  withSorting,
  handleSorting,
  dataTestId,
  defaultSortingIndex,
  defaultSortingStatus,
}) => {
  const [sortingIndex, setSortingIndex] = useState(defaultSortingIndex);
  const [currentSortingStatus, setCurrentSortingStatus] = useState(defaultSortingStatus);

  const Sorter = ({index}) => (
    <div className={sorterContainer(index === sortingIndex ? currentSortingStatus : 0)}>
      <p>
        <BsChevronDoubleUp />
        <BsChevronDoubleDown />
      </p>
    </div>
  );

  const handleSortBy = (index, item) => {
    const sortingStatus =
      sortingIndex !== index ? 1 : currentSortingStatus >= 2 ? 0 : currentSortingStatus + 1;
    setSortingIndex(index);
    setCurrentSortingStatus(sortingStatus);
    if (handleSorting) {
      handleSorting(item, MAP_SORTING_OPTION[sortingStatus], index, sortingStatus);
    }
  };

  return (
    <table data-testid={dataTestId} className={table}>
      <thead>
        <tr>
          {Object.keys(headerData).map((itemKey, index) => (
            <th key={index} onClick={withSorting ? handleSortBy.bind(this, index, itemKey) : null}>
              <div className={sortingContainer}>
                {' '}
                {headerData[itemKey]?.title}
                {withSorting && <Sorter index={index} />}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyData.map((rowData, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <tr>
              {Object.keys(headerData).map((itemKey, index) => (
                <td key={index}>
                  <div className={dataContainer}>{renderItem(rowData[itemKey])} </div>
                </td>
              ))}
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

TableForDevice.propTypes = {
  headerData: PropTypes.object,
  bodyData: PropTypes.array,
  loading: PropTypes.bool,
  className: PropTypes.string,
  withSorting: PropTypes.bool,
  handleSorting: PropTypes.func,
  dataTestId: PropTypes.string,
  totalNumberOfRecords: PropTypes.number,
  handleSideEffect: PropTypes.func,
};

TableForDevice.defaultProps = {
  headerData: {},
  bodyData: [],
  className: '',
  withSorting: true,
  dataTestId: 'table',
  defaultSortingIndex: 0,
  defaultSortingStatus: 0,
};

export default TableForDevice;
