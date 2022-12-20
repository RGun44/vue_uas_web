<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH CONCERT</h4>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    Nama Concert
                                </label>
                                <input type="text" class="form-control"
                                v-model="concert.name"
                                placeholder="Masukkan nama concert">
                                <div v-if="validation.name" class="mt-2 alert alert-danger">
                                    {{
                                        validation.name[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    Tanggal Konser
                                </label>
                                <input type="date" class="form-control" v-model="concert.date"
                                    placeholder="Masukkan tanggal konser">
                                <div v-if="validation.date" class="mt-2 alert alert-danger">
                                    {{
                                    validation.date[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    Jam Mulai
                                </label>
                                <input type="time" class="form-control" v-model="concert.start_time"
                                    placeholder="Masukkan jam mulai">
                                <div v-if="validation.start_time" class="mt-2 alert alert-danger">
                                    {{
                                    validation.start_time[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    ID Band
                                </label>
                                <select v-model="concert.band_id" class="form-select">
                                    <option selected disabled value="">Choose Band</option>
                                    <option v-for="(band,id) in bands" :value="band.id" :key="id">{{ band.id }} - {{
                                        band.name }}</option>
                                </select>
                                <div v-if="validation.band_id" class="mt-2 alert alert-danger">
                                    {{
                                    validation.band_id[0]
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
/* eslint-disable camelcase */

import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup () {
    //reactive state     
    let bands = ref([])

    //mounted     
    onMounted(() => {
        //get API from Laravel Backend      
        axios.get('http://localhost:8000/api/band')
            .then(response => {
                //assign state posts with response data           
                bands.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
    })

    // state concert
    const concert = reactive({
      name: '',
      date: '',
      start_time: '',
      band_id: ''
    })

    // state validation
    const validation = ref([])
    // vue router
    const router = useRouter()

    // method store
    function store () {
      const name = concert.name
      const date = concert.date
      const start_time = concert.start_time
      const band_id = concert.band_id

      axios.post('http://localhost:8000/api/concert', {
        name: name,
        date: date,
        start_time: start_time,
        band_id: band_id
      }).then(() => {
        // redirect ke post index
        router.push({
          name: 'concert.index'
        })
      }).catch(error => {
        // assign state validation with error
        validation.value = error.response.data
      })
    }

    // return
    return {
        onMounted,
        bands,
        concert,
        validation,
        router,
        store
    }
  }
}
</script>

<style>

</style>
