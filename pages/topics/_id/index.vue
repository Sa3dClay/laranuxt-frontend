<template>
    <v-container>
        <v-btn plain to="/topics">
            <v-icon>mdi-reply-all</v-icon>
        </v-btn>

        <v-row justify="center">
            <v-col cols="12" sm="10" md="8">
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
                        <small class="indigo--text font-italic">{{ post.updated_at }} by {{ post.user.name }}</small>

                        <div
                            class="d-flex justify-start"
                            v-if="post.like_count > 0"
                        >
                            <v-btn icon disabled>
                                <v-icon>mdi-thumb-up</v-icon>
                            </v-btn>

                            <span class="pt-2">
                                {{ post.like_count }}
                            </span>
                        </div>

                        <div
                            v-if="authenticated"
                            class="d-flex justify-end"
                        >
                            <div v-if="user.id === post.user.id">

                                <!-- str update -->
                                <v-dialog
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
                                            <v-card-title class="indigo white--text">
                                                Edit Post
                                            </v-card-title>

                                            <v-form
                                                v-model="validUpdatePost"
                                                @submit.prevent="updatePost(post.id, index)"
                                            >
                                                <v-card-text>
                                                    <v-textarea
                                                        v-model="updateBody"
                                                        name="body"
                                                        label="Post Body"
                                                        :rules="bodyRules"
                                                        autofocus
                                                        @focus="updateBody = post.body"
                                                        prepend-icon="mdi-card-text-outline"
                                                        counter
                                                    />

                                                    <p class="red--text" v-if="errors.body">{{ errors.body[0] }}</p>
                                                </v-card-text>

                                                <v-card-actions class="justify-end">
                                                    <v-btn
                                                        type="submit"
                                                        color="indigo white--text"
                                                        :disabled="!validUpdatePost"
                                                    >Update</v-btn>

                                                    <v-btn
                                                        text color="red"
                                                        @click="dialog.value = false"
                                                    >Close</v-btn>
                                                </v-card-actions>
                                            </v-form>
                                        </v-card>
                                    </template>
                                </v-dialog>
                                <!-- end update -->

                                <!-- str delete -->
                                <v-btn color="error" icon @click="deletePost(post.id, index)">
                                    <v-icon>mdi-delete-outline</v-icon>
                                </v-btn>
                                <!-- end delete -->

                            </div>
                        </div>

                        <hr class="mt-8">
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="10" md="8" v-if="authenticated">
                <v-card>
                    <v-card-title class="indigo">
                        <h3 class="white--text">
                            Add New Post
                        </h3>
                    </v-card-title>

                    <!-- str create -->
                    <v-form
                        ref="addPostForm"
                        v-model="validCreatePost"
                        @submit.prevent="createPost"
                    >
                        <v-card-text>
                            <v-textarea
                                v-model="createBody"
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
                            >Add Post</v-btn>
                        </v-card-actions>
                    </v-form>
                    <!-- end create -->

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        topic: {},
        createBody: '',
        updateBody: '',
        validCreatePost: false,
        validUpdatePost: false,
        
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
        // create post
        async createPost () {
            try {
                let {data} = await this.$axios.$post(`/topics/${this.$route.params.id}/posts`, {
                    body: this.createBody
                })

                this.topic.posts.push(data)
                this.$refs.addPostForm.reset()
            } catch (e) {
                console.log(e)
            }
        },
        // update post
        async updatePost(id, index) {
            // console.log(id, index, this.updateBody)

            try {
                let {data} = await this.$axios.$patch(`/topics/${this.$route.params.id}/posts/${id}`, {
                    body: this.updateBody
                })

                this.topic.posts.splice(index, 1, data)

                this.$swal.fire({
                    icon: 'success',
                    text: 'Post updated successfuly!'
                })
            } catch (e) {
                this.$swal.fire({
                    icon: 'error',
                    text: e
                })
            }
        },
        // delete post
        deletePost(id, index) {
            // console.log(id, index)

            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((res) => {
                if(res.isConfirmed) {

                    try {
                        this.$axios.$delete(`/topics/${this.$route.params.id}/posts/${id}`)
                        this.topic.posts.splice(index, 1)
                        
                        this.$swal.fire({
                            title: 'Deleted!',
                            icon: 'success'
                        })
                    } catch (e) {
                        this.$swal.fire({
                            title: 'Can not be deleted!',
                            icon: 'error',
                            text: e
                        })
                    }

                }
            })
        }
    }
}
</script>
