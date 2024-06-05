# wgrep

Web grep: search all rendered resources used by a URI

[![Coverage][cov-image]][cov-url]
[![Releases][rel-image]][rel-url]
[![Build][build-image]][build-url]

This `node` command-line utility uses a headless browser (Puppeteer) to render
a webpage and download all resources it may need. These resources including the
original HTML are all saved locally which it searches one-by-one for a text
string.

*Since we are downloading all resources it is easy to determine the total
download size.*

## Features

* Search using regular expressions
* A screen capture is created (not configurable)

## Installation

	$ git clone https://github.com/stav/wgrep.git
	$ cd wgrep
	$ npm install

## Usage example

Let's try to find the string "stav" from the repository website on GitHub:

	$ npx wgrep stav https://github.com/stav/wgrep

	Calling for "stav" in "output" from "https://github.com/stav/wgrep" with user "undefined"
	Looking in "output" for 'stav'
	Found 1 files
	[ 'output/stav/wgrep/index.html' ]

It was only found in the `index.html` page.

Now let's see what the total download size was:

	$ du -sh output
	1.4M    output

## Options

	$ wgrep --help

	Usage: wgrep [options] <regex> <url>

	Options:
	  -V, --version                output the version number
	  -d, --directory <directory>  The output directory (default: "output")
	  -u, --username <username>    The user to authenticate as
	  -h, --help                   output usage information

## Tests

	$ npm test

	$ npm run test-e2e

## Contributing

Please file any issues you have.

If you fix a bug or add new features it would be great to have you fork this
repo and submit a pull request:

1. Fork it (`https://github.com/yourname/yourproject/fork`)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

Apache 2.0


[rel-image]:   https://img.shields.io/github/release/stav/wgrep.svg
[cov-image]:   https://codecov.io/gh/stav/wgrep/branch/master/graph/badge.svg
[build-image]: https://github.com/stav/wgrep/actions/workflows/tests.yml/badge.svg

[rel-url]:     https://github.com/stav/wgrep/releases
[cov-url]:     https://codecov.io/github/stav/wgrep
[build-url]:   https://github.com/stav/wgrep/actions
