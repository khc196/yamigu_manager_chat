<template>
  <div v-if="room.manager_call" :id="room.id" class="room-card-called" v-on:click="enterRoom($event, room.id, room.meeting_info.date + ' || ' + room.meeting_info.type + ' || ' + room.receiver_info.nickname + '(' + room.receiver_info.age + ')' + ', ' + room.sender_info.nickname + '(' + room.sender_info.age + ')', true)">
  <div class="card-info-div">
      <div class="card-name-div">
        <tt class="card-name"> {{ room.receiver_info.nickname }}({{room.receiver_info.age}}세, {{room.receiver_info.gender}}, {{room.receiver_info.belong}}, {{room.receiver_info.department}})</tt>
      </div>
       <div class="card-name-div">
        <tt class="card-name"> {{ room.sender_info.nickname }}({{room.sender_info.age}}세, {{room.sender_info.gender}}, {{room.sender_info.belong}}, {{room.sender_info.department}}) </tt>
      </div>
    </div>
    
    <div class="meeting-info-div">
      <span class="meeting-info-span">
      <tt>{{ room.meeting_info.date }} - {{ room.meeting_info.type }}</tt>
      </span>
    </div>
  </div>
  <div v-else :id="room.id" class="room-card" v-on:click="enterRoom($event, room.id, room.meeting_info.date + ' || ' + room.meeting_info.type + ' || ' + room.receiver_info.nickname + '(' + room.receiver_info.age + ')' + ', ' + room.sender_info.nickname + '(' + room.sender_info.age + ')', false)">
    <div class="card-info-div">
      <div class="card-name-div">
        <tt class="card-name"> {{ room.receiver_info.nickname }}({{room.receiver_info.age}}세, {{room.receiver_info.gender}}, {{room.receiver_info.belong}}, {{room.receiver_info.department}})</tt>
      </div>
       <div class="card-name-div">
        <tt class="card-name"> {{ room.sender_info.nickname }}({{room.sender_info.age}}세, {{room.sender_info.gender}}, {{room.sender_info.belong}}, {{room.sender_info.department}}) </tt>
      </div>
    </div>
    
    <div class="meeting-info-div">
      <span class="meeting-info-span">
      <tt>{{ room.meeting_info.date }} - {{ room.meeting_info.type }}</tt>
      </span>
    </div>
  </div>
</template>
<script>
export default {
    head:{
      link: [
      ]
    },
    props: ["room"],
    methods : {
        enterRoom: function(event, id, title, is_called) {
            this.$store.commit('SET_CURRENT_ROOM_TITLE', title);
            this.$store.commit('SET_CURRENT_ROOM_ID', id)
            //location.href = event.currentTarget.id;
            this.$router.push(event.currentTarget.id)
            if(is_called) {
              this.$axios.$post('manager/enter_room/', {
                'match_id': id 
              });
            }
        }
    }
};
</script>
<style>

.room-card {
    box-shadow: 0 0.2rem 0.2rem rgba(0,0,0,.2);
    display: block;
    margin: 5px; 
}
.room-card-called {
    box-shadow: 0 0.2rem 0.2rem rgba(0,0,0,.2);
    background-color: #FFF2E6;
    display: block; 
    margin: 5px;
}
.card-info-div .card-name-div .card-name{
    font-weight: 700;
    font-size: 14px;
}
.meeting-info-div .meeting-info-span {
    font-size: 13px;
    font-weight: 400;
}
</style>