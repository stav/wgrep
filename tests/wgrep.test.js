/**
 * Test wgrep script
 */
const wgrep = require('../wgrep');

describe('Download', () => {
  test('should return no errors', async () => {
    const download = await wgrep.download('https://example.com/', 'output');
    expect(download).toStrictEqual(expect.objectContaining({flag: false}));
  });

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
});

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
