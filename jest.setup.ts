import '@testing-library/jest-native/extend-expect';

jest.mock('expo-router', () => {
  const actual = jest.requireActual('expo-router');
  return {
    ...actual,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    }),
    useLocalSearchParams: () => ({ id: '1' }),
  };
});

jest.mock('@expo/vector-icons', () => {
  const React = require('react');

  const MockIcon = (props: any) =>
    React.createElement(
      'Text',
      { testID: props.testID || 'icon' },
      props.name || 'icon',
    );

  return {
    FontAwesome: MockIcon,
    Ionicons: MockIcon,
    MaterialIcons: MockIcon,
    AntDesign: MockIcon,
    Feather: MockIcon,
    Entypo: MockIcon,
  };
});

jest.mock('@expo/vector-icons/FontAwesome', () => {
  const React = require('react');

  return (props: any) =>
    React.createElement(
      'Text',
      { testID: props.testID || 'icon' },
      props.name || 'icon',
    );
});
