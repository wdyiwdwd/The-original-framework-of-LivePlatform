<template>
  <div class="signup">
    <form @submit.prevent="submit">
    	<label>username: </label>
    	<input type="text" name="username" v-model.number="username">
    	<label>password: </label>
    	<input type="text" name="password" v-model.number="password">
    	<input type="submit" name="submit" value="submit">
    </form>

    <input type="button" name="login" value="login" @click="login">

    <input type="text" name="reusername" v-model.number="reusername">
    <input type="button" value="this username repeat?" @click="findrepeat()">

    <div>
        <input type="button" value="build websocket" @click="buildwebsocket()">
        <input type="button" value="send websocket" @click="sendmessage()">
        <input type="button" value="close websocket" @click="closewebsocket()">
    </div>

    <div>
        <div>{{ count }}</div>
        <input type="button" value="increace" @click="increace()">66
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            reusername: '',
            email: '',
            socket: '',
        }
    },
    computed: {
        count () {
          return this.$store.getters.getCount
        }
    },
    methods: {
      //for vuex
      increace(){
        this.$store.commit('increment')
      },
      //for link backend
      submit: function(){
        alert('username: '+this.username)
        alert('password: '+this.password)
		this.$http({
            url: '/signup',
            method: 'GET',
            params: {
                username: this.username,
                password: this.password
            }
        }).then(function (res) {
            alert(res.body)
            //this.$router.push({path: '/hello', query:{data: res.body}})
        }, function () {
            alert("ajax failure")
        })
    	},
      login(){
        alert('username: '+this.username)
        alert('password: '+this.password)
        this.$http({
            url: '/login/',
            method: 'POST',
            body: {
                username: this.username,
                password: this.password,
            },
        }).then(function (res) {
            alert(res.body)
            this.$router.push({path: '/hello', query:{data: res.body}})
        }, function () {
            alert("ajax failure")
        })
      },
      findrepeat(){
        alert('reusername: '+this.reusername)
        this.$http.get(
            '/findre?reusername='+this.reusername
        ).then(function (res) {
            alert(res.body)
        }, function () {
            alert("ajax failure")
        })
      },
      buildwebsocket(){
        if(this.socket === '' || this.socket.readyState == WebSocket.CLOSED){
          this.socket = new WebSocket("ws://" + window.location.host + "/websocket/")
        }
        this.socket.onopen = function () {
            console.log('WebSocket open')//成功连接上Websocket
        }
        this.socket.onmessage = function (e) {
            console.log('message: ' + e.data)//打印出服务端返回过来的数据
        }
      },
      sendmessage(){
            //如果未连接到websocket
            if(this.socket === '' || this.socket.readyState == WebSocket.CLOSED) {
                alert("websocket未连接.")
            } else {
                this.socket.send("666")//通过websocket发送数据
            }
      },
      closewebsocket(){
        if (this.socket!=='' && this.socket.readyState == WebSocket.OPEN) {
            this.socket.close();//关闭websocket
            console.log('websocket已关闭')
        }
      }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
