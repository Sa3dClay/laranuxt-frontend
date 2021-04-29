<template>
    <v-container>
        <v-btn plain to="/topics">
            <v-icon>mdi-reply-all</v-icon>
        </v-btn>

        <v-row justify="center">
            <v-col cols="10" sm="8" md="6">
                <v-card class="text-center">
                    <v-card-title class="justify-center">
                        Edit Topic Title
                    </v-card-title>

                    <v-form v-model="validUpdate" @submit.prevent="update">
                        <v-card-text>
                            <v-text-field
                                v-model="topic.title"
                                type="text"
                                name="title"
                                label="Topic Title"
                                :rules="titleRules"
                                prepend-icon="mdi-format-title"
                                required
                            >   
                            </v-text-field>

                            <p class="red--text" v-if="errors.title">{{ errors.title[0] }}</p>
                        </v-card-text>

                        <v-card-actions class="justify-end" v-if="authenticated">
                            <div v-if="user.id === topic.user.id">
                                <v-btn :disabled="!validUpdate" type="submit" color="primary" icon>
                                    <v-icon>mdi-update</v-icon>
                                </v-btn>
                            </div>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        topic: {
            title: ''
        },
        validUpdate: false,

        titleRules: [
            value => !!value || 'Required.',
            value => (value || '').length <= 40 || 'Max 40 characters.'
        ]
    }),

    async asyncData({$axios, params}) {
        let {data} = await $axios.$get(`/topics/${params.id}`)
        return {
            topic: data
        }
    },

    methods: {
        async update() {
            try {
                await this.$axios.patch(`/topics/${this.$route.params.id}`, {
                    title: this.topic.title
                })
                this.$router.push('/topics')
            } catch(e) {
                console.log(e)
            }
            
        }
    }
}
</script>
