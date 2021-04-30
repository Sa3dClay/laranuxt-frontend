<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12" sm="6" md="4" lg="3"
        v-for="(topic, index) in topics" :key="index"
      >
        <v-card>
          <v-card-title class="justify-center">
            <v-btn 
              :to="{name: 'topics-id', params: {id: topic.id}}"
              class="pa-0"
              plain
              nuxt
            >
              {{ topic.title }}
            </v-btn>
          </v-card-title>

          <v-card-subtitle class="indigo--text">
            {{ topic.created_at }}
          </v-card-subtitle>

          <v-card-text
            class="py-1"
            v-for="(post, index) in topic.posts" :key="index"
          >
            <h3>{{ post.body }}</h3>

            <p class="indigo--text">Created by: {{ post.user.name }}</p>
          </v-card-text>

          <v-card-actions class="justify-end" v-if="authenticated">
            <div v-if="user.id === topic.user.id">
              <v-btn color="primary" icon :to="{name: 'topics-edit', params: {id: topic.id}}">
                <v-icon>mdi-circle-edit-outline</v-icon>
              </v-btn>

              <v-btn color="error" icon @click="deleteTopic(topic.id, index)">
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
            console.log(e)
            this.$swal.fire({
              title: 'Can not be deleted!',
              icon: 'error'
            })
          }

        }
      })
    }
  }
}
</script>
