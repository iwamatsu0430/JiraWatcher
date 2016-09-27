<loading>
  <script>
    this.action = new (require('./assets/javascripts/actions/loading'))(this)
    this.store  = new (require('./assets/javascripts/stores/loading'))(this)
  </script>
  <div class="background {isShown ? '' : 'hidden'}">
    <div class="circle">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</loading>
