/**
 * Integration tests
 *
 * Test wgrep download function over network
 */
const wgrep = require('../wgrep');
const timeout = 10000;

describe('Download', () => {
  test('should return no errors', async () => {
    const download = await wgrep.download('https://example.com/', 'output');
    expect(download).toStrictEqual(expect.objectContaining({flag: false}));
  }, timeout);

  test('should return network error', async () => {
    const download = await wgrep.download('badscheme://example.com/', 'output');
    expect(download).toStrictEqual(expect.objectContaining({net: 1}));
  });

  // // This will increase code coverage to 100% if we hardcode the parent
  // // traversal correctly but kinda lame, dangerous and hard to cleanup.
  // // Need to setup/teardown a target directory without write permissions
  // test('should return buffer error', async () => {
  //   const download = await wgrep.download('https://example.com/', '../../../../');
  //   expect(download).toStrictEqual(expect.objectContaining({buf: 1}));
  // });
}, timeout);
