import React from 'react';
import PropTypes from 'prop-types';

import {emptyTable} from './Table.style';
import renderItem from './helpers/renderItem';
import TableForDevice from './TableForDevice';

const Table = ({
  headerData,
  bodyData,
  loading,
  withSorting,
  handleSorting,
  className,
  dataTestId,
  defaultSortingIndex,
  defaultSortingStatus,
}) => {
  return (
    <div data-testid={dataTestId}>
      {loading || !bodyData?.length ? (
        <div className={emptyTable}>NO DATA</div>
      ) : (
        <>
          <TableForDevice
            className={className}
            renderItem={renderItem}
            headerData={headerData}
            bodyData={bodyData}
            withSorting={withSorting}
            handleSorting={handleSorting}
            dataTestId={'table'}
            defaultSortingIndex={defaultSortingIndex}
            defaultSortingStatus={defaultSortingStatus}
          />
        </>
      )}
    </div>
  );
};

Table.displayName = 'Table';

Table.propTypes = {
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

Table.defaultProps = {
  headerData: {},
  bodyData: [],
  loading: true,
  className: '',
  withSorting: true,
  dataTestId: 'table',
};

Table.displayName = 'Table';

export default Table;
