# Steady State

by pseudo selector

![npm](https://img.shields.io/npm/dt/steadystate?color=%235A6B5F&label=downloads&style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/steadystate?color=%23BB8758&style=for-the-badge)

The easiest way to use Redux with React! All the awesomeness of Redux without
all the fuss!

```
#NPM
npm install steadystate
```

```
#YARN
yarn add steadystate
```

Steady State requires `Redux Toolkit` and `React-Redux`. _(Make sure you have
your Redux store and provider set up first. There are step-by-step instructions
on that further below)._

Once you have your Redux Store set up, creating global state with Steady State
is as easy as this:

```javascript
// useTodos.js
import { createSteadyState } from 'steadystate'

const todosState = createSteadyState('todos', {
    loading: false,
    items: [],
})

export const { todos, useTodosState, setTodosState } = todosState
...
```

Thats it! The `createSteadyState()` function takes a 'camelCase' `key` and an
object representing initial state as it's arguments.

It returns an object with the following three items:

1. The reducer that you add to your Redux store, which is the same as the [key]
   used as the first argument of `createSteadyState()`. In this case, it would
   be `todos`.

    ```javascript
    //store.js
    import { configureStore } from '@reduxjs/toolkit'

    import { todos } from './useTodos.js'

    export const store = configureStore({
        reducer: {
            todos,
        },
    })
    ```

2. A `use[Key]State()` hook, to be used for each piece of this state you would
   like to subscribe to. _(This is based on the provided key. In this instance
   it would be `useTodosState()`)._

```javascript
const loading = useTodosState('loading')
const items = useTodosState('items')
```

3. A `set[Key]State()` hook, which returns an object containing all the setters
   for your state. _(This is also based on the provided key. In this instance,
   it would be `setTodosState()`)._

```javascript
const { setLoading, setItems } = setTodosState()
```

As you can see, it automatically generates the setters for your state! You could
just import these in your app where you want to use and set this global state.
If you'd like to extend functionality, just make a hook! For example:

```javascript
// useTodos.js
...
export function useTodos() {
    const items = useTodosState('items')
    const loading = useTodosState('loading')

    const { setItems, setLoading } = setTodosState()

    const resetTodos = () => {
        setLoading(false)
        setTodos([])
    }

     const addTodo = async todo => {
        setItems([...items, todo])

        // 'await' your persist to db function here
    }

    const deleteTodo = async id => {
        const newItems = items.filter(item => item.id !== id)

        setItems(newItems)

        // 'await' your persist to db function here
    }

    //...other actions, like updateTodo or whatever, here

    return {
        items,
        loading,
        resetTodos,
        addTodo,
        deleteTodo
    }
}
```

That's it! Just import the `useTodos()` hook anywhere in your app! No actions,
no reducers, no thunks or sagas! None of that stuff! Just React Hooks! If you
need `async` stuff, just do it in a hook!

_All the awesomeness of Redux without all the hassle!_

Here's the example `useTodos.js` all together:

```javascript
// useTodos.js
import { createSteadyState } from 'steadystate'

const todosState = createSteadyState('todos', {
    loading: false,
    items: [],
})

export const { todosReducer, useTodosState, setTodosState } = todosState

export function useTodos() {
    const items = useTodosState('items')
    const loading = useTodosState('loading')

    const { setItems, setLoading } = setTodosState()

    const resetTodos = () => {
        setLoading(false)
        setTodos([])
    }

    const addTodo = async todo => {
        setItems([...items, todo])

        // 'await' your persist to db function here
    }

    const deleteTodo = async id => {
        const newItems = items.filter(item => item.id !== id)

        setItems(newItems)

        // 'await' your persist to db function here
    }

    //...other actions, like updateTodo or whatever, here

    return {
        items,
        loading,
        resetTodos,
        addTodo,
        deleteTodo,
    }
}
```

Pretty cool, eh? :)

Steady State will provide errors and suggested fixes in the console if your
`keys` are not `camelCase`, to enforce best practices.

_Extra Tip:_ By passing in `true` as the 3rd argument for `createSteadyState()`,
useful data will be logged to the console, as shown below:

```javascript
...
const authState = createSteadyState('auth', {
    auth: null,
    user: null,
    subscription: null,
    initialized: null,
}, true) //pass in 'true' here for logging!
...
```

and the console output will look like this:
![Console Logging](https://i.ibb.co/WFZ0dwT/Screenshot-2021-08-14-at-20-53-11.png)

;)

---

## Setting up your Redux Store:

If you haven't hooked up Redux before, make sure those packages are also
installed, and then follow along below:

```
#NPM
npm install @reduxjs/toolkit react-redux
```

```
#YARN
yarn add @reduxjs/toolkit react-redux
```

Step 1 - Create your Redux store...

```javascript
// src/state/store.js
import { configureStore } from '@reduxjs/toolkit'
export const store = configureStore({
    reducer: {
        //add reducers here
    },
})
```

Step 2 - Wrap the Redux Provider component around the root component of your
app. _In Next.js, that would be in the `_app.js` file, for example._

```javascript
// src/pages/_app.js
import { Provider } from 'react-redux'
import { store } from 'state/store'
export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}
```

Step 3 - Create Some State, using Steady State and React Hooks!

```javascript
// src/state/useUi.js
import { createSteadyState } from 'steadystate'

const uiState = createSteadyState('ui', {
    loading: false,
    menuActive: false,
    isDragging: false,
    isTouch: null,
    lang: 'en',
})

export const { ui, useUiState, setUiState } = uiState
```

Step 4 - Add your new reducer to your store, like this...

```javascript
// src/state/store.js
import { configureStore } from '@reduxjs/toolkit'

import { ui } from 'state/useUi'

export const store = configureStore({
    reducer: {
        ui,
    },
})
```

Yay! Happy coding! :)
