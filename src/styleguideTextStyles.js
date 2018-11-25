import TextStyle from 'zeplin-extension-style-kit/elements/textStyle'

const filterDeclarations = declarations =>
    declarations.filter(d => !(d.hasDefaultValue && d.hasDefaultValue()))

function declarationsToString(name, declarations) {
    const rules = filterDeclarations(declarations).map(
        d => `    ${d.name}: ${d.getValue({densityDivisor: 1}, {})};`,
    )

    return '  ' + name + ': css`\n' + rules.join('\n') + '\n  `'
}

function joinRules(rules) {
    return (
        "import { css } from 'styled-components'\n\nexport default {\n" +
        rules.join(',\n\n') +
        '\n}'
    )
}

function styleguideTextStyles(context, textStyles) {
    const textStyleRules = textStyles.map(textStyle => {
        const {style} = new TextStyle(textStyle)
        return declarationsToString(textStyle.name, style.declarations)
    })

    return {
        code: joinRules(textStyleRules),
        language: 'js',
    }
}

export default styleguideTextStyles
