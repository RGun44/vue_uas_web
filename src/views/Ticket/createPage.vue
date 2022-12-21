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
                                    ID Concert
                                </label>
                                <select v-model="ticket.concert_id" class="form-select">
                                    <option selected disabled value="">Choose Band</option>
                                    <option v-for="(concert,id) in concerts" :value="concert.id" :key="id">{{ concert.id }} - {{
                                        concert.name }}</option>
                                </select>
                                <div v-if="validation.concert_id" class="mt-2 alert alert-danger">
                                    {{
                                    validation.concert_id[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    Class
                                </label>
                                <select v-model="ticket.class" class="form-select">
                                    <option selected disabled value="">Pilih Kelas</option>
                                    <option v-for="(option,id) in options" :value="option.values" :key="id">
                                        {{ option.text }}
                                    </option>
                                </select>
                                <div v-if="validation.class" class="mt-2 alert alert-danger">
                                    {{
                                    validation.class[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    Price
                                </label>
                                <input type="number" class="form-control" v-model="ticket.price" placeholder="Masukkan harga tiket">
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    Book Date
                                </label>
                                <input type="date" class="form-control" v-model="ticket.book_date" placeholder="Masukkan nama concert">
                                <div v-if="validation.book_date" class="mt-2 alert alert-danger">
                                    {{
                                    validation.book_date[0]
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
import { onMounted,reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup () {

    const options = [
        { id: 0, value: 'reguler', text: 'Reguler' },
        { id: 1, value: 'premium', text: 'Premium' },
        { id: 2, value: 'eksklusif', text: 'Eksklusif' },
    ]

    let concerts = ref([])

    //mounted     
    onMounted(() => {
        //get API from Laravel Backend      
        axios.get('http://localhost:8000/api/concert')
            .then(response => {
                //assign state posts with response data           
                concerts.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
    })

    // state ticket
    const ticket = reactive({
      concert_id: '',
      class: '',
      price: '',
      book_date: ''
    })

    // state validation
    const validation = ref([])
    // vue router
    const router = useRouter()

    // method store
    function store () {
      const concert_id = ticket.concert_id
      const customer_id = 2
      const ticket_class = ticket.class
      const price = ticket.price
      const book_date = ticket.book_date

      axios.post('http://localhost:8000/api/ticket', {
        concert_id: concert_id,
        customer_id: customer_id,
        class: ticket_class,
        price: price,
        book_date: book_date
      }).then(() => {
        // redirect ke post index
        router.push({
          name: 'ticket.index'
        })
      }).catch(error => {
        // assign state validation with error
        validation.value = error.response.data
      })
    }

    // return
    return {
        options,
        concerts,
        ticket,
        validation,
        router,
        store
    }
  }
}
</script>

<style>

</style>
