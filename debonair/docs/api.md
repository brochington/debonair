# Styler Methods

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
