<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">PT. Pemrograman Web</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{ name: 'band.create' }"
                        class="btn btn-md btn-success">TAMBAH BAND</router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA BAND</th>
                                    <th scope="col">GENRE</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(band, id) in bands" :key="id">
                                    <td>{{ band.name }}</td>
                                    <td>{{ band.genre }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'band.edit', params: { id: band.id } }" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        <button class="btn btn-sm btn-danger ml-1 rounded-right" @click.prevent="bandDelete(band.id)">DELETE</button>
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
    const bands = ref([])

    // mounted
    onMounted(() => {
      // get API from Laravel Backend
      axios.get('http://localhost:8000/api/band')
        .then(response => {
          // assign state posts with response data
          bands.value = response.data.data
        }).catch(error => {
          console.log(error.response.data)
        })
    })

    // method delete
    function bandDelete (id) {
      // delete data post by ID
      axios.delete(`http://localhost:8000/api/band/${id}`)
        .then(() => {
          // splice posts
          bands.value.splice(bands.value.indexOf(id), 1)
        }).catch(error => {
          console.log(error.response.data)
        })
    }
    // return
    return {
      bands,
      bandDelete
    }
  }
}
</script>

<style>
</style>
