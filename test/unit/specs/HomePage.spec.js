import Vue from 'vue'
import HomePage from 'src/components/HomePage'

describe('HomePage.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(HomePage)
    })
    expect(vm.$el.querySelector('.home h1').textContent)
      .to.equal('groupwrite.io')
  })
})
