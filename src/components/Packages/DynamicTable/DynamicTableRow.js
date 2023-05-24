import React, {useMemo} from 'react';
import {isEmpty} from 'lodash';
import PropTypes from 'prop-types';

import {isPropertyDefined, getValueFromObject} from './helpers';

const getErrorData = (errors, field) => {
  return {
    isDefined: isPropertyDefined(errors, field),
    value: getValueFromObject(errors, field),
  };
};

const DynamicTableRow = ({
  rowData,
  errors,
  options,
  columns,
  rowIndex,
  dataName,
  createDataRow,
  createErrorRow,
  numberOfColumns,
  ...props
}) => {
  const _errors = useMemo(() => {
    const _e = columns.map((column) => {
      return getErrorData(errors, column.name);
    });
    return {
      areErrors: !isEmpty(errors),
      data: _e,
    };
  }, [errors, columns]);

  const errorsView = useMemo(() => {
    if (!_errors.areErrors || !createErrorRow) {
      return null;
    } else {
      return createErrorRow(_errors.data, numberOfColumns, {dataName, rowIndex});
    }
  }, [_errors, numberOfColumns]);

  const rowDataView = useMemo(() => {
    if (!createDataRow) {
      return null;
    }
    const views = columns.map((column, index) => {
      return column.view({
        name: column.name,
        rowValue: rowData[column.name],
        rowData: rowData,
        dataName,
        rowIndex,
        isError: _errors.data[index].isDefined,
        error: _errors.data[index].value,
        column,
      });
    });
    return createDataRow(views, options, numberOfColumns, {dataName, rowIndex});
  }, [rowData, _errors, columns, options, numberOfColumns]);

  return (
    <div data-testid={`${dataName}-row-${rowIndex}`} {...props}>
      {rowDataView}
      {errorsView}
    </div>
  );
};

DynamicTableRow.displayName = 'DynamicTableRow';

DynamicTableRow.defaultProps = {
  rowData: null,
  errors: null,
  options: null,
  columns: [],
  createDataRow: null,
  createErrorRow: null,
};
DynamicTableRow.propTypes = {
  rowData: PropTypes.object,
  errors: PropTypes.object,
  columns: PropTypes.array.isRequired,
  createDataRow: PropTypes.func,
  createErrorRow: PropTypes.func,
};
export default DynamicTableRow;
