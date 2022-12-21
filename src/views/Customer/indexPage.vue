<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap
        align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">

                        <router-link :to="{ name: 'customer.create' }" class="btn btn-md btn-success">TAMBAH USER</router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAME</th>
                                    <th scope="col">USERNAME</th>
                                    <th scope="col">PASSWORD</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(customer, id) in customers" :key="id">
                                    <td>{{ customer.name }}</td>
                                    <td>{{ customer.username }}</td>
                                    <td>{{ customer.password }}</td>
                                    <td>{{ customer.email }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'customer.edit', params: { id: customer.id } }"
                                            class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        <button class="btn btn-sm btn-danger ml-1"
                                            @click.prevent="customerDelete(customer.id)">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {
    setup() {
        // reactive state
        const customers = ref([])

        // mounted
        onMounted(() => {
            // get API from Laravel Backend
            axios.get('http://localhost:8000/api/customer')
                .then(response => {
                    // assign state posts with response data
                    customers.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        })

        // method delete
        function customerDelete(id) {
            // delete data post by ID
            axios.delete(`http://localhost:8000/api/customer/${id}`)
                .then(() => {
                    // splice posts
                    customers.value.splice(customers.value.indexOf(id), 1)
                }).catch(error => {
                    console.log(error.response.data)
                })
        }
        // return
        return {
            customers,
            customerDelete
        }
    }
}
</script>

<style>

</style>
