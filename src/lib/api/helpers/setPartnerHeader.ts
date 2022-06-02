/**
 * Injects Partner Id from local storage to header object
 * @param headers Object of HTTP request header
 * @returns Headers with injected Partner Id or just original header if Partner Id was not found in local storage
 */
export function setPartnerHeader(
    headers: Record<string, string>
): Record<string, string> {
    const partnerInStorage = localStorage.getItem('AIBIDIA_TM_PARTNER')
    const partner = partnerInStorage && JSON.parse(partnerInStorage)

    if (partner) {
        return {
            ...headers,
            'Aibidia-Partner-DatabaseId': partner.TenantDatabaseId,
        }
    }

    return headers
}
