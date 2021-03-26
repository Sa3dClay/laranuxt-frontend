<template>
  <v-row justify="center">
    <v-col cols="10" sm="8" md="6">
      <v-card class="my-12">
        <v-form v-model="valid" @submit.prevent="submit">
          <!-- card title -->
          <v-card-title class="indigo">
            <h2 class="white--text">
              Register
            </h2>
          </v-card-title>
          
          <!-- card text -->
          <v-card-text class="px-8 py-4">    
            <v-text-field
              type="text"
              name="name"
              label="Name"
              v-model="form.name"
              :rules="nameRules"
              prepend-icon="mdi-account-circle"
              required
            />
            
            <v-text-field
              type="email"
              name="email"
              label="Email"
              v-model="form.email"
              :rules="emailRules"
              prepend-icon="mdi-email"
              required
            />
            
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              name="password"
              label="Password"
              v-model="form.password"
              :rules="passwordRules"
              minlength="8"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              required
            />

            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              label="Confirm Password"
              v-model="form.confirmPass"
              :rules="[form.confirmPass === form.password || 'password must match']"
              minlength="8"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              required
            />
          </v-card-text>

          <!-- card actions -->
          <v-card-actions class="px-8 pb-4">
            <v-spacer />

            <v-btn :disabled="!valid" type="submit" color="indigo white--text">
              Register
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
      name: '',
      email: '',
      password: '',
      confirmPass: ''
    },
    valid: false,
    showPassword: false,

    nameRules: [
      value => !!value || 'Required.',
      value => (value || '').length <= 20 || 'Max 20 characters.'
    ],
    emailRules: [
      value => !!value || 'Required.',
      value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || 'Invalid e-mail.'
    ],
    passwordRules: [
      value => !!value || 'Required.',
      value => (value || '').length >= 8 || 'Min 8 characters.'
    ]
  }),

  methods: {
    async submit() {
      let check = this.validate()
      
      if(check) {
        console.log('U r ready')

        await this.$axios.$post('register', this.form)

        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        })

        this.$router.push('/')
      } else {
        console.log('password confirmation does not match')
      }
    },

    validate() {
      if(this.form.confirmPass !== this.form.password)
        return false
      return true
    }
  }
}
</script>
