# Steady State

by villa

![npm](https://img.shields.io/npm/dt/steadystate?color=%235A6B5F&label=downloads&style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/steadystate?color=%23BB8758&style=for-the-badge)

The easiest way to use Redux with React! All the awesomeness of Redux without
all the fuss!

```
#NPM
npm install steadystate

#YARN
yarn add steadystate
```

Steady State requires `Redux Toolkit` and `React-Redux`. _(Make sure you have
your Redux store and provider set up first. There are step-by-step instructions
on that further below)._

## Basic Usage

Once you have your Redux Store set up, creating global state with Steady State
is as easy as this:

```javascript
// todos.js
import { createSteadyState } from 'steadystate'

const todosState = createSteadyState({
    key: 'todos',
    initialState: {
        loading: false,
        items: [],
    },
})

export const { todos, useTodosState, setTodosState } = todosState
```

Thats it! The `createSteadyState({...})` function accepts an object with a
'camelCase' `key`, an object representing `initialState`, and does the rest for
you!

---

The returned value of `createSteadyState({...})` is an object containing the
following three items:

1. **The reducer you add to your Redux store**. This is the same as the `key`
   value. _In this case, it would be `todos`._ Add this to your Redux store like
   so:

    ```javascript
    //store.js
    import { configureStore } from '@reduxjs/toolkit'

    import { todos } from './todos'

    export const store = configureStore({
        reducer: {
            todos,
        },
    })
    ```

2. **A `use[Key]State()` hook** - to be used for each piece of this state you
   would like to subscribe to. _In this case it would be `useTodosState()`._

    ```javascript
    const loading = useTodosState('loading')
    const items = useTodosState('items')
    ```

3. **A `set[Key]State()` hook** - which returns an object containing all of the
   setters for your state, as well as a `reset[Key]` function for returning
   state to `initialState`. _In this case, the hook would be `setTodosState()`._

    ```javascript
    const { setLoading, setItems, resetTodos } = setTodosState()
    ```

As you can see, Steady State automatically generates the setters and a reset for
your state! You can just import these hooks wherever you'd like to use & set
this global state!

---

## Advanced Usage

If you would like to extend functionality, `createSteadyState({...})` also
accepts an `actions` key where you can add or overwrite actions using standard
Redux Toolkit reducers, like so:

```javascript
// todos.js
import { createSteadyState } from 'steadystate'

const initialState = {
    loading: false,
    items: [],
}

const actions = {
    addTodo: (state, { payload }) => {
        state.items.push(payload)
    },
    deleteTodo: (state, { payload }) => {
        state.items = state.items.filter(item => item.id !== payload.id)
    },
    updateTodo: (state, { payload }) => {
        const removed = state.items.filter(item => item.id !== payload.id)

        state.items = [...removed, payload]
    },
}

const todosState = createSteadyState({ key: 'todos', initialState, actions })

export const { todos, useTodosState, setTodosState } = todosState
```

Pretty cool, eh? :)

_All the awesomeness of Redux without all the hassle!_

---

## Logs

By passing `log: true` into `createSteadyState({...})`, useful data will be
logged to the console, as shown below:

```javascript
// auth.js
import { createSteadyState } from 'steadystate'

const initialState = {
    auth: null,
    user: null,
    subscription: null,
    initialized: null,
}

const authState = createSteadyState({ key: 'auth', initialState, log: true })

export const { auth, useAuthState, setAuthState } = authState
```

and the console output will look like this:
![Console Logging](https://i.ibb.co/WFZ0dwT/Screenshot-2021-08-14-at-20-53-11.png)

;)

Steady State will also provide errors and suggested fixes in the console if your
`keys` are not `camelCase`, to enforce best practices.

---

## Setting up your Redux Store:

If you haven't hooked up Redux before, make sure those packages are also
installed, and then follow along below:

```
#NPM
npm install @reduxjs/toolkit react-redux

#YARN
yarn add @reduxjs/toolkit react-redux
```

**Step 1 - Create your Redux store**

```javascript
// src/state/store.js
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        //add reducers here
    },
})
```

**Step 2 - Wrap the Redux Provider component around the root component of your
app.** _In Next.js, that would be in the `_app.js` file, for example._

```javascript
// src/pages/_app.js
import { Provider } from 'react-redux'
import { store } from '../state/store'

export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}
```

**Step 3 - Create Some State, using Steady State!**

```javascript
// src/state/ui.js
import { createSteadyState } from 'steadystate'

const initialState = {
    loading: false,
    menuActive: false,
    isDragging: false,
    isTouch: null,
    lang: 'en',
}

const uiState = createSteadyState({ key: 'ui', initialState })

export const { ui, useUiState, setUiState } = uiState
```

**Step 4 - Add your new reducer to your store, like this...**

```javascript
// src/state/store.js
import { configureStore } from '@reduxjs/toolkit'

import { todos } from './todos'
import { ui } from './ui'

export const store = configureStore({
    reducer: {
        todos,
        ui,
    },
})
```

Yay! Happy coding! :)

---
