
import * as React from 'react'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/scan'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import reactive from '../rx-component'

const Counter = reactive(props => {

    const increments = new Subject<void>()
    const nextIncrement = () => increments.next()

    const decrements = new Subject<void>()
    const nextDecrement = () => decrements.next()

    return Observable.merge(
        increments.mapTo(1),
        decrements.mapTo(-1)
    )
        .scan((count, change) => count + change)
        .map(count =>
            <div>
                {count}
                <button onClick={nextIncrement}>Increment</button>
                <button onClick={nextDecrement}>Decrement</button>
            </div>
        )
})
