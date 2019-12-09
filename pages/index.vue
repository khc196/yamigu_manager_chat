<template>
  <div class="header" style="text-align:center">
    <div class="text-box" style="text-align:center;">
      <h1>yamigu</h1>
      <div class="col-md-12"  style="text-align:center;">
      <tt>Chatting App for Managers ️</tt>
      </div>
      <!--nuxt-link class="btn btn-outline btn-large btn-info" to="/login">
      Login 
      </nuxt-link-->
      <div class="col-md-12" style="text-align:center; margin-top: 15px;">
          <img class="kakao-login-img"
          src="~/static/images/kakao_login.png" @click="loginWithKakao()"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "yamigu chat app",
      script: [
      { src: "//developers.kakao.com/sdk/js/kakao.min.js" }
    ]
    };
  },
  data() {
    return {
      appKey: 'a0192b38c89885f6149f20b02e35c5e4',
      login_fail : false,
      loggingin: false,
    }
  },
  methods: {
    loginWithKakao() {
      try {
        Kakao.init(this.appKey);
      }
      catch(e) {
      }
      this.loggingin = true;
      var axios = this.$axios;
      var store = this.$store;
      var router = this.$router;
      var res_access_token;
      Kakao.Auth.login({
        success: function(authObj) {
          res_access_token = authObj.access_token        
          return fetch('/oauth/kakao', {
            // 클라이언트 Cookies를 서버로 보냅니다.
            credentials: 'same-origin',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({res_access_token})
          })
          .then((res) => {
            if (res.status === 401) {
              throw new Error('Bad credentials')
              alert('로그인 정보가 올바르지 않습니다.')
            } else {
              return res.json()
            }
          })
          .then((authUser) => {
            store.commit('FIREBASE_SIGN_IN', authUser.userInfo.firebase_token)
            store.commit('SET_AUTH_TOKEN', authUser.auth)
            store.commit('SET_USER_INFO', authUser.userInfo)
            this.loggingin = false;
            router.push('rooms/');
            //location.href = "rooms/"
          })
        },
        fail: function(err) {
          alert(JSON.stringify(err));
        }
      });
    },
  }
};
</script>
<style>
.header {
  min-height: 100vh;
  background-image: linear-gradient(
      to bottom,
      rgba(253, 158, 15, 1.0),
      rgba(252, 110, 42, 1.0)
    ),
    url("/images/yamigu_main.jpg");
  background-position: center;
  background-size: cover;
  text-align: center;
  width: 100%;
}
.text-box {
  transform: translateY(50%);
  color: #fff;
}
.text-box h1 {
  font-family: cursive;
  font-size: 5rem;
}
.text-box tt {
  font-size: 1.2rem;
  font-weight: lighter;
}
.btn-info {
  width:50%;
  background: #000000;
  border: #000000;
  border-radius: 10px;
}
</style>
