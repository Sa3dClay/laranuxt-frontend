<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12" sm="6" md="4" lg="3"
        v-for="(topic, index) in topics" :key="index"
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
            v-for="(post, index) in topic.posts" :key="index"
          >
            <h3>{{ post.body }}</h3>

            <small class="indigo--text font-italic">{{ post.updated_at }} by {{ post.user.name }}</small>
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
