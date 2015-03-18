# Getting Started

## Stylers


In Debonair most of the manipulation of CSS styles will be done through the use of "stylers", which are simply functions that whenever called will return an object that is suitable to be inserted in the "style" prop in react components.

First thing to do is import the Styler class.

in ES6:
```
import { Styler } from "debonair";
```
Basic Require
```
var Styler = require("debonair").Styler;
```



```
let styler = Styler.createStyler({
    height: 100,
    width: 200,
    padding: 20
    ...
});
```

to use the styles of the styler, simply evaluate it. 

```
<div style={styler()}></div>
```

The real power of Debonair can be seen once you start to compose styles. To compose styles, simply pass in the styles you want to add or change as arguments into the styler.

```
let styler = stylish.createStyler({
    height: 100,
    width: 100
});

let standardBorder = {
    border: "solid black 2px"
};
<div style={styler(standardBorder)}></div>
/*
Styles will be: 
{
    height: 100,
    width: 100,
    border: "solid black 2px"
}
*/
```
stylers can take many arguments, and will behave in a similar fashion to Object.assign().
```
<div style={styler({height: 100}, {width: 200})}></div>
```

Valid structures that can be used as arguments into a styler are:
- Standard ojects:
```
let stdHeight = stylish.createStyler({
    height: 100
});
<div style={stdHeight({width: 100})}></div>
```
- other stylers: 
```
let stdHeight = stylish.createStyler({
    height: 100
});
let stdWidth = stylish.createStyler({
    width: 100
});
<div style={stdHeight(stdWidth)}></div>
```
- function that return style objects:
```
let stdHeight = stylish.createStyler({
    height: 100
});
let quarterWindowWidth = () => {
    return {
        width: window.innerWidth / 4
    };
}
<div style={stdHeight(quarterWindowWidth)}></div>
```
- Arrays
```
let stdHeight = stylish.createStyler([{
        height: 100
    }, {
        width: 100
    }
]);
<div style={stdHeight()}></div>
```

You can mix and match structures to your heart's content!
```
let styler1 = Styler.create({
    width: 200
});

let mergedStyles = Styler.create({
    height: 100,
    width: 100
    },{
    backgroundColor: "orange"
    }, 
    currentStyles => {return {border: "solid yellow 3px", height: 400};}, 
    styler1, 
    [{display: "block"}, {padding: 10}, {padding: 20}]
);
mergedStyles();
/*
{
    height: 400, 
    width: 200, 
    backgroundColor: 'orange', 
    border: 'solid yellow 3px', 
    display: 'block', 
    padding: 20
}
*/
```

Stylers have a number of methods, many common to a functional programming workflow. please see the [API documentation](./api.md). You can map, filter, reduce, etc on the styler instance. One important thing to note is that because it is still operated on a styler, the return value of whatever operation you are doing should be an object. for instance: 
```
let testStyler = Styler.create({
    height: 100,
    width: 100
});
testStyler.map(val => style + 200);
/*
{
    height: 300,
    width: 300
}
*/
```
