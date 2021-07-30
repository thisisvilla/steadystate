import { createSlice } from '@reduxjs/toolkit'
import { useSteadyState } from './useSteadyState'
import { toCamelCase, handleLog } from './util'

export function createSteadyState(key, initialState = {}, log = false) {
    const camelCaseKey = toCamelCase(key)
    const uppercaseKey =
        camelCaseKey.charAt(0).toUpperCase() + camelCaseKey.slice(1)

    if (key !== camelCaseKey)
        console.error(
            `The provided key of '${key}' is not camelCase and should be changed to '${camelCaseKey}'. Please update your code.`
        )

    let stateArr = Object.keys(initialState)

    const reducerObj = stateArr.reduce((obj, curr) => {
        let camelCase = toCamelCase(curr)

        if (curr !== camelCase)
            console.error(
                `The provided key of '${curr}' is not camelCase and should be changed to '${camelCase}'. Please update your code.`
            )

        const uppercase = camelCase.charAt(0).toUpperCase() + camelCase.slice(1)

        obj[`set${uppercase}`] = (state, { payload }) => {
            if (state[camelCase] === payload) return
            state[camelCase] = payload
        }

        return obj
    }, {})

    const state = createSlice({
        name: camelCaseKey,
        initialState: initialState,
        reducers: reducerObj,
    })

    const reducerName = `${camelCaseKey}Reducer`
    const hookName = `use${uppercaseKey}State`

    if (log) {
        handleLog(
            camelCaseKey,
            reducerName,
            hookName,
            initialState,
            state.actions
        )
    }

    return {
        [reducerName]: state.reducer,
        [hookName]: () => useSteadyState(camelCaseKey, state.actions),
    }
}
