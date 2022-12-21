<template>
    <div class="container">
        <form @submit.prevent="">
            <h2 class="mb-3">Register</h2>
            <div class="input">
                <label for="username">Username</label>
                <input class="form-control" type="text" name="username" placeholder="username123" />
            </div>
            <div class="input">
                <label for="password">Password</label>
                <input class="form-control" type="password" name="password" placeholder="password123" />
            </div>
            <div class="input">
                <label for="name">Name</label>
                <input class="form-control" type="text" name="name" placeholder="John Smith" />
            </div>
            <div class="input">
                <label for="email">Email address</label>
                <input class="form-control" type="text" name="email" placeholder="email@adress.com" />
            </div>
            <div class="input">
                <label for="photo">Photo</label>
                <input class="form-control" type="file" name="photo" />
            </div>
            <router-link :to="{ name: 'loginPage' }" class="btn btn-primary">Register</router-link>
        </form>
    </div>
</template>

<script>
export default {

};
</script>