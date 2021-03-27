<template>
  <v-row justify="center">
    <v-col cols="10" sm="8" md="6">
      <v-card class="my-12">
        <!-- card title -->
        <v-card-title class="indigo">
          <h2 class="white--text">
            Login
          </h2>
        </v-card-title>
        <!-- form -->
        <v-form @submit.prevent="submit">
          <!-- card text -->
          <v-card-text class="px-8 py-4">
            <v-text-field
              v-model.trim="form.email"
              autofocus
              name="email"
              type="email"
              label="Email"
              prepend-icon="mdi-account-circle"
            />
            <p class="red--text" v-if="errors.email">{{ errors.email[0] }}</p>

            <v-text-field
              v-model.trim="form.password"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              label="Password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
            <p class="red--text" v-if="errors.password">{{ errors.password[0] }}</p>
          </v-card-text>
          <!-- card actions -->
          <v-card-actions class="px-8 pb-4">
            <v-spacer />
            <!-- right -->
            <v-btn type="submit" color="indigo white--text">
              Login
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
  auth: 'guest',

  data: () => ({
    form: {
      email: '',
      password: ''
    },
    showPassword: false
  }),

  methods: {
    async submit () {
      try {
        await this.$auth.loginWith('local', { data: this.form })
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
