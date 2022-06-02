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
                        {{ resume.fullName }} ({{ resume.title }})
                    </h1>
                    <p>
                        {{ resume.biography }}
                    </p>
                    <h1>Skills</h1>
                    <skill-item
                        v-for="(skill, key) in resume.skills"
                        :key="key"
                        :item="skill"
                    >
                    </skill-item>
                </a-card>
                <a-card
                    content-grow
                    scrollable
                    align-items="flex-start"
                >
                    <h1>
                        Education
                    </h1>
                    <generic-cv-item
                        v-for="(item, key) in resume.education"
                        :key="key"
                        :item="item"
                    >
                    </generic-cv-item>
                    <br/>
                    <h1>
                        Experience
                    </h1>
                    <generic-cv-item
                        v-for="(item, key) in resume.experience"
                        :key="key"
                        :item="item"
                    >
                    </generic-cv-item>
                </a-card>
            </a-pane>
        </template>
    </a-root-page-layout>
</template>

<script lang="ts">
import BaseView from 'views/BaseView.ts.vue'
import SkillItemInterface from "types/SkillItem";
import SkillItem from 'components/shared/Resume/SkillItem.ts.vue'
import GenericCvItemInterface from 'types/GenericCvItem'
import GenericCvItem from 'components/shared/Resume/GenericCvItem.ts.vue'

interface Data {
    fullName: string
    title: string
    biography: string
    skills: Array<SkillItemInterface>
    education: Array<GenericCvItemInterface>
    experience: Array<GenericCvItemInterface>
}

/**
 * Resume view
 */
export default BaseView.extend<Data, void, void, void>({
    components: {
        GenericCvItem,
        SkillItem
    },

    data() {
        return {
            resume: {
                fullName: 'Pouya Kondori',
                title: 'Frontend Developer',
                biography: 'I have experience in the development of front-end web pages with React, VueJS, JavaScript, Typescript, HTML5, CSS, SCSS, and a few more technologies. Most of my projects were on Git repositories and I am familiar with different types of versioning on Git and APIs.\n' +
                    'It is important for me to speed up the service or product by implementing the right techniques such as minifying CSS, JS, and using CDNs. I also always pay attention to different screen sizes with the mobile-first design approach.\n' +
                    'I developed the 20th Alexa ranked website in Iran with over 200K concurrent users. Increased time on-site in an online magazine from 1:30 to 5 minutes by developing the right Javascript codes to improve the engagement of users as some of my achievements.',
                skills: [
                    {
                        name: 'Javascript',
                        rate: 4
                    },
                    {
                        name: 'Html',
                        rate: 4
                    },
                    {
                        name: 'CSS',
                        rate: 4
                    },
                    {
                        name: 'VueJs',
                        rate: 4
                    },
                    {
                        name: 'NuxtJs',
                        rate: 3
                    },
                    {
                        name: 'Vuetify',
                        rate: 3
                    }
                ],
                education: [
                    {
                        date: '2008 - 2012',
                        label: 'Bachelor of Science, System Engineering',
                        description: 'K.N.Toosi University of Technology, Iran'
                    }
                ],
                experience: [
                    {
                        date: 'Dec 2021 - Present',
                        label: 'Front end Developer',
                        description: 'PrimeIT, Porto - Portugal'
                    },
                    {
                        date: 'Feb 2021 - Dec 2021',
                        label: 'Frontend Developer',
                        description: 'Conversional Co. Stuttgart - Germany'
                    },
                    {
                        date: 'Jan 2020 - Jan 2021',
                        label: 'Frontend Developer',
                        description: 'Farmerz OU, Tallinn - Estonia'
                    }
                ]
            }
        }
    }
})
</script>
