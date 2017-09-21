
import * as React from 'react'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { Subscription } from 'rxjs/Subscription'

/**
 * Creates a reactive component.
 *
 * A reactive component does not have any mutable state. It receives a single Observable of Prop
 * updates and is expected to return an Observable of an JSX element to be rendered. The Observable
 * is unsubscribed from on component unmount. Any "state" in between is completely managed by using
 * `scan()` on Props updates or other events. Emitting a new JSX element will caused a force
 * rerender, the component will never update without the Observable emitting a new element. Unneeded
 * rerenders are ensured by the Observable factory through e.g. `distinctUntilChanged()`.
 *
 * @param createObservable The factory that creates the render pipeline. Gets passed an Observable of Prop updates.
 * @return A React component class
 */
export default function reactive<P = {}>(createObservable: (props: Observable<P>) => Observable<JSX.Element | null>): (new () => React.Component<P, {}>) {
    return class extends React.Component<P, {}> {

        /** The current element to be rendered */
        private renderedElement: JSX.Element | null = null

        /** Emits on `componentWillReceiveProps` */
        private propsUpdates: Subject<P>

        /** Subscription to the Observable */
        private subscription: Subscription

        public static displayName = createObservable.name

        constructor(props: P) {
            super(props)
            this.subscription = createObservable(this.propsUpdates.asObservable()).subscribe(renderedElement => {
                this.renderedElement = renderedElement
                this.forceUpdate()
            })
        }

        public componentWillUnmount(): void {
            this.subscription.unsubscribe()
        }

        public componentWillReceiveProps(newProps: P): void {
            this.propsUpdates.next(newProps)
        }

        public shouldComponentUpdate(): boolean {
            // Always return false so React never rerenders automatically when Props or State changes
            // We do that explcitely when the Observable emits a new element to be rendered
            return false
        }

        public render(): JSX.Element | null {
            // Always render the current element to be rendered
            return this.renderedElement
        }
    } as any
}
