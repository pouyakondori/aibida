<template>
    <div
        v-if="!simpleContent"
        class="a-pane"
        :class="paneClass"
        @click="$event => $emit('click', $event)"
        @mouseover="$event => $emit('mouseover', $event)"
        @mouseleave="$event => $emit('mouseleave', $event)"
    >
        <div
            v-if="$slots.tabs"
            class="a-pane-tabs"
        >
            <slot name="tabs" />
        </div>
        <slot name="theheader">
            <div
                v-if="$slots.header"
                class="a-header"
            >
                <slot name="header" />
            </div>
        </slot>
        <slot name="content">
            <a-content
                :scrollable="scrollable"
                :pad="padContent"
                @scroll="$event => $emit('scroll', $event)"
            >
                <slot />
            </a-content>
        </slot>
        <div
            v-if="$slots.footer"
            class="a-footer"
        >
            <slot name="footer" />
        </div>
        <slot name="overlay" />
        <slot name="loader">
            <a-loader
                :active="loading"
            ></a-loader>
        </slot>
    </div>
    <div
        v-else
        class="a-pane a-content"
        :class="paneClass"
        @click="$event => $emit('click', $event)"
        @mouseover="$event => $emit('mouseover', $event)"
        @mouseleave="$event => $emit('mouseleave', $event)"
    >
        <div
            v-if="$slots.tabs"
            class="a-pane-tabs"
        >
            <slot name="tabs" />
        </div>
        <slot />
        <slot name="overlay" />
        <slot name="loader">
            <a-loader
                v-if="hasLoader"
                :active="loading"
            ></a-loader>
        </slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Props {
    /** Do we add card to the Pane */
    hasLoader: boolean
    /** If we are loading this pane */
    loading: boolean
    /** If the content should be scrollable */
    scrollable: boolean
    /** If the layout should be rows */
    rows: boolean
    /** If the layout should be columns */
    columns: boolean
    /** If the layout should be grid */
    grid: boolean
    /** If the layout should be similar to a card in regards of padding and margins*/
    card: boolean
    /** Is there border around the pane */
    bordered: boolean
    /** How deep the shadow effect should be? 0-9. Default is 0. */
    depth: number
    /** How much this can grow? 0-4. Default null (no grow) flex-grow: N */
    grow: number | null
    /** How much this can shrink? 0-4. Default null (no shrink) flex-shrink: N */
    shrink: number | null
    /** What color of background should the pane have? */
    background: string
    /** Do we add content padding? Card has default content padding, otherwise default is false */
    contentPadding: boolean | null
    /** Do we separate content child elements? default is false */
    contentSeparation: boolean
    /** Do we grow content automatically to fill the necessary size? flex-grow: 1 */
    contentGrow: boolean
    /** Content flex justification? justify-content:  */
    justifyContent:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
    /** Items flex alignment? align-content:  */
    alignItems: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
    /** Do we wrap items automatically to if space is not enough? flex-wrap: wrap */
    wrapItems: boolean
    /** Do we show debug information */
    debug: boolean
}

interface PaneClasses {
    background?: boolean
    white?: boolean
    pad?: boolean
    debug?: boolean
    separate?: boolean
    'pane-scrollable'?: boolean
    'pane-rows'?: boolean
    'pane-columns'?: boolean
    'pane-grid'?: boolean
    'pane-card'?: boolean
    'pane-bordered'?: boolean
    'pane-has-tabs'?: boolean
    'depth-8'?: boolean
    'content-grow'?: boolean
    'flex-grow-0'?: boolean
    'flex-grow-1'?: boolean
    'flex-grow-2'?: boolean
    'flex-grow-3'?: boolean
    'flex-grow-4'?: boolean
    'flex-shrink-0'?: boolean
    'flex-shrink-1'?: boolean
    'flex-shrink-2'?: boolean
    'flex-shrink-3'?: boolean
    'flex-shrink-4'?: boolean
    'flex-wrap'?: boolean
    // Flex Justifying classes
    'flex-jcs'?: boolean
    'flex-jce'?: boolean
    'flex-jcc'?: boolean
    'flex-jcsb'?: boolean
    'flex-jcsa'?: boolean
    'flex-jcse'?: boolean

    // Flex Align classes
    'flex-ais'?: boolean
    'flex-aie'?: boolean
    'flex-aic'?: boolean
    'flex-aib'?: boolean
    'flex-aist'?: boolean
}

interface Computed {
    /** Calculated Pane classes */
    paneClass: PaneClasses
    /** Does Pane have tabs? */
    hasTabs: boolean
    /** Do we pad content? */
    padContent: boolean
    /** Do we build more complex layout */
    simpleContent: boolean
}

/**
 * This is the default layout component, which can be used similar to flex-box layout in CSS.
 *
 * Component to display threefold vertical layout in slots: header, content/default and footer.
 * Content can be set to scroll when going out of bounds by prop scrollable.
 */
