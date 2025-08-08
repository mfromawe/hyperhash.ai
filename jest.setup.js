const React = require('react');
require('@testing-library/jest-dom');

jest.mock('@/components/auth/AuthButtons', () => {
  return () => React.createElement('div', { 'data-testid': 'mock-auth-buttons' });
});