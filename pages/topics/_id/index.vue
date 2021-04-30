<template>
    <v-container>
        <v-btn plain to="/topics">
            <v-icon>mdi-reply-all</v-icon>
        </v-btn>

        <v-row justify="center">
            <v-col cols="10" sm="8" md="6">
                <v-card class="text-center">
                    <v-card-title class="justify-center text-uppercase">
                        {{ topic.title }}
                    </v-card-title>

                    <hr>

                    <v-card-subtitle class="indigo--text">
                        {{ topic.created_at }}
                    </v-card-subtitle>

                    <v-card-text v-for="(post, index) in topic.posts" :key="index">
                        <h3>{{ post.body }}</h3>

                        <p class="indigo--text">Created by: {{ post.user.name }}</p>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="10" sm="8" md="6" v-if="authenticated">
                <v-card>
                    <v-card-title class="indigo">
                        <h3 class="white--text">
                            Add New Post
                        </h3>
                    </v-card-title>

                    <v-form v-model="validCreatePost" @submit.prevent="createPost">
                        <v-card-text>
                            <v-textarea
                                v-model="body"
                                name="body"
                                label="Post Body"
                                :rules="bodyRules"
                                prepend-icon="mdi-card-text-outline"
                                clearable
                                counter
                            />

                            <p class="red--text" v-if="errors.body">{{ errors.body[0] }}</p>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                :disabled="!validCreatePost"
                                color="indigo white--text"
                                type="submit"
                            >
                                Add Post
                            </v-btn>
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
        topic: {},
        body: '',
        validCreatePost: false,
        
        bodyRules: [
            value => !!value || 'Required.',
            value => (value || '').length >= 10 || 'Min 10 characters.',
            value => (value || '').length <= 1000 || 'Max 1000 characters.'
        ]
    }),

    async asyncData({$axios, params}) {
        let {data} = await $axios.$get(`/topics/${params.id}`)

        return {
            topic: data
        }
    },

    methods: {
        async createPost () {
            try {
                let {data} = await this.$axios.$post(`/topics/${this.$route.params.id}/posts`, {body: this.body})
                
                this.topic.posts.push(data)
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
