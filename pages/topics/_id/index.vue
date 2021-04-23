<template>
    <v-container>
        <v-btn plain to="/topics">
            <v-icon>mdi-reply-all</v-icon>
        </v-btn>

        <v-row justify="center">
            <v-col cols="10" sm="8" md="6">
                <v-card class="text-center">
                    <v-card-title class="justify-center">
                        {{ topic.title }}
                    </v-card-title>

                    <hr>

                    <v-card-subtitle>
                        {{ topic.created_at }}
                    </v-card-subtitle>

                    <v-card-text v-for="(post, index) in topic.posts" :key="index">
                        <h3>{{ post.body }}</h3>

                        <p>Created by: {{ post.user.name }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        topic: {}
    }),

    async asyncData({$axios, params}) {
        let {data} = await $axios.$get(`/topics/${params.id}`)

        return {
            topic: data
        }
    }
}
</script>
