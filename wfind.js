/**
 * Find text within all resources of a webpage
 */
'use strict';
const puppeteer = require('puppeteer');
const { URL } = require('url');  // core
const findit = require('findit')
const path = require('path');  // core
const fse = require('fs-extra');

const download = async function ( url ) {
  console.log('Downloading "%s"', url)

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('response', async (response) => {
    const url = new URL(response.url());
    let filePath = path.resolve(`./output${url.pathname}`);
    if (path.extname(url.pathname).trim() === '') {
      filePath = `${filePath}/index.html`;
    }
    await fse.outputFile(filePath, await response.buffer());
  });

  await page.goto( url, {
    waitUntil: 'networkidle2'
  });
  await page.screenshot({path: 'news4.png', fullPage: true});
  console.log( url )
  await browser.close();

  return 'seems ok'

};

const find = function ( text ) {
  console.log('Finding "%s"', text)
  const finder = findit('output');

  finder.on('file', function (file, stat) {
      console.log(file);
  })
  return
}

exports.download = download;
exports.find = find;
