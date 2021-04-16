<template>
  <v-container>
    <h3 class="text-center my-4">Topics</h3>

    <v-row justify="center">
      <v-col
        cols="12" sm="6" md="4" lg="3"
        v-for="(topic, index) in topics" :key="index"
      >
        <v-card>
          <v-card-title>
            {{ topic.title }}
          </v-card-title>

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
    topics: []
  }),

  async asyncData({$axios}) {
    let {data} = await $axios.$get('/topics')
    return {
      topics: data
    }
  }
}
</script>
