<template>
    <div
        v-if="scrollable"
        class="a-scroll-wrapper"
    >
        <div
            class="a-scroll"
            @scroll="$event => $emit('scroll', $event)"
        >
            <div
                class="a-content"
                :class="contentClass"
            >
                <slot />
            </div>
        </div>
    </div>
    <div
        v-else
        class="a-content"
        :class="contentClass"
    >
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Props {
    /** Should we shrink flex-shrink:1? */
    shrink: boolean | number
    /** Should we grow flex-grow:1? */
    grow: boolean | number
    /** Should we add default padding? */
    pad: boolean
    /** Should we add default margin? */
    margin: boolean
    /** If the content should be scrollable */
    scrollable: boolean
    /** Align Vertically */
    alignVertically: string
    /** Align Horizontally */
    alignHorizontally: string
}

interface ContentClasses {
    /** flex grow: 1 */
    fg1?: boolean
    /** flex grow: 2 */
    fg2?: boolean
    /** flex grow: 3 */
    fg3?: boolean
    /** flex grow: 4 */
    fg4?: boolean
    /** flex grow: 5 */
    fg5?: boolean
    /** flex grow: 6 */
    fg6?: boolean
    /** flex shrink: 1 */
    fs1?: boolean
    /** flex shrink: 2 */
    fs2?: boolean
    /** flex shrink: 3 */
    fs3?: boolean
    /** flex shrink: 4 */
    fs4?: boolean
    /** flex shrink: 5 */
    fs5?: boolean
    /** flex shrink: 6 */
    fs6?: boolean
    /** Add default padding to content */
    pad?: boolean
    /** Add default margin to content */
    mrg?: boolean
    /** Align Vertically center */
    avc?: boolean
    /** Align Vertically bottom */
    avb?: boolean
    /** Align Horizontally right */
    ahr?: boolean
    /** Align Horizontally center */
    ahc?: boolean
}

interface Computed {
    /** Calculated Content classes */
    contentClass: ContentClasses
}

/**
 * Vue Component to display regular typography content.
 * AibidiaContent is typically used to display textual content, with minimal markup.
 * This allows developers to add marked text to UI without having to worry about spacing/margins/sizes.
 *
 * There are some helper props to quickly alter the behaviour of the content in flex-box layouts.
 *
 * Currently supported tags;
 * <h1-6>
 * <p>
 * <ul/ol>
 */
export default Vue.extend<void, void, Computed, Props>({
    name: 'AibidiaContent',

    props: {
        grow: {
            type: [Boolean, Number],
            default: false,
        },
        shrink: {
            type: [Boolean, Number],
            default: false,
        },
        pad: {
            type: Boolean,
            default: false,
        },
        margin: {
            type: Boolean,
            default: false,
        },
        scrollable: {
            type: Boolean,
            default: false,
        },
        alignVertically: {
            type: String,
            default: 'top',
        },
        alignHorizontally: {
            type: String,
            default: 'left',
        },
    },

    computed: {
        contentClass() {
            const cls: ContentClasses = {
                fg1: this.grow === true || this.grow === 1,
                fg2: this.grow === 2,
                fg3: this.grow === 3,
                fg4: this.grow === 4,
                fg5: this.grow === 5,
                fg6: this.grow === 6,
                fs1: this.shrink === true || this.shrink === 1,
                fs2: this.shrink === 2,
                fs3: this.shrink === 3,
                fs4: this.shrink === 4,
                fs5: this.shrink === 5,
                fs6: this.shrink === 6,
                avc: this.alignVertically == 'center',
                avb: this.alignVertically == 'bottom',
                ahc: this.alignHorizontally == 'center',
                ahr: this.alignHorizontally == 'right',
                pad: this.pad,
                mrg: this.margin,
            }

            return cls
        },
    },
})
</script>

<style lang="scss">
.a-content {
    /** Default styles */

    > p:not(:last-child) {
        padding-bottom: 0.6em;
    }

    > h1 {
        font-size: 1.25rem;
        &:not(:first-child) {
            margin-top: 0.6em;
        }
        margin-bottom: 1.1rem;
        padding-bottom: 0;
    }

    > h2 {
        font-size: 1.1rem;
        &:not(:first-child) {
            margin-top: 0.5em;
        }
        padding-bottom: 0;
    }

    > h3 {
        font-size: 1rem;
        &:not(:first-child) {
            margin-top: 0.4em;
        }
        padding-bottom: 0;
    }

    > h4 {
        font-size: 0.9rem;
        &:not(:first-child) {
            margin-top: 0.8em;
        }
        margin-bottom: 0.2em;
        padding-bottom: 0;
    }

    > h5 {
        font-size: 0.75rem;
        font-weight: 700;
        &:not(:first-child) {
            margin-top: 0.2em;
        }
        padding-bottom: 0.3em;
    }

    > ul,
    > ol {
        padding-left: 3em;
    }

    > ul {
        list-style-type: circle;
    }

    &.fg1 {
        flex-grow: 1;
    }

    &.fg2 {
        flex-grow: 2;
    }

    &.fg3 {
        flex-grow: 3;
    }

    &.fg4 {
        flex-grow: 4;
    }

    &.fg5 {
        flex-grow: 5;
    }

    &.fg6 {
        flex-grow: 6;
    }

    &.fs1 {
        flex-shrink: 1;
    }

    &.fs2 {
        flex-shrink: 2;
    }

    &.fs3 {
        flex-shrink: 3;
    }

    &.fs4 {
        flex-shrink: 4;
    }

    &.fs5 {
        flex-shrink: 5;
    }

    &.fs6 {
        flex-shrink: 6;
    }

    &.pad {
        padding: 1em;
    }

    &.mrg {
        margin: 0.6em;
    }

    &.avc {
        align-self: center;
    }
    &.avb {
        align-self: flex-end;
    }

    &.ahc {
        justify-content: center;
    }
    &.ahr {
        justify-content: flex-end;
    }
}
</style>
