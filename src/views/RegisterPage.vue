<template>
    <div class="container">
        <form @submit.prevent="">
            <h2 class="mb-3">Register</h2>
            <div class="input">
                <label for="email">Email address</label>
                <input class="form-control" type="text" name="email" placeholder="email@adress.com" />
            </div>
            <div class="input">
                <label for="password">Password</label>
                <input class="form-control" type="password" name="password" placeholder="password123" />
            </div>
            <router-link :to="{ name: 'loginPage' }" class="btn mt-4 btn-pers">Register</router-link>
            <div class="alert alert-warning alert-dismissible fade show mt-5 d-none" role="alert" id="alert_1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </form>
    </div>
</template>

<script>
export default {

};
</script>