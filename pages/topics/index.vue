<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12" sm="6" md="4" lg="3"
        v-for="(topic, topicIndex) in topics" :key="topicIndex"
      >
        <v-card>
          <v-card-title class="justify-center red">
            <v-btn 
              :to="{name: 'topics-id', params: {id: topic.id}}"
              class="pa-0 white--text"
              plain
              nuxt
            >
              {{ topic.title }}
            </v-btn>
          </v-card-title>

          <v-card-subtitle class="red white--text text-center font-italic">
            <small>{{ topic.created_at }} by {{ topic.user.name }}</small>
          </v-card-subtitle>

          <hr class="mb-4">

          <v-card-text
            class="py-4 px-4"
            v-for="(post, postIndex) in topic.posts" :key="postIndex"
          >
            <h3>{{ post.body }}</h3>

            <small class="indigo--text font-italic">{{ post.updated_at }} by {{ post.user.name }}</small>

            <v-spacer></v-spacer>

            <div class="d-flex justify-end">
              <!-- User authenticated and not the owner of the post -->
              <div v-if="authenticated && user.id != post.user.id">
                <!-- user already like post -->
                <div v-if="alreadyLike(post)">
                  <v-btn
                    icon
                    color="primary"
                    @click="dislikePost(topic.id, post.id, topicIndex)"
                  >
                    <v-icon>mdi-thumb-up</v-icon>
                  </v-btn>
                </div>

                <!-- user did not like post -->
                <div v-else>
                  <v-btn
                    icon
                    @click="likePost(topic.id, post.id, topicIndex)"
                  >
                    <v-icon>mdi-thumb-up-outline</v-icon>
                  </v-btn>
                </div>
              </div>

              <!-- User unauthenticated or owns the post -->
              <div v-else>
                <v-btn icon disabled>
                  <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
              </div>

              <!-- show likes count -->
              <span
                class="pt-2"
                v-if="post.like_count > 0"
              >
                {{ post.like_count }}
              </span>
            </div>
          </v-card-text>

          <v-card-actions class="justify-end" v-if="authenticated">
            <div v-if="user.id === topic.user.id">
              <v-btn color="primary" icon :to="{name: 'topics-edit', params: {id: topic.id}}">
                <v-icon>mdi-circle-edit-outline</v-icon>
              </v-btn>

              <v-btn color="error" icon @click="deleteTopic(topic.id, topicIndex)">
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </div>
          </v-card-actions>
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
  },

  methods: {
    deleteTopic(id, index) {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {

          try {
            this.$axios.$delete(`/topics/${id}`)
            this.topics.splice(index, 1)
            this.$swal.fire({
              title: 'Deleted!',
              icon: 'success'
            })
          } catch(e) {
            this.$swal.fire({
              title: 'Can not be deleted!',
              icon: 'error',
              text: e
            })
          }

        }
      })
    },

    alreadyLike(post) {
      if(post.users_like) {
        if(post.users_like.some(
          user => user.id === this.user.id
        )) {
          return true
        }
      }
      return false
    },

    async likePost(topicId, postId, index) {
      try {
        await this.$axios.$post(`/topics/${topicId}/posts/${postId}/likes`)

        let {data} = await this.$axios.$get(`/topics/${topicId}`)
        this.topics.splice(index, 1, data)
      } catch(e) {
        this.$swal.fire({
          title: 'Can not perform action!',
          icon: 'error',
          text: e
        })
      }
    },

    async dislikePost(topicId, postId, index) {
      try {
        await this.$axios.$delete(`/topics/${topicId}/posts/${postId}/likes`)

        let {data} = await this.$axios.$get(`/topics/${topicId}`)
        this.topics.splice(index, 1, data)
      } catch(e) {
        this.$swal.fire({
          title: 'Can not perform action!',
          icon: 'error',
          text: e
        })
      }
    }
  }
}
</script>
