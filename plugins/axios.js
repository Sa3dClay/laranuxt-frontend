export default function({$axios, store}) {
    $axios.onError(error => {
        if(error.response.status === 422) {
            store.dispatch("validation/setErrors", error.response.data.errors)
        } else if(error.response.status === 401) {
            let errors = {
                message: error.response.data.error
            }
            store.dispatch("validation/setErrors", errors)
        }
        return Promise.reject(error)
    }),

    $axios.onRequest(() => {
        store.dispatch("validation/clearErrors")
    })
}
