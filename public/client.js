var app = new Vue({
    el: '#app',
    data: {
        title: 'write.io',
        nickname: ''
    },

    methods: {
        login: function () {
            alert("Hello " + this.nickname);
        }
    }
})
