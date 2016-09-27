<signin>
  <script>
    this.action = new (require('./assets/javascripts/actions/signin'))(this)
    this.store  = new (require('./assets/javascripts/stores/signin'))(this)
  </script>
  <h1>JIRA WATCHER</h1>
  <form>
    <section>
      <input name="domain" type="text" value={ domainValue } placeholder="Your domain">
    </section>
    <section>
      <input name="email" type="email" value={ emailValue } placeholder="Email address / Username">
    </section>
    <section>
      <input name="password" type="password" placeholder="Password">
    </section>
    <section>
      <button onclick={ action.signIn.bind(action) }>SignIn</button>
    </section>
  </form>
</signin>
