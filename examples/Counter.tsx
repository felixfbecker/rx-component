
import * as React from 'react'
import { Subject } from 'rxjs'
import { merge } from 'rxjs'
import { map, mapTo, scan, startWith, tap } from 'rxjs/operators'
import reactive from '../rx-component'

// This is one of the most simple examples of a "stateful" component

export const Counter = reactive(props => {

    // We have a set of events (increment, decrement) that need to result in a different value,
    // where the new value is dependent on the previous

    const increments = new Subject<void>()
    const nextIncrement = () => increments.next()

    const decrements = new Subject<void>()
    const nextDecrement = () => decrements.next()

    // We want the view to update every time a button is clicked, so this is the start of our chain
    return merge(
        // We represents increment and decrement events as the change to apply compared to the previous state,
        // For this simple Counter example, that is simply the difference to the previous value
        increments.pipe(mapTo(1)),
        decrements.pipe(mapTo(-1))
    )
        // Start with a noop change to render the initial value
        .pipe(
            startWith(0),
            // Always combine one value and a change to produce a new value
            // The initial value will be 0
            scan((count, change) => count + change, 0),
            // And finally map each new value to a rendered view
            tap(count => console.log('render', count)),
            map(count => (
                <div>
                    <p>{count}</p>
                    <button className='btn btn-primary' onClick={nextDecrement}>-</button>&nbsp;
                    <button className='btn btn-primary' onClick={nextIncrement}>+</button>
                </div>
            ))
        )
})
