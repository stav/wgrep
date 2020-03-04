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

test('do not find anything for non-existent folder', () => {
  const dir = 'DOES-NOT-EXIST';
  const regex = /.+/;
  const files = wgrep.find( dir, regex )
  expect(files).toHaveLength(0);
});
