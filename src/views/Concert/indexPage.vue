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
                        <router-link :to="{ name: 'concert.create' }"
                        class="btn btn-md btn-success">TAMBAH CONCERT</router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA CONCERT</th>
                                    <th scope="col">TANGGAL KONSER</th>
                                    <th scope="col">JAM MULAI</th>
                                    <th scope="col">BAND</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(concert, id) in concerts" :key="id">
                                    <td>{{ concert.name }}</td>
                                    <td>{{ concert.date }}</td>
                                    <td>{{ concert.start_time }}</td>
                                    <td>{{ concert.band_id }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'concert.edit', params: { id: concert.id } }" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        <button class="btn btn-sm btn-danger ml-1" @click.prevent="concertDelete(concert.id)">DELETE</button>
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
    const concerts = ref([])

    // mounted
    onMounted(() => {
      // get API from Laravel Backend
      axios.get('http://localhost:8000/api/concert')
        .then(response => {
          // assign state posts with response data
          concerts.value = response.data.data
        }).catch(error => {
          console.log(error.response.data)
        })
    })

    // method delete
    function concertDelete (id) {
      // delete data post by ID
      axios.delete(`http://localhost:8000/api/concert/${id}`)
        .then(() => {
          // splice posts
          concerts.value.splice(concerts.value.indexOf(id), 1)
        }).catch(error => {
          console.log(error.response.data)
        })
    }
    // return
    return {
      concerts,
      concertDelete
    }
  }
}
</script>

<style>
</style>
