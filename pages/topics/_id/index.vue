<template>
    <v-container>
        <v-btn plain to="/topics">
            <v-icon>mdi-reply-all</v-icon>
        </v-btn>

        <v-row justify="center">
            <v-col cols="10" sm="8" md="6">
                <v-card>
                    <v-card-title class="justify-center text-uppercase indigo">
                        <h3 class="white--text">{{ topic.title }}</h3>
                    </v-card-title>

                    <v-card-subtitle class="indigo text-center font-italic">
                        <small class="white--text">{{ topic.created_at }} by {{ topic.user.name }}</small>
                    </v-card-subtitle>

                    <v-card-text
                        class="py-4 px-8"
                        v-for="(post, index) in topic.posts" :key="index"
                    >
                        <h3>{{ post.body }}</h3>
                        <small class="indigo--text font-italic">{{ post.created_at }} by {{ post.user.name }}</small>

                        <div
                            v-if="authenticated"
                            class="d-flex justify-end"
                        >
                            <div v-if="user.id === post.user.id">

                                <!-- <v-dialog
                                    transition="dialog-top-transition"
                                    max-width="600"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            color="primary"
                                            v-bind="attrs"
                                            v-on="on"
                                            icon
                                        >
                                            <v-icon>mdi-circle-edit-outline</v-icon>
                                        </v-btn>
                                    </template>

                                    <template v-slot:default="dialog">
                                        <v-card>
                                            <v-card-title
                                                color="primary"
                                                dark
                                            >
                                                Edit Post
                                            </v-card-title>

                                            <v-form>
                                                <v-card-text>
                                                    <h2>Card Text</h2>
                                                </v-card-text>

                                                <v-card-actions class="justify-end">
                                                    <v-btn text @click="dialog.value = false">Close</v-btn>
                                                </v-card-actions>
                                            </v-form>
                                        </v-card>
                                    </template>
                                </v-dialog> -->

                                <v-btn color="primary" icon>
                                    <v-icon>mdi-circle-edit-outline</v-icon>
                                </v-btn>

                                <v-btn color="error" icon>
                                    <v-icon>mdi-delete-outline</v-icon>
                                </v-btn>
                            </div>
                        </div>

                        <hr class="mt-4">
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

                    <v-form
                        ref="form"
                        v-model="validCreatePost"
                        @submit.prevent="createPost"
                    >
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
                this.$refs.form.reset()
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
