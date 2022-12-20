<template>
    <div id="app">

        <div class="container">

            <br>

            <header class="page-header" style="text-align: center;">
                <h1 class="logo">Kolindo</h1>
                <p class="subtitle">Platform Tiket Konser Lokal Indonesia</p>
            </header>

            <div class="row">
                <header class="page-header" style="text-align: center;">
                    <figure class="figure">
                        <img src="@/assets/Slank.jpg" class="figure-img img-fluid rounded">
                        <figcaption class="figure-caption">
                            <h1 class="logo">Konser Berdendung - Slank</h1>
                        </figcaption>
                    </figure>
                </header>
            </div>

            <br>

            <div class="row">

                <!-- Sidebar -->
                <div class="col-10">
                    <main class="page-content">
                    
                    </main>
                </div>

                <!-- Card Body -->
                <div class="col-2">
                    <div class="sticky-top">
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">Harga Mulai Dari :</h5>
                                <p class="card-text">Rp 150.000</p>
                                <router-link :to="{ name: 'ticket.create' }" class="btn btn-md btn-success">Pesan Tiket</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    setup() {
        const option = null
        const filter = null

        return {
            option,
            filter,
        }
    }
}
</script>

<style>

</style>
