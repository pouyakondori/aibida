import { isEmpty } from './isEmpty'

/**
 * Does the given cookie name exist?
 * @param name Name of the cookie to search for
 */
export function cookieExists(name: string): boolean {
    return !isEmpty(
        document.cookie.match(RegExp(`^(.*;)?\\s*${name}\\s*=\\s*[^;]+(.*)?$`))
    )
}

/**
 * Valid values for the SameSite attribute of cookies.
 */
export enum SameSite {
    /**
     * Cookie is sent only to the same URL as the one that originated it, with an exception for when the user navigates to a URL from an external site, such as by following a link.
     */
    Lax,
    /**
     * No restrictions on cross-site requests.
     */
    None,
    /**
     * Cookie is sent only to the same URL as the one that originated it.
     */
    Strict,
}

/**
 *
 * @param name Name of the cookie to set
 * @param value Value of the cookie to set
 * @param ttl Max age of the cookie in seconds
 * @param secure A cookie with the Secure attribute is sent to the server only with an encrypted request over the HTTPS protocol, never with unsecured HTTP
 * @param sameSite The SameSite attribute lets servers require that a cookie shouldn't be sent with cross-origin requests (where Site is defined by the registrable domain), which provides some protection against cross-site request forgery attacks (CSRF).
 * @param domain The domain name to be set for the cookie.
 * @param path The path to be set for the cookie.
 */
export function setCookie(
    name: string,
    value: string | number,
    ttl: number,
    secure?: boolean,
    sameSite?: SameSite,
    domain?: string,
    path?: string
): void {
    let cookieString = `${name}=${value}; max-age=${ttl}`

    if (secure) {
        cookieString += '; Secure'
    }

    cookieString += '; SameSite='
    switch (sameSite) {
        case SameSite.Lax:
            cookieString += 'Lax'
            break
        case SameSite.None:
            cookieString += 'None'
            break
        case SameSite.Strict:
            cookieString += 'Strict'
            break
        default:
            // None used to be the default value, but recent browser
            // versions made Lax the default value
            cookieString += 'Lax'
            break
    }

    if (domain) {
        cookieString += ';domain=' + domain
    }

    if (path) {
        cookieString += ';path=' + path
    }

    document.cookie = cookieString
}

export function removeCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}
