# testcafe-browser-provider-portables
[![Build Status](https://travis-ci.org/SkyWalker1005/testcafe-browser-provider-portables.svg)](https://travis-ci.org/SkyWalker1005/testcafe-browser-provider-portables)

This is the **portables** browser provider plugin for [TestCafe](http://devexpress.github.io/testcafe).

## Install

```
npm install testcafe-browser-provider-portables
```

## Usage


You can determine the available browser aliases by running
```
testcafe -b portables
```

When you run tests from the command line, use the alias when specifying browsers:

```
testcafe portables:browser1 'path/to/test/file.js'
```


When you use API, pass the alias to the `browsers()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('portables:browser1')
    .run();
```

## Author
lalit.sharma 
