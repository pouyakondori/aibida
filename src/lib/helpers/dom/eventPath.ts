/**
 * Chrome Event does implement event.path, which other browsers might not.
 * Extend the Event interface to have better TypeScript typing support.
 */
interface ChromeEvent extends Event {
    path: EventTarget[]
}

/**
 * Builds element path for event. This polyfill is needed for cross-browser
 * support as not all browsers builds event path
 * @param event
 * @returns Element path for the event.
 */
export function eventPath(event: Event): EventTarget[] {
    // Either browser supports composedPath, event.path or neither
    const path =
        (event.composedPath && event.composedPath()) ||
        (event as ChromeEvent).path

    const target = event.target
    if (!target) {
        return []
    }

    // If path is assigned, browsers support natively
    if (path != null) {
        // Safari doesn't include Window, but it should.
        return path.indexOf(window) < 0 ? path.concat(window) : path
    }

    // Browser does not support event path, so we need to build it manually

    // If target is window, we just return the path
    if (target === window) {
        return [window]
    }

    function getParents(
        node: EventTarget,
        memo: EventTarget[] = []
    ): EventTarget[] {
        const parentElement = (node as Element).parentElement

        if (!parentElement) {
            return memo
        } else {
            return getParents(parentElement, memo.concat(parentElement))
        }
    }

    return [target].concat(getParents(target), window)
}
