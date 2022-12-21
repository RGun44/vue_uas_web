<template>
    <div class="container">
        <form @submit.prevent="">
            <h2 class="mb-3">Login</h2>
            <div class="input">
                <label for="email">Email address</label>
                <input class="form-control" type="text" name="email" placeholder="email@adress.com" />
            </div>
            <div class="input">
                <label for="password">Password</label>
                <input class="form-control" type="password" name="password" placeholder="password123" />
            </div>
            <p>You don't have an account? <span><router-link :to="{ name: 'registerPage' }" class="alternative-option mt-4">Register</router-link></span></p>
            <router-link :to="{ name: 'landingPage' , params: { id: 1 } }" class="btn btn-primary">Login</router-link>
        </form>
    </div>
</template>

<script>
export default {

};
</script>