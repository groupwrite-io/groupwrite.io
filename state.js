var express = require('express');

var State = {
    state: {
        players: []
    },
    clearAll : function(){
        State.state.players=[];
    }
};

module.exports = State;
