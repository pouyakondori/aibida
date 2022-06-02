import Handsontable from 'handsontable'
import { eventPath } from 'lib/helpers'
/**
 * Checks if all classes in targetClassList are found in classList.
 *
 * @param {Array<string>} targetClassList
 * @param {DOMTokenList} classList
 * @returns {boolean}
 */
function targetsExist(targetClassList, classList) {
    if (!classList) {
        return true
    }

    return targetClassList.every(cls => classList.contains(cls))
}

/**
 * Create event handlers needed to open and close the hoverbox
 *
 * @param {Element} element The container element within the handlers are needed
 * @param {Function} showCallback Function to be executed when hoverbox is going to be shown
 * @param {Function} hideCallback Function to be executed when hoverbox is going to be hidden
 * @param {string} targetClassName Class name or names used to identify the correct event target
 */
export function createEventHandlers(
    element,
    showCallback,
    hideCallback,
    targetClassName
) {
    const targetClasses = targetClassName.split(' ')

    Handsontable.dom.addEvent(element, 'mouseover', function (event) {
        const path = eventPath(event)
        const td = path.find(
            elem =>
                elem.nodeName === 'TD' ||
                elem.className?.indexOf('aibidia-hot-cell-hover') > -1
        )

        if (td && targetsExist(targetClasses, td.classList)) {
            const value = event.target.innerText
            showCallback(event, value)
        }
    })

    Handsontable.dom.addEvent(element, 'mouseout', function (event) {
        const path = eventPath(event)
        const td = path.find(
            elem =>
                elem.nodeName === 'TD' ||
                elem.className?.indexOf('aibidia-hot-cell-hover') > -1
        )

        if (td && targetsExist(targetClasses, td.classList)) {
            hideCallback(event)
        }
    })
}
