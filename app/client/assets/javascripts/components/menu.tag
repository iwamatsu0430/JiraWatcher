<menu>
  <script>
    this.action = new (require('./assets/javascripts/actions/menu'))(this)
    this.store = new (require('./assets/javascripts/stores/menu'))(this)
  </script>

  <div class={isShown ? 'menu-list' : 'menu-button' }>
    <a href="#" onclick={ action.showMenu.bind(action) }>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 302 302" style="enable-background:new 0 0 302 302;" xml:space="preserve" width="512px" height="512px">
        <g>
        	<rect y="36" width="302" height="30" fill="#FFFFFF"/>
        	<rect y="236" width="302" height="30" fill="#FFFFFF"/>
        	<rect y="136" width="302" height="30" fill="#FFFFFF"/>
        </g>
      </svg>
    </a>
    <div>
      <search></search>
      <ul>
        <li><a href="#" class="yours" onclick={ action.showYours.bind(action) }>
          <img src={ avatar }>
          <p>Show your issues</p>
        </a></li>
        <li><a href="#" class="signout" onclick={ action.signOut.bind(action) }>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 457.518 457.518" style="enable-background:new 0 0 457.518 457.518;" xml:space="preserve">
          	<g>
          		<path d="M199.675,242.678c66.986,0,121.321-54.354,121.321-121.272C320.996,54.363,266.671,0,199.675,0   C132.643,0,78.385,54.373,78.385,121.406C78.385,188.324,132.633,242.678,199.675,242.678z" fill="#FFFFFF"/>
          		<path d="M353.011,275.975c-6.406-13.723-14.478-27.521-24.786-40.689c-5.546-7.057-15.663-14.802-25.445-20.109   c-25.36,28.42-62.118,46.416-103.104,46.416c-40.956,0-77.705-17.996-103.036-46.349c-9.562,5.431-19.412,13.177-24.776,20.214   C54.459,258.168,27.599,302.176,23.314,361.5c-0.899,12.518,5.059,31.633,15.52,38.93c19.852,13.895,62.673,31.672,151.833,31.672   c30.868,0,56.878-1.904,78.863-4.867c-8.874-14.967-14.066-32.369-14.066-50.998C255.454,321.836,298.974,277.504,353.011,275.975z   " fill="#FFFFFF"/>
          		<path d="M353.011,294.955c-44.886,0-81.281,36.395-81.281,81.281s36.396,81.281,81.281,81.281   c44.887,0,81.281-36.395,81.281-81.281C434.292,331.342,397.907,294.955,353.011,294.955z M349.406,427.09   c-8.004,0-12.145-5.145-12.145-11.428c0-5.852,4.57-11.139,11.714-11.139c7.851,0,12.145,4.713,12.145,11.139   C361.11,421.516,356.97,427.09,349.406,427.09z M364.113,375.08c-4.428,2.869-5.996,6.291-5.996,11.436v10.146h-17.854   c-0.573-4.15-1.434-12.287-1.434-15.854c0-12.719,6.426-15.865,13.291-20.148c4.571-2.869,7.995-5.289,7.995-10.434   c0-5.422-3.29-7.852-8.425-7.852c-4.284,0-8.712,1.139-12.288,2.143l-3.289-15.721c3.71-1.568,12.431-3.424,19.995-3.424   c23.858,0,27.291,14.287,27.291,21.574C383.4,361.807,375.684,367.516,364.113,375.08z" fill="#FFFFFF"/>
          	</g>
          </svg>
          <p>Sign out</p>
        </a></li>
        <li><a href="#" class="exit" onclick={ action.exit.bind(action) }>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 494.239 494.238" style="enable-background:new 0 0 494.239 494.238;" xml:space="preserve">
          	<g>
          		<path d="M199.725,0v36.025H85.211v421.66l114.514,0.094v36.459l209.085-37.555l0.216-418.867L199.725,0z M234.404,230.574   c7.022,0,12.715,7.408,12.715,16.545c0,9.139-5.692,16.545-12.715,16.545s-12.715-7.406-12.715-16.545   C221.688,237.982,227.382,230.574,234.404,230.574z M119.211,423.713V70.025h80.514v353.753L119.211,423.713z" fill="#FFFFFF"/>
          	</g>
          </svg>
          <p>Exit app</p>
        </a></li>
        <li><a href="#" class="close" onclick={ action.hideMenu.bind(action) }>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve">
          	<g id="close">
          		<polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3     214.2,178.5   " fill="#FFFFFF"/>
          	</g>
          </svg>
          <p>Close menu</p>
        </a></li>
      </ul>
    </div>
  </div>
</menu>
