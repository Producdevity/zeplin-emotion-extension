import Layer from 'zeplin-extension-style-kit/elements/layer'
import Color from 'zeplin-extension-style-kit/values/color'
import TextStyle from 'zeplin-extension-style-kit/elements/textStyle'
import {getUniqueLayerTextStyles} from 'zeplin-extension-style-kit/utils'
import indent from './utils/indent'

function getVariableMap(projectColors) {
    return projectColors.reduce((variableMap, color) => {
        variableMap[new Color(color).valueOf()] = `$\{colors.${color.name}}`
        return variableMap
    }, {})
}

function filterDeclarations(declarations, textStyleMatch) {
    return declarations.filter(d => {
        if (
            textStyleMatch &&
            (d.name === 'font-size' ||
                d.name === 'font-family' ||
                d.name === 'letter-spacing' ||
                d.name === 'line-height')
        ) {
            return false
        }

        return !(d.hasDefaultValue && d.hasDefaultValue())
    })
}

const generateCode = rules => `
const Box = styled('div')\`
${rules.map(indent()).join('\n')}
\``

function declarationsToString(declarations, variableMap, textStyleMatch) {
    const filteredDeclarations = filterDeclarations(declarations, textStyleMatch)
    const textStyleMixins = textStyleMatch ? ['  ${typography.' + textStyleMatch.name + '};'] : []
    const rules = [
        ...textStyleMixins,
        ...filteredDeclarations.map(
            d => `${d.name}: ${d.getValue({densityDivisor: 1}, variableMap)};`,
        ),
    ]

    return generateCode(rules)
}

function layer(context, selectedLayer) {
    const layer = new Layer(selectedLayer)
    const {defaultTextStyle, type} = selectedLayer

    const isText = type === 'text' && defaultTextStyle

    const textStyleMatch = isText ? context.project.findTextStyleEqual(defaultTextStyle) : null

    if (isText) {
        layer.getLayerTextStyleDeclarations(defaultTextStyle).forEach(layer.style.addDeclaration)
    }

    const variableMap = getVariableMap(context.project.colors)
    const code = declarationsToString(layer.style.declarations, variableMap, textStyleMatch)

    return {
        code,
        language: 'js',
    }
}

export default layer
