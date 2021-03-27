import Vue from 'vue'
import {mapGetters} from 'vuex'

// validation
const Validation = {
    install(Vue) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    errors: 'validation/errors'
                })
            }
        })
    }
}

Vue.use(Validation);
