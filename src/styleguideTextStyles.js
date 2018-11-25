import TextStyle from 'zeplin-extension-style-kit/elements/textStyle'
import indent from './utils/indent'

const filterDeclarations = declarations =>
    declarations.filter(
        declaration => !(declaration.hasDefaultValue && declaration.hasDefaultValue()),
    )

function declarationsToString(name, declarations) {
    const rules = filterDeclarations(declarations).map(
        declaration => `${declaration.name}: ${declaration.getValue({densityDivisor: 1}, {})};`,
    )

    return `
  ${name}: css\`
${rules.map(indent()).join('\n')}
  \``
}

const generateCode = rules => `
import {css} from 'emotion'

export default {${rules.join(',\n\n')}
}
`

function styleguideTextStyles(context, textStyles) {
    const textStyleRules = textStyles.map(textStyle =>
        declarationsToString(textStyle.name, new TextStyle(textStyle).style.declarations),
    )

    return {
        code: generateCode(textStyleRules),
        language: 'js',
    }
}

export default styleguideTextStyles
