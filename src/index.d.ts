type TokenCallback = (
    errorDesc: string | null,
    token: string | null,
    error: any
) => void

declare module 'vue-adal' {
    export class AuthenticationContext {
        /**
         * Initiates the login process by redirecting the user to Azure AD authorization endpoint.
         */
        static login(): void

        logout(): void

        user: {
            profile: {
                oid: string
                iss: string
            }
        }

        isAuthenticated(): boolean

        /**
         * Acquires token (interactive flow using a redirect) by sending request to AAD to obtain a new token. In this case the callback passed in the authentication request constructor will be called.
         * @param resource Resource URI identifying the target resource.
         * @param extraQueryParameters Query parameters to add to the authentication request.
         * @param claims Claims to add to the authentication request.
         */
        static acquireTokenRedirect(
            resource: string,
            extraQueryParameters?: string | null,
            claims?: string | null
        ): void

        /**
         * Acquires token from the cache if it is not expired. Otherwise sends request to AAD to obtain a new token.
         * @param resource Resource URI identifying the target resource.
         * @param callback The callback provided by the caller. It will be called with token or error.
         */
        static acquireToken(resource: string, callback: TokenCallback): void
    }
}

// declaration.d.ts
declare module '*.scss' {
    const content: { [className: string]: string }
    export default content
}
