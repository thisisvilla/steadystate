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

export function handleLog(
    key,
    reducer,
    useStateHook,
    setStateHook,
    initialState,
    actions
) {
    const textStyle =
        'font-weight: bold; color: #BB8758; background: #F3F2EE; padding: 8px 16px; font-size: 12px;'
    const varStyle =
        'font-weight: bold; color: #F3F2EE; background: #617272; padding: 8px 16px; font-size: 12px;'
    const ctaStyle =
        'font-weight: bold; color: #B2604B; background: #F3F2EE; padding: 8px 16px; font-size: 12px;'

    console.log('%cSteady State created!', textStyle)

    console.log(`%cKey: %c${key}`, textStyle, varStyle)

    console.log(
        `%cVariables Created! %cexport const { ${reducer}, ${useStateHook}, ${setStateHook} } = ...`,
        textStyle,
        varStyle
    )
    console.log(
        `%c**Please add %c${reducer} %cto your Redux Store reducers.**`,
        ctaStyle,
        varStyle,
        ctaStyle
    )
    console.log(
        `%cThe exposed %c${useStateHook}() %chook should be used for each piece of %c${key} %cstate you'd like to subscribe to, like so: %cconst ${
            Object.keys(initialState)[0]
        } = ${useStateHook}('${Object.keys(initialState)[0]}')`,
        textStyle,
        varStyle,
        textStyle,
        varStyle,
        textStyle,
        varStyle
    )
    console.log(
        `%cThe exposed %c${setStateHook}() %chook returns the following state setters object:`,
        textStyle,
        varStyle,
        textStyle
    )
    console.log({
        ...actions,
    })
}
