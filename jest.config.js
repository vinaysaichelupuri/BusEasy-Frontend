module.exports = {
    preset: 'react-test-renderer/preset',
    testEnvironment: 'jsdom',
    testRunner: 'jest-circus/runners/modern',
    moduleNameMapper: {
      '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    transformIgnorePatterns:['node_modules']
  };