/**
 * Test wgrep script
 */
const wgrep = require('./wgrep');

test('find text in folder', () => {
  const dir = '.github';
  const regex = /actions/;
  const files = wgrep.find( dir, regex )
  expect(files).toHaveLength(1);
});

test('find nothing in non-existent folder', () => {
  const dir = 'DOES-NOT-EXIST';
  const regex = /.+/;
  const files = wgrep.find( dir, regex )
  expect(files).toHaveLength(0);
});

test('show returns undefined', () => {
  expect(wgrep.show([])).toBeUndefined();
});
