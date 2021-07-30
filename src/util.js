export function toCamelCase(str) {
    const s =
        str &&
        str
            .match(
                /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
            )
            .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
            .join('')
    return s.slice(0, 1).toLowerCase() + s.slice(1)
}

export function handleLog(key, reducer, hook, state, actions) {
    const textStyle =
        'font-weight: bold; color: #BB8758; background: #F3F2EE; padding: 8px 16px; font-size: 14px;'
    const varStyle =
        'font-weight: bold; color: #F3F2EE; background: #617272; padding: 8px 16px; font-size: 14px;'
    const ctaStyle =
        'font-weight: bold; color: #B2604B; background: #F3F2EE; padding: 8px 16px; font-size: 14px;'

    console.log('%cSteady State created!', textStyle)

    console.log(`%cKey: %c${key}`, textStyle, varStyle)

    console.log(
        `%cVariables Created! %cexport const { ${reducer}, ${hook} } = ...`,
        textStyle,
        varStyle
    )
    console.log(
        `%c**Please add %c${key}: ${reducer} %cto your Redux Store reducers.**`,
        ctaStyle,
        varStyle,
        ctaStyle
    )
    console.log(
        `%cThe exposed %c${hook}() %chook returns the following state object:`,
        textStyle,
        varStyle,
        textStyle
    )
    console.log({
        ...state,
        ...actions,
    })
}
