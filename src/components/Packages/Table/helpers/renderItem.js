import React from 'react';

const renderItem = (item) => {
  if (!item) {
    return;
  }

  switch (item.type) {
    case 'one':
      return <div>{item?.value}</div>;
    case 'bigLetter':
      return <div>{item?.value?.toUpperCase()}</div>;
    case 'nestedIndicator':
      return item?.value?.map((nestedItem, index) => (
        <div key={index}>{renderItem(nestedItem)}</div>
      ));
    default:
      return <div>{item?.value}</div>;
  }
};

export default renderItem;
