import Vue from 'vue'

// Import some generic components, which are used throughout the product
import AibidiaContent from 'components/shared/layout/AibidiaContent/AibidiaContent.ts.vue'
Vue.component('a-content', AibidiaContent)

import AibidiaPane from 'components/shared/layout/AibidiaPane/AibidiaPane.ts.vue'
Vue.component('a-pane', AibidiaPane)

import AibidiaCard from 'components/shared/layout/AibidiaCard/AibidiaCard.ts.vue'
Vue.component('a-card', AibidiaCard)

import AibidiaCardHeader from 'components/shared/layout/AibidiaCard/AibidiaCardHeader.ts.vue'
Vue.component('a-card-header', AibidiaCardHeader)

import AibidiaRootPageLayout from 'components/shared/layout/AibidiaPageLayout/AibidiaRootPageLayout.ts.vue'
Vue.component('a-root-page-layout', AibidiaRootPageLayout)

import AibidiaPageLayout from 'components/shared/layout/AibidiaPageLayout/AibidiaDefaultPageLayout.ts.vue'
Vue.component('a-page-layout', AibidiaPageLayout)

import AibidiaLoadingIndicator from 'components/shared/AibidiaLoadingIndicator/AibidiaLoadingIndicator.ts.vue'
Vue.component('a-loader', AibidiaLoadingIndicator)

import AibidiaTabs from 'components/shared/tabs/AibidiaTabs.ts.vue'
Vue.component('a-tabs', AibidiaTabs)

import AibidiaTab from 'components/shared/tabs/AibidiaTab.ts.vue'
Vue.component('a-tab', AibidiaTab)

import AibidiaLoremIpsum from 'components/shared/layout/AibidiaLoremIpsum/AibidiaLoremIpsum.ts.vue'
Vue.component('a-lorem', AibidiaLoremIpsum)

import AibidiaButton from 'components/shared/button/AibidiaButton.ts.vue'
Vue.component('a-button', AibidiaButton)

import AibidiaPrimaryButton from 'components/shared/button/PrimaryButton/PrimaryButton.vue'
Vue.component('a-primary-button', AibidiaPrimaryButton)

import AibidiaConfirmButton from 'components/shared/button/ConfirmButton/ConfirmButton.vue'
Vue.component('a-confirm-button', AibidiaConfirmButton)

import AibidiaDeleteButton from 'components/shared/button/DeleteButton/DeleteButton.vue'
Vue.component('a-delete-button', AibidiaDeleteButton)

import AibidiaCancelButton from 'components/shared/button/CancelButton/CancelButton.vue'
Vue.component('a-cancel-button', AibidiaCancelButton)
