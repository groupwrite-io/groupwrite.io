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