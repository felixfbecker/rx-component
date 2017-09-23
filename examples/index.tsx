import * as React from 'react'
import { render } from 'react-dom'
import { Counter } from './Counter'

const Examples = () => (
    <div className='container'>
        <h1 className='mt-4'>rx-component examples</h1>
        <div className='card mt-4'>
            <div className='card-header d-flex'>
                Counter
                <span className='ml-auto'>
                    <a href='https://github.com/felixfbecker/rx-component/blob/master/examples/Counter.tsx'>Source</a>
                </span>
            </div>
            <div className='card-body'>
                <Counter />
            </div>
        </div>
    </div>
)

window.addEventListener('DOMContentLoaded', () => {
    render(<Examples />, document.body.appendChild(document.createElement('div')))
})
