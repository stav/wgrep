# wgrep

Web grep: search all rendered resources used by a URI

## Synopsis

This command-line utility uses a headless browser (Puppeteer) to render a webpage and download all resources it may need. These resources including the original HTML are all saved locally which it searches one-by-one for a text string.

## Code Example

	wfind domain http://example.com
	Hello, world!
	Calling for "domain" at "http://example.com" with user "undefined"
	Downloading "http://example.com"
	http://example.com
	seems ok
	Finding "domain"
	  * output/index.html

## Motivation

This project was created to aid in the scraping of web pages. I could see some text on the screen and I wanted to know what file that text came from, perhaps from some XHR resource downloaded with JavaScript.

## Installation

Provide code examples and explanations of how to get the project.

## License

Apache 2.0
