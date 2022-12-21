<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH TICKET</h4>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    Username
                                </label>
                                <input type="text" class="form-control" v-model="user.username" placeholder="Masukkan username">
                                <div v-if="validation.username" class="mt-2 alert alert-danger">
                                    {{
                                    validation.username[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    Password
                                </label>
                                <input type="password" class="form-control" v-model="user.password" placeholder="Masukkan password">
                                <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    {{
                                    validation.password[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    Name
                                </label>
                                <input type="text" class="form-control" v-model="user.name" placeholder="Masukkan nama user">
                                <div v-if="validation.name" class="mt-2 alert alert-danger">
                                    {{
                                    validation.name[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    Email
                                </label>
                                <input type="email" class="form-control" v-model="user.email" placeholder="Masukkan email">
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{
                                    validation.email[0]
                                    }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
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
        })

        // state validation
        const validation = ref([])
        // vue router
        const router = useRouter()

        // method register
        function store() {
            const username = user.username
            const password = user.password
            const name = user.name
            const email = user.email

            axios.post('http://127.0.0.1:8000/api/customer', {
                username: username,
                password: password,
                name: name,
                email: email,
            }).then(() => {
                // redirect ke post index
                router.push({
                    name: 'customer.index'
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
            store,
        }
    },
}
</script>

<style>

</style>
