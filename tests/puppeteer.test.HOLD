/**
 * Test Puppeteer
 */
const timeout = 10000;

describe('Puppeteer example.com', () => {
  beforeAll(async () => {
    await page.goto('https://example.com/');
  }, timeout);

  it('should be titled "Example Domain"', async () => {
    await expect(page.title()).resolves.toMatch('Example Domain');
  });
}, timeout);
