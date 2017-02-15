<template>
  <div class="playerList">
    <h2>Players</h2>
    <ol class="nonelist">
      <li class="playerListItem form-control" v-for="player in sharedState.players"  
          v-if="player.nickname != sharedState.myNickname">
          <div class="row playerRow">
            <div class="nickname col-md-4">
              {{player.nickname}}:
            </div>
            <div class="suggestion col-md-6">
              {{player.suggestion}}
            </div>
            <div class="vote-button col-md-2">
            </div>
          </div>
      </li>
    </ol>
  </div>
</template>
<script>
    import store from './store'

    export default {
        name: 'PlayerList',
        props: ['players'],
        data() {
            return {
                sharedState: store.state
            }
        }
    }
</script>
<style>
    body {
        margin: 0;
        padding: 0;
    }
    
    ol.nonelist {
        list-style-type: none;
    }
    
    .playerListItem {
        background-color: #f5f5f0;
    }
    
    .nickname {
        display: inline-block;
        text-align: center;
        width: 100px;
        height: 50px;
        padding: 15px 0;
    }
    
    .suggestion {
        display: inline-block;
        width: 300px;
        height: 50px;
        text-align: left;
        word-wrap: break-word;
        border: 2px solid gray;
        background-color: #FFFFFF;
    }
    
    .vote-button {
        display: inline-block;
        background-image: url('../assets/heart-icon.png');
        background-repeat: no-repeat;
        width: 32px;
        height: 32px;
        cursor: pointer;
    }
    
    .vote-button:hover {
        background-image: url('../assets/heart-icon-hover.png');
    }
    
    .displayblock {
        display: block;
    }
</style>