module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  setupFiles: ['<rootDir>testSetup.js'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  }
};
