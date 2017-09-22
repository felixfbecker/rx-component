
# Functional, Reactive React Components

> Look ma, no state!

[![npm](https://img.shields.io/npm/v/rx-component.svg)](https://npmjs.com/package/rx-component)
[![Build Status](https://travis-ci.org/felixfbecker/rx-component.svg?branch=master)](https://travis-ci.org/felixfbecker/rx-component)
[![npm](https://img.shields.io/npm/l/rx-component.svg)](https://github.com/felixfbecker/rx-component/blob/master/LICENSE.txt)

## Why?

React has a way to define components as a function Props → λ → JSX Element.
The problem is, it doesn't work for any type of advanced component that needs to do asynchronous requests, handle events etc.
Coincidently, these types of componets are the ones that would benefit the _most_ from a functional definition instead of `setState()` everywhere.
It _is_ possible to achieve that with RxJS, but you have to use the React class syntax, which means you still need state in your component to tell the `render()` method what to render, need to manage subscriptions, convert React lifecycle hooks in cumbersome ways.

`rx-component` allows you to express your component as that single, functional render pipeline Props → λ → JSX Element while still being able to do asynchronous requests, handle events, everything you can do with React class syntax.
No mutable state to manage, no bugs with asynchronous `setState`, clear data flow. You have full control over when to render, without having to implement any class methods.

## Example

```js
import reactive from 'rx-component'
import { Subject } from 'rxjs'

export const Counter = reactive(() => {

    const increments = new Subject()
    const nextIncrement = e => increments.next(e)

    const decrements = new Subject()
    const nextDecrement = e => decrements.next(e)

    return Observable.merge(
        increments.mapTo(1),
        decrements.mapTo(-1)
    )
        .startWith(0)
        .scan((count, change) => count + change, 0)
        .map(count =>
            <div>
                {count}
                <button onClick={nextIncrement}>Increment</button>
                <button onClick={nextDecrement}>Decrement</button>
            </div>
        )
})
```

## Comparison to other libraries
 
 - [`xreact`](https://www.npmjs.com/package/xreact) Not plain RxJS, introduces more complex concepts like "intents"
 - [`react-rx-component`](https://www.npmjs.com/package/react-rx-component) Only maps Props → State and separates the render.
 - [`rx-react`](https://www.npmjs.com/package/rx-react) Allows you to define your state with rxjs with `getStateStream()`, but not get rid of state completely.
 - [`react-rx`](https://www.npmjs.com/package/react-rxjs) Requires you to create external stores
 - [`reaxjs`](https://www.npmjs.com/package/reaxjs) More complex, takes `eventToValues`, `observablesFactory` and `PureComponent`
