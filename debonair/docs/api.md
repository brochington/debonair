<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Styler Methods](#styler-methods)
  - [create](#create)
- [Styler Instance](#styler-instance)
- [Styler Instance Methods](#styler-instance-methods)
  - [map](#map)
  - [reduce](#reduce)
  - [filter](#filter)
  - [merge](#merge)
  - [get](#get)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Styler Methods

## create

A styler is a functor that when called will return an object suitable for use within the style property in React. It can accept an indeterminate amount of arguments, and will merge the arguments from left to right. Acceptable arguments are: 

- Object
```
let standardBox = Styler.create({
    height: 100,
    width: 100
});

standardBox()
// -> {height: 100, width: 100}
```

- Stylers
```
let standardBox = Styler.create({
    height: 100,
    width: 100
});

let fancyBox = Styler.create(standardBox, {border: "dashed violet 2px"});

fancyBox();
/*
-> {
    height: 100,
    width: 100,
    border: "dashed violet 2px"
}
*/
```

- Arrays
```
let myStyler = Styler.create([{height: 100}, {width: 100}, {backgroundColor: "blue"}]);

myStyler();
/*
-> {
    height: 100,
    width: 100,
    backgroundColor: "blue"
}
*/
```

- Functions
Note - an object that represents the current state of styles will be passed as an argument.
```
let standardBox = Styler.create({
    height: 100,
    width: 100
});

let expandBox = styles => {
    return {
        width: styles.width + 100,
        height: styler.height + 100
    };
};

let biggerBox = Styler.create(standardBox, expandBox);

biggerBox();
/*
-> {
    height: 200,
    width: 200
}
*/
```

# Styler Instance
Return an object suitable for use in the style property of react components. Accepts an indeterminate number of arguments. Output is the merged result of all arguments. Merge order is Left to right. 

`<Styler>(<Object> || <Array> || <Function>(<Object>currentStyles) || <Styler> )`


# Styler Instance Methods

## map
Iterates over the keys of an object, applying the iteratee function to each, and returning a new object.

`<Styler>.map(<Function>(val, key))`

example: 
```
let mappedStyles = Styler.create({
    height: 100,
    width: 100
});

let result = mappedStyles.map(val => val - 50);
/*
{
    height: 50,
    width: 50
}
*/
```


## reduce
Reduces styles to an new object which is the accumulated result of running each element in originalStyleObject through a reduction function. The reduction function MUST return the accumulator.

`<Styler>.reduce(<Function>(accumulator, value, key, originalStyleObject))`

example:
```
let styles = Styler.create({
    height: 100,
    width: 100,
    backgroundColor: "orange"
});

let reduction = style.reduce((accumulator, val, key) => {
    if(typeof value === "number") {
        accumulator[key] = value;
    }
    return accumulator;
});
/*
{
    height: 100,
    width: 100
}
*/
```

## filter
Return an object with only those properties that pass the predicate return truthy for.

`<Styler>.filter(<Function>(val, key))`

```
let styler = Styler.create({
    height: 100,
    weight: 100,
    backgroundColor: "orange"
});

let filteredStyles = styler.filter((val, key) => Object.is(key, "backgroundColor"));
/*
{
    backgroundColor: "orange"    
}
*/
```

## merge
Return an object of all merged arguments. Has same behavior as arguments passed directly to into the styler instance as arguments.
Does not have a limit on arguments.

`<Styler.merge(<Object>||<Styler>||<Array>||<Function>)`

```
let styler = Styler.create({
    height: 100, 
    width: 100
});

let mergedStyles = styler.merge({backgroundColor: "orange"});
/*
{
    height: 100,
    width: 100,
    backgroundColor: "orange"
}
*/
```
## get
Returns an object with only properties that match the keys given in array that is passed as argument.
`<Styler>.get(<Array>)`

```
let styler = Styler.create({
    height: 100,
    width: 100,
    backgroundColor: "blue"
});

let gottenStyles = styler.get(["height", "width"]);
/*
{
    height: 100,
    width: 100
}
*/