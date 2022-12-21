<template>
    <div id="app">

        <div class="container">

            <br>

            <div class="row">
                <header class="page-header" style="text-align: center;">
                    <h1 class="logo">Kolindo</h1>
                    <p class="subtitle">Platform Tiket Konser Lokal Indonesia</p>
                </header>
            </div>

            <br>

            <div class="row">

                <!-- Sidebar -->
                <div class="col-2">
                    <aside class="page-sidebar box">
                        <h3 class="heading">Search Band</h3>
                        <input type="search" class="form-control" placeholder="e.g. Slank" role="searchbox" v-model="filter">
                        
                        <br>
                    </aside>
                </div>

                <!-- Card Body -->
                <div class="col-10">
                    <main class="page-content">
                        <div class="row">
                            <div class="col" v-for="(concert,id) in concerts" :key="id">
                                <div class="card" style="width: 18rem;">
                                    <img src="@/assets/Slank.jpg" class="card-img-top">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ concert.name }}</h5>
                                        <div v-for="(band, id) in bands" :key="id">
                                            <div v-if="band.id === concert.band_id">
                                                <p class="card-text">{{ band.name }}</p>
                                            </div>
                                        </div>
                                        <p class="card-footer">Mulai dari Rp 150.000</p>
                                        <router-link :to="{ name: 'detailTicket' }" class="btn btn-md btn-success">Pesan Tiket</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
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

    const option = null
    const filter = null

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

    // return
    return {
        bands,
      concerts,
        option,
        filter,
    }
  }
}
</script>

<style>

</style>
