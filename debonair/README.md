# Debonair

`npm install debonair`

Debonair is a library created to assist in the creation, organization, and editing of styles within the context of React (and hopefully React-Native). It brings many priciples and concepts of a functional programming paradigm into the way we interact with styles.

- [Quick Start](docs/quickstart.md)
- [API](docs/api.md)

## Features

- Use Composition to create Styles!
- Simplifies thought process when contructing styles.
- Enables strong code reuse patterns.
- Loves ES6 conventions.

## Example
```
import { Styler } from "debonair";

/* 
create an instance of a styler, which is just a functor that will return a react style prop compatible object.
*/

let standardBox = Styler.create({
    height: 100,
    width: 100
});

let fancyBorder = styler.create({
    border: "dashed blue 3px"
});

let fancyBox = standardBox(fancyBorder);
/*
{
    height: 100,
    width: 100,
    border: "dashed blue 3px"
}
*/

let bigFancyBox = standardBox(
    standardBox.map(val => val + 200),
    fancyBorder,
    {backgroundColor: "orange"}
);
/*
{
    height: 300,
    width: 300,
    border: "dashed blue 3px",
    backgroundColor: "orange"
}
*/
```
## Installation

`npm install debonair`

In ES6: 
```
import { Debonair, Styler } from "debonair";
```
Require: 
```
var Styler = require("debonair").Styler;
```

## Build
Debonair uses [Webpack](http://webpack.github.io/) to build the library. 

Make sure you have webpack installed
```
$ npm install webpack -g
```

Build bundle
```
$ webpack
```

for Production (uglified):
```
$ webpack -p
```

## Tests:

```
$ karma start
```
