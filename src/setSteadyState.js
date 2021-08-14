import { useDispatch } from 'react-redux'

export function setSteadyState(actions) {
    const dispatch = useDispatch()

    const actionsArr = Object.keys(actions)

    const setters = actionsArr.reduce((obj, curr) => {
        const action = actions[curr]

        obj[curr] = data => dispatch(action(data))
        return obj
    }, {})

    return setters
}
