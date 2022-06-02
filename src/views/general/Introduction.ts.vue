<template>
    <a-root-page-layout>
        <template #page>
            <a-pane
                columns
                content-grow
            >
                <a-card
                    content-grow
                    scrollable
                    align-items="flex-start"
                >
                    <h1>
                        Welcome to Aibidia Homework
                    </h1>
                    <p>
                        This is Aibidia platform which manages your resumes in job application process.
                    </p>
                    <h5>
                        Recommended workflow
                    </h5>
                    <ol>
                        <li>
                            Navigate on right side menubar to "Resumes".
                        </li>
                        <li>
                            Make sure your information is correct.
                        </li>
                        <li>
                            Send the resume to us directly with "Submit"-button.
                        </li>
                    </ol>
                </a-card>
                <a-card
                    content-grow
                    scrollable
                    align-items="flex-start"
                >
                    <h1>
                        Resume Facts
                    </h1>
                    <p>
                        The solution covers all the requirements presented in europass specifications.
                    </p>
                    <a
                        class="button is-primary is-small"
                        href="https://europa.eu/europass/en"
                        target="_blank"
                    >
                        Specifications
                        <i class="fas fa-external-link-alt link-icon padding-l-1" />
                    </a>
                    <br>
                    <p>
                        See other job postings open at Aibidia.
                    </p>
                    <a
                        class="button is-primary is-small"
                        href="https://www.aibidia.com/join-aibidia/"
                        target="_blank"
                    >
                        Link to Aibidia Careers
                        <i class="fas fa-external-link-alt link-icon padding-l-1" />
                    </a>
                </a-card>
            </a-pane>
        </template>
    </a-root-page-layout>
</template>

<script lang="ts">
import BaseView from 'views/BaseView.ts.vue'

/**
 * Introduction view
 */
export default BaseView.extend<void, void, void, void>({})
</script>