export default Vue.extend<void, void, Computed, Props>({
    name: 'Pane',

    props: {
        hasLoader: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        scrollable: {
            type: Boolean,
            default: false,
        },
        rows: {
            type: Boolean,
            default: false,
        },
        columns: {
            type: Boolean,
            default: false,
        },
        grid: {
            type: Boolean,
            default: false,
        },
        card: {
            type: Boolean,
            default: false,
        },
        bordered: {
            type: Boolean,
            default: false,
        },
        depth: {
            type: Number,
            default: 0,
        },
        grow: {
            type: Number,
            default: null,
        },
        shrink: {
            type: Number,
            default: null,
        },
        background: {
            type: String,
            default: null,
        },
        contentPadding: {
            type: Boolean,
            default: null,
        },
        contentSeparation: {
            type: Boolean,
            default: null,
        },
        contentGrow: {
            type: Boolean,
            default: false,
        },
        wrapItems: {
            type: Boolean,
            default: false,
        },
        debug: {
            type: Boolean,
            default: false,
        },
        justifyContent: {
            default: null,
            validator: (value: string) => {
                // The value must match one of these strings
                return (
                    [
                        'flex-start',
                        'flex-end',
                        'center',
                        'space-between',
                        'space-around',
                        'space-evenly',
                    ].indexOf(value) !== -1
                )
            },
        },
        alignItems: {
            default: null,
            validator: (value: string) => {
                // The value must match one of these strings
                return (
                    [
                        'flex-start',
                        'flex-end',
                        'center',
                        'space-between',
                        'space-around',
                        'strech',
                    ].indexOf(value) !== -1
                )
            },
        },
    },

    computed: {
        simpleContent() {
            return (
                !this.$slots.theheader &&
                !this.$slots.header &&
                !this.$slots.footer &&
                !this.scrollable &&
                !this.hasTabs &&
                !this.grid
            )
        },

        hasTabs() {
            return !!this.$slots.tabs
        },

        padContent() {
            return (
                this.contentPadding === true ||
                (this.depth > 0 && this.contentPadding !== false)
            )
        },

        paneClass() {
            const cls: PaneClasses = {
                'pane-scrollable': this.scrollable,
                'pane-rows': this.rows,
                'pane-columns': this.columns,
                'pane-grid': this.grid,
                'pane-card': this.card,
                'pane-bordered': this.bordered,
                'pane-has-tabs': this.hasTabs,
                'content-grow': this.contentGrow,
                'flex-grow-0': this.grow === 0,
                'flex-grow-1': this.grow === 1,
                'flex-grow-2': this.grow === 2,
                'flex-grow-3': this.grow === 3,
                'flex-grow-4': this.grow === 4,
                'flex-shrink-0': this.shrink === 0,
                'flex-shrink-1': this.shrink === 1,
                'flex-shrink-2': this.shrink === 2,
                'flex-shrink-3': this.shrink === 3,
                'flex-shrink-4': this.shrink === 4,
                'flex-wrap': this.wrapItems,
                'flex-jcs': this.justifyContent === 'flex-start',
                'flex-jce': this.justifyContent === 'flex-end',
                'flex-jcc': this.justifyContent === 'center',
                'flex-jcsb': this.justifyContent === 'space-between',
                'flex-jcsa': this.justifyContent === 'space-around',
                'flex-jcse': this.justifyContent === 'space-evenly',
                'flex-ais': this.alignItems === 'flex-start',
                'flex-aie': this.alignItems === 'flex-end',
                'flex-aic': this.alignItems === 'center',
                'flex-aib': this.alignItems === 'baseline',
                'flex-aist': this.alignItems === 'stretch',
                pad: this.simpleContent && this.padContent,
                separate: this.contentSeparation,
                debug: this.debug,
            }

            if (this.depth > 0) {
                cls['depth-8'] = true
            }

            if (this.background === 'white') {
                cls.white = true
            }

            return cls
        },
    },
})
</script>

<style lang="scss">
@import '~@/assets/sass/color.scss';

