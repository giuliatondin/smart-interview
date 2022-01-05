AFRAME.registerComponent('score-counter', {
  schema: {
    el: {
      type: 'selector'
    },
    score:{
      type: 'int',
      default: 0
    },
  },

  init: function () {
    var sceneEl = document.querySelector('a-scene'); 
    var scoreBoard = document.querySelector('#score');
    
    sceneEl.querySelector('.focus').addEventListener('mouseleave', () => {
        this.data.score++;
      
        if(this.data.score <= 5) {
          var newScore = 'Voce desviou o olhar apenas ' + this.data.score + ' vezes, muito bem!'
          scoreBoard.setAttribute('text', 'value',  newScore)
        } else {
          var newScore = 'Voce desviou o olhar ' + this.data.score + ' vezes, lembre-se de manter o contato visual da proxima vez!'
          scoreBoard.setAttribute('text', 'value',  newScore)
        }
    })
  }
});