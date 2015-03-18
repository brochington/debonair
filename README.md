# Debonair

Debonair is a library created to assist in the creation, organization, and editing of styles within the context of React. It brings many priciples and concepts of a functional programming paradigm into the way we interact with styles.

- [Quick Start](debonair/docs/quickstart.md)
- [API](debonair/docs/api.md)

## Features

- Use Composition to create Styles!
- Simplifies thought process when contructing styles.
- Enables strong code reuse patterns.
- Loves ES6 conventions.

## Example
```
import { Styler } from "debonair";

/* create an instance of a styler, which is just a functor that will return a react style prop compatible object.
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
    backgroundColor: "
}
*/
```


## Installation

Debonair comes with an example project for easier dev work. The easiest way to get running is to link the debonair library folder to the example folder so that dev work doesn't need a new
npm install of example every time you update debonair. Linking is easy:

In /debonair/debonair: 

```
$ npm install
$ npm link
```

then in /debonair/example: 

```
$ npm link debonair
$ npm install
$ npm start
```

## Tests:

in debonair/debonair:

```
$ karma start
```
