import * as React from 'react';
import * as PropTypes from 'prop-types';

const Context = React.createContext(null);
if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'TabContext';
}

function useUniquePrefix() {
  const [id, setId] = React.useState(null);
  React.useEffect(() => {
    setId(`mui-p-${Math.round(Math.random() * 1e5)}`);
  }, []);
  return id;
}

export default function TabContext({children, value, type, withFocus = true}) {
  const idPrefix = useUniquePrefix();
  const context = React.useMemo(() => {
    return {idPrefix, value, type, withFocus};
  }, [idPrefix, value, type, withFocus]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

TabContext.propTypes = {
  children: PropTypes.node,
  value: PropTypes.oneOfType[(PropTypes.string, PropTypes.number)],
  type: PropTypes.string,
  withFocus: PropTypes.bool,
};
/**
 * @returns {unknown}
 */

export function useTabContext() {
  return React.useContext(Context);
}

export function getPanelId(context, value) {
  const {idPrefix} = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-P-${value}`;
}
export function getTabId(context, value) {
  const {idPrefix} = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-T-${value}`;
}