.a-pane {
    position: relative;
    display: flex;
    flex-direction: column;

    &:not(.flex-grow-0) {
        flex-grow: 1;
    }

    $flex-classes: 4;

    @for $i from 0 through $flex-classes {
        &.flex-grow-#{$i} {
            flex-grow: $i;
        }

        &.flex-shrink-#{$i} {
            flex-shrink: $i;
        }
    }

    > .a-scroll-wrapper {
        position: relative;
        flex-grow: 1;
        > .a-scroll {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: auto;
        }
    }

    // Default a-content flex style
    &.a-content,
    > .a-content,
    > .a-scroll-wrapper > .a-scroll > .a-content {
        display: flex;
        flex-direction: column;
    }

    &.a-content,
    > .a-content {
        .separator {
            display: block;
            min-width: 1em;
            min-height: 1em;
        }
    }

    &.content-grow {
        &.a-content,
        > .a-content:not(.flex-grow-0) {
            flex-grow: 1;
        }

        > .a-scroll-wrapper > .a-scroll {
            flex-grow: 1;
            > .a-content:not(.flex-grow-0) {
                flex-grow: 1;
            }
        }
    }

    &.flex-wrap > .a-scroll-wrapper > .a-scroll > .a-content,
    &.flex-wrap > .a-content,
    &.flex-wrap.a-content {
        flex-wrap: wrap;
    }

    &.pane-rows > .a-scroll-wrapper > .a-scroll > .a-content,
    &.pane-rows > .a-content,
    &.pane-rows.a-content,
    &.pane-columns > .pane-rows.a-content {
        flex-direction: column;
    }

    &.pane-columns > .a-scroll-wrapper > .a-scroll > .a-content,
    &.pane-columns > .a-content,
    &.pane-columns.a-content,
    &.pane-rows > .pane-columns.a-content {
        flex-direction: row;
    }

    &.flex-jcs {
        > .a-scroll-wrapper > .a-scroll > .a-content,
        > .a-content,
        &.a-content {
            justify-content: flex-start;
        }
    }
    &.flex-jcc {
        > .a-scroll-wrapper > .a-scroll > .a-content,
        > .a-content,
        &.a-content {
            justify-content: center;
        }
    }
    &.flex-jce {
        > .a-scroll-wrapper > .a-scroll > .a-content,
        > .a-content,
        &.a-content {
            justify-content: flex-end;
        }
    }
    &.flex-jcsb {
        > .a-scroll-wrapper > .a-scroll > .a-content,
        > .a-content,
        &.a-content {
            justify-content: space-between;
        }
    }
    &.flex-jcsa {
        > .a-scroll-wrapper > .a-scroll > .a-content,
        > .a-content,
        &.a-content {
            justify-content: space-around;
        }
    }
    &.flex-jcse {
        > .a-scroll-wrapper > .a-scroll > .a-content,
        > .a-content,
        &.a-content {
            justify-content: space-evenly;
        }
    }

    &.flex-ais {
        > .a-scroll-wrapper > .a-scroll > .a-content,
        > .a-content,
        &.a-content {
            align-items: flex-start;
        }
    }
    &.flex-aic {
        > .a-scroll-wrapper > .a-scroll > .a-content,
        > .a-content,
        &.a-content {
            align-items: center;
        }
    }
    &.flex-aie {
        > .a-scroll-wrapper > .a-scroll > .a-content,
        > .a-content,
        &.a-content {
            align-items: flex-end;
        }
    }
    &.flex-aib {
        > .a-scroll-wrapper > .a-scroll > .a-content,
        > .a-content,
        &.a-content {
            align-items: baseline;
        }
    }
    &.flex-aist {
        > .a-scroll-wrapper > .a-scroll > .a-content,
        > .a-content,
        &.a-content {
            align-items: stretch;
        }
    }

    &.separate {
        &.a-content,
        > .a-content:not(.a-pane),
        > .a-scroll-wrapper > .a-scroll > .a-content {
            &:not(.a-pane) {
                padding: 0.375rem;
            }

            > button,
            > div:not(.a-content) {
                margin: 0.375rem;
            }
        }
    }

    > .a-footer {
        display: flex;
        flex-direction: column;
        flex-shrink: 1;
    }

    &.pane-grid {
        > .a-scroll-wrapper > .a-scroll > .a-content,
        > .a-content:not(.a-pane),
        &.a-content {
            display: grid;
            flex-grow: 1;
        }
    }

    &.pane-has-tabs {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;

        border-top: 0 !important;

        .tabs.is-boxed {
            li:first-of-type {
                a {
                    border-left: 0;
                }
            }

            li:last-of-type {
                a {
                    border-right: 0;
                }
            }
        }
    }

    &.white {
        &:not(.pane-has-tabs) {
            background-color: $white;
        }

        > .a-scroll-wrapper > .a-scroll,
        > .a-content,
        &.a-content {
            background-color: $white;
        }
    }

    &.bordered {
        border-right: 1px solid #dbdbdb;
        border-left: 1px solid #dbdbdb;
        &:not(.top-paper) {
            border-bottom: 1px solid #dbdbdb;
            border-top: 1px solid #dbdbdb;
        }
    }

    $depth-classes: 8;

    @for $i from 1 through $depth-classes {
        &.pane-columns.depth-$i {
            border-top: 1px solid #dbdbdb;
        }
    }
}

.aibidia-layout-pane.debug {
    > .a-header {
        background-color: $yellow !important;
    }
    > .a-header {
        background-color: $blue !important;
    }
    > .a-footer {
        background-color: $green !important;
    }
}

.main__content > .aibidia-layout-pane {
    > .a-scroll-wrapper > .a-scroll > .a-content,
    > .a-content,
    &.a-content {
        > .aibidia-layout-pane {
            border-bottom: none !important;
        }
    }
}
</style>
