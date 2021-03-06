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
        <!-- card text -->
        <v-card-text class="px-8 py-4">
          <v-form>
            <v-text-field
              v-model.trim="form.email"
              autofocus
              name="email"
              type="email"
              label="Email"
              prepend-icon="mdi-account-circle"
            />
            <v-text-field
              v-model.trim="form.password"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              label="Password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
          </v-form>
        </v-card-text>
        <!-- card actions -->
        <v-card-actions class="px-8 pb-4">
          <v-spacer />
          <!-- right -->
          <v-btn @click.prevent="submit" color="indigo white--text">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    showPassword: false,
    form: {
      email: '',
      password: ''
    }
  }),
  methods: {
    async submit () {
      // console.log('Login')

      await this.$auth.loginWith('local', {
        data: this.form
      })

      this.$router.push('/')
    }
  }
}
</script>
