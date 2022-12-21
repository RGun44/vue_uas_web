<template>
    <div class="container">
        <form @submit.prevent="register">
            <h2 class="mb-3">Register</h2>
            <div class="form-group mb-3">
                <label class="form-label">
                    Username
                </label>
                <input type="text" class="form-control" v-model="user.username" placeholder="Username">
            </div>
            <div class="form-group mb-3">
                <label class="form-label">
                    Password
                </label>
                <input type="password" class="form-control" v-model="user.password" placeholder="Password">
            </div>
            <div class="form-group mb-3">
                <label class="form-label">
                    Name
                </label>
                <input type="text" class="form-control" v-model="user.name" placeholder="Username">
            </div>
            <div class="form-group mb-3">
                <label class="form-label">
                    Email
                </label>
                <input type="text" class="form-control" v-model="user.email" placeholder="Email @">
            </div>
            <div class="form-group mb-3">
                <label class="form-label">
                    Photo
                </label>
                <input class="form-control" type="file" @change="onFile" />
                <div v-if="validation.foto" class="mt-2 alert alert-danger">
                    {{
                    validation.foto[0]
                    }}
                </div>
            </div>
            <router-link :to="{ name: 'loginPage' }" class="btn btn-primary">Register</router-link>
        </form>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {

    setup() {
        // state band
        const user = reactive({
            username: '',
            password: '',
            name: '',
            email: '',
            foto: '',
        })

        // state validation
        const validation = ref([])
        // vue router
        const router = useRouter()

        // method register
        function register() {
            const username = user.username
            const password = user.password
            const name = user.name
            const email = user.email
            const foto = user.foto

            axios.post('http://localhost:8000/api/register', {
                username: username,
                password: password,
                name: name,
                email: email,
                foto: foto,
            }).then(() => {
                // redirect ke post index
                router.push({
                    name: 'loginPage'
                })
            }).catch(error => {
                // assign state validation with error
                validation.value = error.response.data
            })
        }

        // return
        return {
            user,
            validation,
            router,
            register,
        }
    },

    methods: {
        onFile(e) {
            const files = e.target.files
            if (!files.length) return

            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = () => (this.user.foto = reader.result)
        }
    }
}
</script>