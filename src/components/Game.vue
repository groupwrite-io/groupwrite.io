<template>
  <div>
    <h1>List of players</h1>
    <ol>
      <li v-for="player in players">
        ${player.nickname}
      </li>
    </ol>
    <button v-on:click="quit">Quit</button>
  </div>
</template>