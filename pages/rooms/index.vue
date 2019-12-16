
<template>
  <div v-if="this.$store.state.userInfo" class="container-fluid">
    <div class="row">
      <div class="col-sm-1 col-md-2 col-lg-3">
      </div>
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 nopadding">
        <template v-for="(room, index) in roomlist">
            <room-card :room="room"/>
        </template>
      </div>
      <div class="col-sm-1 col-md-2 col-lg-3">
      </div>
    </div>
  </div>
</template>
<script>
import RoomCard from '~/components/RoomCard.vue';

export default {
  head() {
    return {
      title: "yamigu chat app"
    };
  },
   components: {
    RoomCard,
  },
  data: function() {
    return {
    }
  },
  async asyncData ({ $axios, params, store}) {
    let resroomlist = [];
    await $axios.$get('/manager/chatting_room_list/')
      .then( response => {
        resroomlist = response;
        function compare(a, b) {
          if (a.meeting_info.date < b.meeting_info.date)
            return -1;
          if (a.meeting_info.date > b.meeting_info.date)
            return 1;
          return 0;
        }
        resroomlist.sort(compare);
      }
    )
    return { 
      roomlist: resroomlist,
    };
  },
};
</script>
<style>
header {
  min-height: 100vh;
  background-image: linear-gradient(
      to bottom,
      rgba(253, 158, 15, 1.0),
      rgba(252, 110, 42, 1.0)
    ),
    url("/images/yamigu_main.jpg");
  background-position: center;
  background-size: cover;
  position: relative;
}
.text-box {
  position: absolute;
  top: 50%;
  left: 35%;
  transform: translateY(-50%);
  color: #fff;
}
.text-box h1 {
  font-family: cursive;
  font-size: 5rem;
}
.text-box p {
  font-size: 2rem;
  font-weight: lighter;
}
</style>