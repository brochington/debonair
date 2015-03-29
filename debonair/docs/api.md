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
  - [forIn](#forin)
  - [update](#update)
- [Styler Object](#styler-object)
- [Styler Object Methods](#styler-object-methods)
  - [toStyler](#tostyler)

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
// {height: 100, width: 100}
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
{
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
{
    height: 100,
    width: 100,
    backgroundColor: "blue"
}
*/
```

- Functions

It's important to note that the styles object passed into the function when it is called is a StylerObject. This means that you can call most Styler methods on it if needed. 

```
let standardBox = Styler.create({
    height: 100,
    width: 100
});

let expandBox = currentStyles => {
    return currentStyles.map(val => val + 100);
};

let biggerBox = Styler.create(standardBox, expandBox);

biggerBox();
/*
{
    height: 200,
    width: 200
}
*/
```



# Styler Instance
Return an object suitable for use in the style property of react components. Accepts an indeterminate number of arguments. Output is the merged result of all arguments. Merge order is Left to right. 

`<Styler>(<Object> || <Array> || <Function>(<Object>currentStyles) || <Styler> )`


# Styler Instance Methods

Styler Instance Methods can be chained
```
let styler = Styler.create({
    height: 100,
    width: 100,
    backgroundColor: "blue" 
});

let resizedBox = styler.filter((val, key) => typeof val === "number")
                       .map(val => val + 100);

/*
{
    height: 200,
    width: 200
}
*/
```

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
```
## forIn
Call the iteratee function for each key/value pair, and returns the unaltered style object.

`<Styler>.forIn(<Function>(value, key))`

```
let styler = Styler.create({
    height: 100,
    width: 200
});

let propCount = 0;

let styles = styler.forIn(() => propCount++));
/*
propCount === 2;
*/
```

## update
Returns a new object comprised of the the current styles, and updates the values of styles matching those
on objects passed as arguments. Arguments will be evaluated my an internal merge function, which makes any arguments types that may be passed into a styler instance valid. If an object that is passed as an argument has a property that has a value of null, then the property will NOT be added to the returned object.

`<Styler>.update(<Object> || <Array> || <Function>(<Object>currentStyles) || <Styler> )`

```
let styler = styler.create({
    height: 100, 
    width: 100,
    backgroundColor: "blue"
});

let updatedStyles = styler.update({height: 125}, {backgroundColor: null});
/*
{
    height: 125, 
    width: 100
}
*/
```

# Styler Object

A Styler Object is the type of object that is returned whenever you evaluate a Styler. It shares many
of the same methods as Stylers, such as map, reduce, etc, and will always return a new instance of a Styler Object. You may also create a Styler Object without first creating and calling a Styler in the following manner:

```
import { StylerObject } from "debonair";

let myStyleObject = new StylerObject({color: "blue"});
```

Right now a StylerObject will only accept a single object as an argument. If you would like to pass arguments into a stylerObject in the same manner as you would a Styler, use the merge method. 


# Styler Object Methods

The following Styler Methods are the same as on the Styler Object Methods: 

`map, reduce, filter, get, forIn, merge, update`

## toStyler 
Convert the output of a styler directly into a new Styler. It is important to note that this method
returns a functor that must be evaluated if used directly in the style prop of a React component.

`<StylerObject>.toStyler()`

```
let styler = Styler.create({
    height: 100,
    width: 100,
});

let newstyler = styler.map((val, key) => Object.is(key, "height") ? val + 100 : val).toStyler();

newStyler();
/*
{
height: 200,
width: 100
}
*/
```