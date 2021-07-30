import { useSelector, useDispatch } from 'react-redux'

export function useSteadyState(key, actions) {
    const dispatch = useDispatch()
    const state = useSelector(state => state[key])

    const actionsArr = Object.keys(actions)

    const setters = actionsArr.reduce((obj, curr) => {
        const action = actions[curr]

        obj[curr] = data => dispatch(action(data))
        return obj
    }, {})

    return {
        ...state,
        ...setters,
    }
}
