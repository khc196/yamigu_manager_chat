<template>
  <div class="booker">
    <div class="chat">
          <div class="msg-header">
              <div class="active">
                  <h5>{{ this.$store.state.current_room_title }}</h5>
              </div>
          </div>
        <div class="chat-box" v-chat-scroll>
        <b-list-group>
          <b-list-group-item class="chat-item" v-for="chat in chats" :key="chat.key">
            <div>
            
              <div class="chat-message text-right" v-if="chat.idSender === uid">
                <tt class="msg-date">{{chat.sendDate}}</tt>
                <div class="right-bubble">
                  <span class="msg-name">Me</span>
                  <p text-wrap>{{chat.message}}</p>
                </div>  
              </div>
              <div class="chat-message text-left" text-left v-if="chat.idSender !== uid">
                <div class="left-bubble">
                  <span class="msg-name">{{chat.userName}}</span>
                  <p text-wrap>{{chat.message}}</p>
                </div>
                <tt class="msg-date">{{chat.sendDate}}</tt>
              </div>

            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
      <footer class="sticky-footer">
        <b-form @submit="onSubmit">
          <b-input-group>
              <b-form-input id="message" v-model.trim="data.message" placeholder="Enter your message"></b-form-input>
              <b-button type="submit" variant="primary" :disabled="!data.message">Send</b-button>
          </b-input-group>
        </b-form>
      </footer>
    </b-col>
  </b-row>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll);
import firebase, {auth} from '@/services/fireinit.js'
export default {
  name: 'Chat',
  data () {
    return {
        data: { type:'', nickname:'', message:'' },
        chats: [],
        errors: [],
        offStatus: false
    }
  },
  computed: {
      roomname(){ return this.$store.state.current_room_title},
      nickname(){ return this.$store.state.userInfo.nickname },
      uid(){return this.$store.state.userInfo.uid },
      roomid(){ return this.$store.state.current_room_id}, 
      //token() { return this.$store.state.firebase_token},
  },
  created () {
    this.data.message = '';
    firebase.database().ref('message/'+this.roomid).on('value', (snapshot) => {
      this.chats = [];
      snapshot.forEach((doc) => {
        let item = doc.val()
        item.key = doc.key  
        var date = new Date(item.time * 1000);
        item.sendDate = ('0'+date.getHours()).slice(-2) + ":" +  ('0'+date.getMinutes()).slice(-2);
        this.chats.push(item)
      });
    });
  },
  methods: {
    onSubmit (evt) {
        evt.preventDefault()
        
        let newData = firebase.database().ref('message/'+this.roomid).push();
        newData.set({
            id: newData.key,
            idSender: this.$store.state.userInfo.uid,
            message: this.data.message,
            time: + new Date(),
            userName: this.nickname
        });
        this.data.message = '';
    },
  }
}
</script>
<style>
  .msg-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index:100;
    padding:10px;
    background:#FFF;
  }
  .chat-box {
    padding-top: 30px;
    padding-bottom: 50px;
    height: 100%;
    width: 100%;
  }
  .chat-item {
    border: none;
  }
  .chat-status {
    min-height: 49px;
  }
  .chat-status .chat-date {
    display: block;
    font-size: 10px;
    font-style: italic;
    color: #999;
    height: 15px;
    left: 10%;
    right:10%;
  }
  .chat-status .chat-content-center {
    padding: 5px 10px;
    background-color: #e1e1f7;
    border-radius: 6px;
    font-size: 12px;
    color: #555;
    height: 34px;
    left: 10%;
    right:10%;
  }
  .chat-message {
    max-width: 100%;
    min-height: 40px;
  }
  .chat-message .right-bubble {
    position: relative;
    background: #dcf8c6;
    border-top-left-radius: .4em;
    border-bottom-left-radius: .4em;
    border-bottom-right-radius: .4em;
    padding: 5px 10px 10px;
    display:inline-block;
  }
  .chat-message .right-bubble span.msg-name {
    font-size: 12px;
    font-weight: bold;
    color: green;
    display: block;
    display:inline-block;
  }
  .chat-message .right-bubble span.msg-date {
    font-size: 10px;
    display: block;
  }
  .chat-message tt.msg-date {
    position:relative;
    top: 20px;
    font-size: 12px;
    color: #999;
  }
  .chat-message .right-bubble:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
    height: 0;
    border: 27px solid transparent;
    border-left-color: #dcf8c6;
    border-right: 0;
    border-top: 0;
    margin-top: -0.5px;
    margin-right: -27px;
  }
  .chat-message .left-bubble {
    position: relative;
    background: #efefef;
    border-top-right-radius: .4em;
    border-bottom-left-radius: .4em;
    border-bottom-right-radius: .4em;
    padding: 5px 10px 10px;
    display:inline-block;
  }
  .chat-message .left-bubble span.msg-name {
    font-size: 12px;
    font-weight: bold;
    color: blue;
    display: block;
  }
  .chat-message .left-bubble span.msg-date {
    font-size: 10px;
    display: block;
  }
  .chat-message .left-bubble tt.msg-date {
    font-size: 10px;
    display:inline-block;

  }
  .chat-message .left-bubble:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    border: 27px solid transparent;
    border-right-color: #efefef;
    border-left: 0;
    border-top: 0;
    margin-top: -0.5px;
    margin-left: -27px;
  }
  footer.sticky-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    background-color: #ffffff;
    border-top: solid 1px #efefef;
  }
</style>