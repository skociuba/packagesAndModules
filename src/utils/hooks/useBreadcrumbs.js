//import {useDispatch, useSelector} from 'react-redux'; gdy redirect jest do zewnętrznej strony lub pobierasz nazwę kustomera
import {useMemo, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

import {shared} from './../../sharedConstants';

const useBreadcrumbs = ({translations = {}, keys = []}) => {
  const navigate = useNavigate();
  const greeting = translations.user;
  const breadcrumbsMemo = useMemo(() => {
    const items = keys.reduce((acc, key) => {
      acc.push(translations[key] ?? key);
      return acc;
    }, []);
    return {
      home: translations.home ?? 'home',
      greeting: greeting,
      items,
    };
  }, [keys, translations, greeting]);

  const onClick = useCallback(() => navigate({pathname: shared.routes.mainPage.root}), [navigate]);

  return [breadcrumbsMemo, onClick];
};
export default useBreadcrumbs;
