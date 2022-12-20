<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT BAND</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    Nama Band
                                </label>
                                <input type="text" class="form-control" v-model="band.name">
                                <div v-if="validation.name" class="mt-2 alert alert-danger">
                                    {{
                                        validation.name[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    Genre Band
                                </label>
                                <select v-model="band.genre" class="form-select">
                                  <option selected disabled value="">Pilih Genre</option>
                                  <option v-for="(option,id) in options" :value="option.value" :key="id">
                                    {{ option.text }}
                                  </option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                            <button type="reset" class="btn btn-md btn-danger">RESET</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
  setup () {
    const options = [
      { value: 'pop', text: 'Pop' },
      { value: 'rock', text: 'Rock' },
      { value: 'kpop', text: 'K-Pop' },
    ]

    // state band
    const band = reactive({
      name: '',
      genre: ''
    })

    // state validation
    const validation = ref([])
    // vue router
    const router = useRouter()
    // vue router
    const route = useRoute()

    onMounted(() => {
      // get API from Laravel Backend
      axios.get(`http://localhost:8000/api/band/${route.params.id}`)
        .then(response => {
          // assign state posts with response data
          band.name = response.data.data.name
          band.genre = response.data.data.genre
        }).catch(error => {
          console.log(error.response.data)
        })
    })

    // method store
    function update () {
      const name = band.name
      const genre = band.genre

      axios.put(`http://localhost:8000/api/band/${route.params.id}`, {
        name: name,
        genre: genre
      }).then(() => {
        // redirect ke post index
        router.push({
          name: 'band.index'
        })
      }).catch(error => {
        // assign state validation with error
        validation.value = error.response.data
      })
    }

    // return
    return {
      options,
      band,
      validation,
      router,
      update
    }
  }
}
</script>
