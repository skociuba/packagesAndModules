import React, {useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import Breadcrumbs from 'components/Packages/Breadcrumbs/Breadcrumbs';
import {useTranslation} from 'react-i18next';

import useBreadcrumbs from '../../utils/hooks/useBreadcrumbs';
import {FallbackIndicator} from '../../components/Packages/FallbackIndicator/index';

import {getTranslations} from './translation';
import {fetchTestData} from './actions';
import {testDataSelector, testLoadingSelector, errorSelector} from './selectors';
import {contentContainer} from './Test.style';
const Test = () => {
  const dispatch = useDispatch();

  const testData = useSelector((state) => testDataSelector(state));
  const errorCode = useSelector((state) => errorSelector(state));
  const testLoadingExample = useSelector((state) => testLoadingSelector(state));
  console.log(errorCode);
  useEffect(() => {
    dispatch(fetchTestData());
  }, [dispatch]);

  const {t} = useTranslation();

  const user = 'John Travolta';

  const translations = useMemo(() => getTranslations(t, user), [t, user]);

  const [breadcrumbs, onBreadcrumbsClick] = useBreadcrumbs({
    translations,
    keys: ['test'],
  });

  const componentContent = testLoadingExample ? (
    'Loading...'
  ) : (
    <section data-testid="test-container">
      {testData?.length > 0 &&
        testData.map((users) => (
          <div key={users._id}>
            <FallbackIndicator>{users.name}</FallbackIndicator>
            <FallbackIndicator>{users.trips}</FallbackIndicator>
            {users?.airline?.map((item) => (
              <p key={item.id}>
                <FallbackIndicator>{item.name}</FallbackIndicator>
                <FallbackIndicator>{item.head_quaters}</FallbackIndicator>
              </p>
            ))}
          </div>
        ))}
    </section>
  );
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} onBreadcrumbsClick={() => onBreadcrumbsClick} />
      <div className={contentContainer}>{componentContent}</div>
    </>
  );
};
Test.propTypes = {
  fetchTestData: PropTypes.func,
};
export default Test;
