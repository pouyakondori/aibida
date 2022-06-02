<template>
    <div class="centered__404">
        <i class="far fa-compass is-size-1 is-purple-light" />
        <h1 class="not-found">
            404
        </h1>
        <p class="is-size-4">
            Oops! Page Not Found.
        </p>
    </div>
</template>

<style lang="scss" scoped>
@import '~@/assets/sass/color.scss';

.centered__404 {
    text-align: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    padding-top: 35vh;
}

.not-found {
    font-size: 90px;
    color: $purple;
}
</style>
