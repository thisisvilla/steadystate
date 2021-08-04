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

export const { todosReducer, useTodosState } = todosState
...
```

Thats it! The `createSteadyState()` function takes a 'camelCase' `key` and an
object representing initial state as it's arguments.

It returns an object with the following two items:

1. The reducer that you add to your Redux store using the same [key] defined, as
   shown below. _(This is automatically named based on the key provided, in the
   form of `[key]Reducer`. So, in this case, it would be `todosReducer`)._

    ```javascript
    //store.js
    import { configureStore } from '@reduxjs/toolkit'
    import { todosReducer } from './useTodos.js'

    export const store = configureStore({
        reducer: {
            todos: todosReducer, //[key]: reducer
        },
    })
    ```

2. It also returns a `use[Key]State` hook as the second item in the object,
   which returns your state and it's setters. _(This is also based on the
   provided key, and in this instance, it would be `useTodosState`)._

The newly returned `useTodosState()` hook would return an object that
destructures as follows:

```javascript
// useTodos.js
...
const { loading, items, setLoading, setItems } = useTodosState()
...
```

As you can see, it automatically generates the setters for your state! You could
just import that in your app where you want to use and set this global state,
but I prefer to make another hook that will be used throughout my app, to make
extending functionality easier! For example:

```javascript
// useTodos.js
...
export function useTodos() {
    const state = useTodosState()

    const resetTodos = () => {
        state.setLoading(false)
        state.setTodos([])
    }

    const addTodo = todo => {
        state.setItems([
            ...items,
            todo
        ])
        // persist to db
    }

    //...other stuff like delete todo, or whatever

    return {
        ...state,
        resetTodos,
        addTodo
    }
}
```

That's it! Just import the `useTodos()` hook anywhere in your app! No actions,
no reducers, no thunks or sagas! None of that stuff! All your business logic can
live in a hook, and if you need `async` stuff, just do it in the hook!

_All the awesomeness of Redux without all the hassle!_

Here's the example `useTodos.js` all together:

```javascript
// useTodos.js
import { createSteadyState } from 'steadystate'

const todosState = createSteadyState('todos', {
    loading: false,
    items: [],
})

export const { todosReducer, useTodosState } = todosState

export function useTodos() {
    const state = useTodosState()

    const resetTodos = () => {
        state.setLoading(false)
        state.setTodos([])
    }

    const addTodo = todo => {
        state.setItems([...items, todo])
    }

    //...other stuff like delete todo, or whatever

    return {
        ...state,
        resetTodos,
        addTodo,
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
![Console Logging](https://i.ibb.co/LYbkmRk/Screenshot-2021-07-28-at-11-22-03.png)

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
            <div id='app'>
                <Component {...pageProps} />
            </div>
        </Provider>
    )
}
```

Step 3 - Create Some State, using Steady State and React Hooks!

```javascript
// src/state/useUi.js
import { createSteadyState } from 'steadystate'
import { useEffect } from 'react'

const uiState = createSteadyState('ui', {
    loading: false,
    menuActive: false,
    isDragging: false,
    isTouch: null,
})

export const { uiReducer, useUiState } = uiState

export function useUi() {
    const state = useUiState()

    useEffect(() => {
        const isTouchScreen = 'ontouchstart' in document.documentElement

        if (isTouchScreen) return state.setIsTouch(true)

        return state.setIsTouch(false)
    }, [])

    useEffect(() => {
        if (state.menuActive) return (document.body.style.overflow = 'hidden')

        return (document.body.style.overflow = 'auto')
    }, [state.menuActive])

    return {
        ...state,
    }
}
```

Step 4 - Add your new reducer to the store using the same [key] defined earlier,
like this...

```javascript
// src/state/store.js
import { configureStore } from '@reduxjs/toolkit'
import { uiReducer } from 'state/useUi'

export const store = configureStore({
    reducer: {
        ui: uiReducer, //[key]: reducer
    },
})
```

Yay! Happy coding! :)
