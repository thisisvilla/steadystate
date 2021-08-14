import { useSelector } from 'react-redux'

export function useSteadyState(stateKey, sliceKey) {
    return useSelector(state => state[stateKey][sliceKey])
}
