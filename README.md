Debonair is a library that helps in exploring a Functional Approach to JS Styles in React. 

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