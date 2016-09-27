<modal>
  <script>
    this.action = new (require('./assets/javascripts/actions/modal'))(this)
    this.store  = new (require('./assets/javascripts/stores/modal'))(this)
  </script>

  <div class={ isShown ? '' : 'hidden' }>
    <div class="background" onclick={ action.submitNg }></div>
    <div class="front">
      <p>{ message }</p>
      <div>
        <a href="#" class="ok" onclick={ action.submitOk.bind(action) }>{ okText }</a>
        <a href="#" class="ng" if={ isSelector } onclick={ action.submitNg.bind(action) }>{ ngText }</a>
      </div>
    </div>
  </div>
</modal>
