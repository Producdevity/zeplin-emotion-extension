import Color from 'zeplin-extension-style-kit/values/color'
import indent from './utils/indent'

const generateCode = rules => `
export default {
${rules.map(indent()).join(',\n')}
}`

const getHexValue = color => new Color(color).toStyleValue({colorFormat: 'hex'})

function styleguideColors(context, colors) {
    const colorRules = colors.map(color => `${color.name}: '${getHexValue(color)}'`)

    return {
        code: generateCode(colorRules),
        language: 'js',
    }
}

export default styleguideColors
