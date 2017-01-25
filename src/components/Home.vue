<template>
    <div>
        <div class="center">
            <h1>write.io</h1>

            <p>Pick a username</p>
            <form onsubmit="return false">
<input id="choosenickname" placeholder="Anonymous" v-model="nickname" autofocus/>
<button id="write-btn" v-on:click="login">Write!</button>
</form>
</div>
</template>

<style>
body {
    padding: 50px;
    font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
    /* width: 121px; */
}

input {
    padding: 3px;
}

a {
    color: #00B7FF;
}

.center {
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    position: absolute;
}
</style>