<template>
  <div class="game">
    <h1>Welcome {{sharedState.myNickname}}</h1>
    <form>
      <textarea rows=3 cols=50 id='mytext' placeholder="Enter your text here" v-model="suggestionText" v-on:keyup="syncText"></textarea>
    </form>
    <div id='center'>
      <player-list></player-list>
      <quit-button></quit-button>
    </div>
    <div id='right'>
      <div id='story'>
        <h1>The Story's Title</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tempor est, at hendrerit nulla. Etiam ipsum sem,
          pellentesque non mauris sed, ultrices vulputate nibh. Ut a ultricies felis. Integer sit amet faucibus dui, in porttitor
          leo. Curabitur non quam nec eros varius sagittis sit amet vel tortor. Ut vel gravida mauris. Nulla malesuada auctor
          sollicitudin.
        </p>

        <p>Nam egestas suscipit ante eget tincidunt. Donec vitae semper nisi. Sed dapibus condimentum turpis vitae rutrum. Interdum
          et malesuada fames ac ante ipsum primis in faucibus. Proin velit nulla, lacinia pulvinar velit quis, consequat
          congue odio. Vestibulum viverra dolor quis lectus vulputate ullamcorper. Vestibulum faucibus lobortis auctor. Nulla
          varius turpis lectus, non hendrerit neque dictum venenatis. Ut eu tristique quam, non volutpat nibh. Aliquam erat
          volutpat. Nullam rhoncus eget felis vel lacinia. Quisque vulputate massa sit amet ligula consequat, ut cursus tortor
          luctus. Morbi vel suscipit turpis, et convallis velit.</p>

        <p>Curabitur rhoncus viverra turpis, nec sagittis diam. Pellentesque accumsan non orci maximus finibus. Integer consectetur
          nulla lacus, a interdum massa molestie et. Etiam justo massa, ullamcorper laoreet sollicitudin a, ullamcorper vel
          enim. Integer non orci purus. Sed interdum dapibus magna, in aliquet augue tincidunt nec. Fusce tristique vestibulum
          neque, non suscipit felis congue vel. Pellentesque porttitor, nunc in porttitor convallis, lacus ex bibendum risus,
          vitae bibendum ipsum ex id velit. Etiam vestibulum in lacus sed auctor. Aliquam at ligula lectus. Duis malesuada
          ex non dignissim posuere. Nullam tincidunt purus sed libero lobortis faucibus. Proin mi sapien, pretium id magna
          laoreet, ullamcorper euismod metus.</p>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sodales arcu luctus erat placerat porta. Donec ipsum
          ex, commodo ac elit nec, ullamcorper finibus tortor. Cras eu nisi non elit pharetra fermentum non at dui. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus vulputate elit libero, nec tincidunt
          metus euismod non. Proin cursus, dolor ac iaculis vehicula, mi nisl egestas nisi, id aliquam nibh neque sed sapien.
          Quisque a dapibus libero. Integer sit amet quam lectus.</p>

        <p>Nunc quis tortor arcu. Maecenas dictum arcu lorem, eu vestibulum libero faucibus eget. Praesent a sapien dui. Mauris
          molestie odio vitae sem lobortis, in vehicula lorem congue. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Nunc fermentum rutrum velit, id faucibus dolor consectetur ac. Morbi vitae purus scelerisque felis imperdiet
          cursus. Donec congue dapibus finibus. Nullam consectetur mi diam, ut consequat neque blandit vehicula. Donec tristique
          hendrerit diam non luctus. Morbi egestas, urna id elementum condimentum, orci ligula hendrerit lacus, eu viverra
          elit lorem vel sem. Donec sed cursus lacus. Curabitur consequat ante dui, id fermentum nunc cursus at. Nam vitae
          risus aliquam, luctus lorem efficitur, suscipit risus. Morbi luctus nisi sed aliquam placerat. Pellentesque nec
          posuere leo.</p>

        </h2>The End</h2>
      </div>
    </div>
  </div>
</template>
<script>
  // import assert from 'assert'
  import store from './store'
  import PlayerList from './PlayerList.vue'
  import QuitButton from './QuitButton'

  export default {
    name: 'Game',
    components: {
      PlayerList,
      QuitButton
    },
    data() {
      return {
        sharedState: store.state,
        suggestionText: ''
      }
    },
    methods: {
      syncText: function () {
        // console.log(`player entered text ${this.suggestionText}`)
        var request = require('superagent')
        console.log(this.sharedState.playerId)
        request.post('/api/suggest', {
          // TODO delete when we have session
          playerId: this.sharedState.playerId,
          suggestion: this.suggestionText
        }, function (err, state) {
          // TODO handle login failure
          if (err) {
            console.log(err)
          }
        })
      }
    },
    mounted: function () {
      document.getElementById('mytext').focus()

      var audio = new window.Audio('./static/ding.ogg')
      audio.play()
    }
  }

</script>
<style>
  #center {
    width: 300px;
    display: inline-block;
  }

  #right {
    width: 500px;
    display: inline-block;
    position: fixed;
    margin-right: 50px;
    margin-left: 50px;
  }
</style>