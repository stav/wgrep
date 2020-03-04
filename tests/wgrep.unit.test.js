/**
 * Test wgrep script unit tests
 */
const wgrep = require('../wgrep');

describe('Find', () => {
  test('should find text in folder', () => {
    const dir = '.github';
    const regex = /actions/;
    const files = wgrep.find( dir, regex )
    expect(files).toHaveLength(1);
  });

  test('should find nothing in non-existent folder', () => {
    const dir = 'DOES-NOT-EXIST';
    const regex = /.+/;
    const files = wgrep.find( dir, regex )
    expect(files).toHaveLength(0);
  });
});

describe('Show', () => {
  test('should show returns undefined', () => {
    expect(wgrep.show([null])).toBeUndefined();
  });
});
