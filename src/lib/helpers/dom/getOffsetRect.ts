import type { OffsetRect } from 'types/OffsetRect'

/**
 * Returns DOM element's top and left coordinates, and element's width and height
 * @param elem Element we're measuring
 */

export function getOffsetRect(elem: Element): OffsetRect {
    const box = elem.getBoundingClientRect()

    const body = document.body
    const docElem = document.documentElement

    const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    const scrollLeft =
        window.pageXOffset || docElem.scrollLeft || body.scrollLeft

    const clientTop = docElem.clientTop || body.clientTop || 0
    const clientLeft = docElem.clientLeft || body.clientLeft || 0

    const top = box.top + scrollTop - clientTop
    const left = box.left + scrollLeft - clientLeft

    return {
        top: top,
        left: left,
        width: box.width,
        height: box.height,
    }
}
