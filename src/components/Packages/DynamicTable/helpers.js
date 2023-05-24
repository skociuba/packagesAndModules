import {isNil} from 'lodash';

export const getValueFromObject = (object, property) => {
  if (isNil(object)) {
    return object;
  }
  return object[property];
};

export const isPropertyDefined = (object, property) => {
  return !isNil(getValueFromObject(object, property));
};
