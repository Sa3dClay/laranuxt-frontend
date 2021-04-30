<template>
  <v-row justify="center">
    <v-col cols="10" sm="8" md="6">
      <h2 class="text-center">Dashboard</h2>

      <v-card class="my-6">
        <!-- card title -->
        <v-card-title class="indigo">
          <h2 class="white--text">
            Create Topic
          </h2>
        </v-card-title>
        <!-- form -->
        <v-form v-model="validCreate" @submit.prevent="create">
          <!-- card text -->
          <v-card-text class="px-8 py-4">
            <p class="red--text" v-if="errors.message">{{ errors.message }}</p>

            <v-text-field
              v-model.trim="form.title"
              name="title"
              type="text"
              label="Topic Title"
              :rules="titleRules"
              prepend-icon="mdi-format-title"
            />
            <p class="red--text" v-if="errors.title">{{ errors.title[0] }}</p>

            <v-textarea
              v-model.trim="form.body"
              name="body"
              label="Post Body"
              :rules="bodyRules"
              prepend-icon="mdi-card-text-outline"
              clearable
              counter
            />
            <p class="red--text" v-if="errors.body">{{ errors.body[0] }}</p>
          </v-card-text>
          <!-- card actions -->
          <v-card-actions class="px-8 pb-4">
            <v-spacer />
            <!-- right -->
            <v-btn :disabled="!validCreate" type="submit" color="indigo white--text">
              Create
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'auth',

  data: () => ({
    form: {
      title: '',
      body: ''
    },
    validCreate: false,
    
    titleRules: [
      value => !!value || 'Required.',
      value => (value || '').length <= 40 || 'Max 40 characters.'
    ],
    bodyRules: [
      value => !!value || 'Required.',
      value => (value || '').length >= 10 || 'Min 10 characters.',
      value => (value || '').length <= 1000 || 'Max 1000 characters.'
    ]
  }),

  methods: {
    async create () {
      try {
        await this.$axios.$post('/topics', this.form)
        this.$router.push('/topics')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
