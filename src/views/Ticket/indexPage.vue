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
                        <router-link :to="{ name: 'ticket.create' }"
                        class="btn btn-md btn-success">TAMBAH TICKET</router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">CONCERT</th>
                                    <th scope="col">CUSTOMER</th>
                                    <th scope="col">CLASS</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">BOOK DATE</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(ticket, id) in tickets" :key="id">
                                    <td>{{ ticket.concert_id }}</td>
                                    <td>{{ ticket.customer_id }}</td>
                                    <td>{{ ticket.class }}</td>
                                    <td>{{ ticket.price }}</td>
                                    <td>{{ ticket.book_date }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'ticket.edit', params: { id: ticket.id } }" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        <button class="btn btn-sm btn-danger ml-1" @click.prevent="ticketDelete(ticket.id)">DELETE</button>
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
  setup () {
    // reactive state
    const tickets = ref([])

    // mounted
    onMounted(() => {
      // get API from Laravel Backend
      axios.get('http://localhost:8000/api/ticket')
        .then(response => {
          // assign state posts with response data
          tickets.value = response.data.data
        }).catch(error => {
          console.log(error.response.data)
        })
    })

    // method delete
    function ticketDelete (id) {
      // delete data post by ID
      axios.delete(`http://localhost:8000/api/ticket/${id}`)
        .then(() => {
          // splice posts
          tickets.value.splice(tickets.value.indexOf(id), 1)
        }).catch(error => {
          console.log(error.response.data)
        })
    }
    // return
    return {
      tickets,
      ticketDelete
    }
  }
}
</script>

<style>
</style>
