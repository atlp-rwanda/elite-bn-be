import React, { Component } from 'react'
import GoogleLogin from 'react-google-login' 

export class App extends Component {

  responseGoogle = (response)=>{
    console.log(response);
    console.log(response.profileObj);
  }

  render() {
     return(
       <div>
         <script src="https://apis.google.com/js/platform.js" async defer></script>

         <meta name="google-signin-client_id" content="1029104825308-4ehtofb5c85969c0mbqqirpeuj6eq4n9.apps.googleusercontent.com"></meta>
         <div class="g-signin2" data-onsuccess="onSignIn"></div>

         <GoogleLogin
         clientID="1029104825308-4ehtofb5c85969c0mbqqirpeuj6eq4n9.apps.googleusercontent.com"
         buttonText="Login with Google"
         onSuccess={this.responseGoogle}
         onFailure={this.responseGoogle}
         cookiePolicy={'single_host_origin'}
        />
       </div>
     )
  }
}

export default App;
