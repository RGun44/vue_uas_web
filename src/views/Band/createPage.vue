<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH BAND</h4>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    Nama Band
                                </label>
                                <input type="text" class="form-control"
                                v-model="band.name"
                                placeholder="Masukkan nama band">
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
                                  <option v-for="(option,id) in options" :value="option.values" :key="id">
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  
  setup () {
    const options = [
      { id: 0, value: 'pop', text: 'Pop' },
      { id: 1, value: 'rock', text: 'Rock' },
      { id: 2, value: 'kpop', text: 'K-Pop' },
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

    // method store
    function store () {
      const name = band.name
      const genre = band.genre

      axios.post('http://localhost:8000/api/band', {
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
      store
    }
  }
}
</script>

<style>

</style>
