import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import DynamicTabRow from './DynamicTableRow';
const DynamicTable = ({
  data,
  columns,
  errors,
  rowOptions,
  evenRows,
  dataName,
  createDataRow,
  createErrorRow,
  getKey,
  numberOfColumns,
}) => {
  const _data = useMemo(() => {
    if (!data) {
      return null;
    }
    return data.map((item, index) => {
      const key = getKey ? getKey({dataName, index, rowData: item}) : `${index}-${dataName}`;
      const _errors = errors && typeof errors !== 'string' ? errors[index] : null;
      const _className = index % 2 === 1 && evenRows ? 'greyRow' : null;
      return (
        <DynamicTabRow
          key={key}
          className={_className}
          columns={columns}
          errors={_errors}
          rowData={item}
          options={rowOptions ? rowOptions(index, item, dataName) : null}
          rowIndex={index}
          dataName={dataName}
          createDataRow={createDataRow}
          createErrorRow={createErrorRow}
          numberOfColumns={numberOfColumns}
        />
      );
    });
  }, [data, columns, errors, rowOptions, dataName, numberOfColumns]);
  const _tableErrorLabel = useMemo(() => {
    if (!errors || typeof errors !== 'string') {
      return null;
    }
    return console.log(errors);
  }, [errors]);
  return (
    <>
      {_data}
      {_tableErrorLabel}
    </>
  );
};
DynamicTable.displayName = 'DynamicTable';

DynamicTable.defaultProps = {
  data: [],
  errors: null,
  options: null,
  columns: [],
  dataName: null,
  evenRows: false,
  createDataRow: null,
  createErrorRow: null,
  getKey: null,
};
DynamicTable.propTypes = {
  data: PropTypes.array,
  dataName: PropTypes.string,
  columns: PropTypes.array,
  evenRows: PropTypes.bool,
  createDataRow: PropTypes.func,
  createErrorRow: PropTypes.func,
  getKey: PropTypes.func,
};
export default DynamicTable;
