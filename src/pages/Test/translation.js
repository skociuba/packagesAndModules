const TEST = 'test';

export const getTranslations = (t, user) => ({
  home: t(`${TEST}:home`),
  test: t(`${TEST}:test`),
  user: t(`${TEST}:user`, {user}),
});
