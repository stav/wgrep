/**
 * Test Puppeteer
 */
describe('Puppeteer example.com', () => {
  beforeAll(async () => {
    await page.goto('https://example.com/');
  });

  it('should be titled "Example Domain"', async () => {
    await expect(page.title()).resolves.toMatch('Example Domain');
  });
});
