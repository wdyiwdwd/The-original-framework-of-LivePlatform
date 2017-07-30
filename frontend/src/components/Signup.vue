<!--这个文件是我写的demo文件的页面部分，下面有注释具体都做了什么-->

<template>
  <div class="signup">
    <img src="../assets/logo.png">
    <form @submit.prevent="submit">
    	<label>username: </label>
    	<input type="text" name="username" v-model.number="username">
    	<label>password: </label>
    	<input type="text" name="password" v-model.number="password">
    	<input type="submit" name="submit" value="signup">
    </form>
    <div>
      <input type="button" name="login" value="login" @click="login">
    </div>
    <div>
      <input type="text" name="reusername" v-model.number="reusername">
      <input type="button" value="this username repeat?" @click="findrepeat()">
    </div>
    <div>
        <input type="button" value="build websocket" @click="buildwebsocket()">
        <input type="button" value="send websocket" @click="sendmessage()">
        <input type="button" value="close websocket" @click="closewebsocket()">
    </div>

    <div>
        <div>{{ count }}</div>
        <input type="button" value="increace" @click="increace()">
    </div>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import { beforePost, } from '../utils/utils'
import { wsConnect, wsSend, wsClose} from '../utils/websockets'

export default {
    //双向绑定的数据部分
    data() {
        return {
            username: '',
            password: '',
            reusername: '',
            email: '',
            socket: ''
        }
    },
    //这两个map是vuex的部分
    computed: {
        ...mapGetters({
          count: 'getCount'
        }),
    },
    methods: {
      //for vuex
        ...mapMutations({
          increace: 'increment'
        }),
      //for link backend
      //提交表单，用于注册，GET请求，返回字符串
      submit: function(){
        alert('username: '+this.username)
        alert('password: '+this.password)
		    this.$http({
            url: '/signup/',
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
        //用于登录，POST请求，返回字符串，透过前端路由跳转页面
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
            before: function(request){beforePost(request)},
        }).then(function (res) {
            alert(res.body)
            this.$router.push({path: '/hello', query:{data: res.body}})
        }, function () {
            alert("ajax failure")
        })
      },
      //查找这个用户名是否数据库中有重复
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
      //建立websocket链接
      buildwebsocket(){
        alert('websocket connect')
        this.socket = wsConnect('/websocket/', function(e){
            alert('receive message from server: ' + e.data)
        })
        },
      /*buildwebsocket(){
        if(this.socket === '' || this.socket.readyState == WebSocket.CLOSED){
          this.socket = new WebSocket("ws://" + window.location.host + "/websocket/")
        }
        this.socket.onopen = function () {
            console.log('WebSocket open')//成功连接上Websocket
        }
        this.socket.onmessage = function (e) {
            console.log('message: ' + e.data)//打印出服务端返回过来的数据
        }
      },*/
      //通过websocket协议进行发送消息，接收消息
      sendmessage(){
          alert('sent message to server')
           wsSend(this.socket, "666")
      },
      //关闭websocket链接
      closewebsocket(){
            alert('websocket close')
            wsClose(this.socket)
      }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
