/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */
import comment from './comment'
import layer from './layer'
import styleguideColors from './styleguideColors'
import styleguideTextStyles from './styleguideTextStyles'

function exportStyleguideColors(context, colors) {}

function exportStyleguideTextStyles(context, textStyles) {}

export default {
    comment,
    layer,
    styleguideColors,
    styleguideTextStyles,
    exportStyleguideColors,
    exportStyleguideTextStyles,
}
