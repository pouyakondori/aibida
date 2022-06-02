export const INITIALISE_STORE = state => {
    // Get possible menu stickiness from storage
    const menuIsStickyInStorage = localStorage.getItem('AIBIDIA_TM_MENU_STICKY')

    const menuIsSticky =
        menuIsStickyInStorage && JSON.parse(menuIsStickyInStorage)

    if (typeof menuIsSticky === 'boolean') {
        state.app.menuIsSticky = menuIsSticky
    }
}
