<issues>
  <script>
    this.action = new (require('./assets/javascripts/actions/issues'))(this)
    this.store  = new (require('./assets/javascripts/stores/issues'))(this)
  </script>
  <div if={ issues.length === 0 }>
    <p>Issue Not Found</p>
  </div>
  <ul class={ isMenuShown ? 'background' : '' }>
    <li each={ issues } class={ status.color }>
      <section>
        <p><img src={ issueType.iconUrl } title={ issueType.name }>{ key }</p>
        <h1><a href="#" onclick={ action.openIssue.bind(action) }>{ summary }</a></h1>
      </section>
    </li>
  </ul>
</issues>
