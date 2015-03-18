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
## filter
## merge