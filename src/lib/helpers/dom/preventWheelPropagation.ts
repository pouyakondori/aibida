/**
 * Adds scrolling to mouse wheel event
 * @param elem Element we want to have scroll
 */
export function preventWheelPropagation(elem: Element): void {
    elem.addEventListener(
        'wheel',
        (e: Event) => {
            e.stopPropagation()
        },
        { passive: false }
    )
}
