<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT TICKET</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    ID Concert
                                </label>
                                <select v-model="ticket.concert_id" class="form-select">
                                    <option selected disabled value="">Choose Band</option>
                                    <option v-for="(concert, id) in concerts" :value="concert.id" :key="id">{{ concert.id }} - {{
                                            concert.name
                                    }}</option>
                                </select>
                                <div v-if="validation.concert_id" class="mt-2 alert alert-danger">
                                    {{
                                            validation.concert_id[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    ID Customer
                                </label>
                                <select v-model="ticket.customer_id" class="form-select">
                                    <option selected disabled value="">Choose Customer</option>
                                    <option v-for="(customer, id) in customers" :value="customer.id" :key="id">{{ customer.id }} - {{
                                            customer.name
                                    }}</option>
                                </select>
                                <div v-if="validation.customer_id" class="mt-2 alert alert-danger">
                                    {{
                                            validation.customer_id[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">
                                    Class
                                </label>
                                <input type="text" class="form-control" v-model="ticket.class" placeholder="Masukkan class ticket">
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
                                <input type="number" class="form-control" v-model="ticket.price" placeholder="Masukkan price">
                                <div v-if="validation.price" class="mt-2 alert alert-danger">
                                    {{
                                            validation.name[0]
                                    }}
                                </div>
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
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
  setup () {
    // state ticket
    const ticket = reactive({
      concert_id: '',
      customer_id: '',
      class: '',
      price: '',
      book_date: ''
    })

    // state validation
    const validation = ref([])
    // vue router
    const router = useRouter()
    // vue router
    const route = useRoute()

    onMounted(() => {
      // get API from Laravel Backend
      axios.get(`http://localhost:8000/api/ticket/${route.params.id}`)
        .then(response => {
          // assign state posts with response data
          ticket.concert_id = response.data.data.concert_id
          ticket.customer_id = response.data.data.customer_id
          ticket.class = response.data.data.class
          ticket.price = response.data.data.price
          ticket.book_date = response.data.data.book_date
        }).catch(error => {
          console.log(error.response.data)
        })
    })

    // method store
    function update () {
      const concert_id = ticket.concert_id
      const customer_id = ticket.customer_id
      const ticket_class = ticket.class
      const price = ticket.price
      const book_date = ticket.book_date

      axios.put(`http://localhost:8000/api/ticket/${route.params.id}`, {
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
      ticket,
      validation,
      router,
      update
    }
  }
}
</script>
