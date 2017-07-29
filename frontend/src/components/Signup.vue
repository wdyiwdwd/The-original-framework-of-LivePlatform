<!--这个文件是我写的demo文件的页面部分，下面有注释具体都做了什么-->

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
        <input type="button" value="increace" @click="increace()">22
    </div>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

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
            before:  function(request) {
             function getCookie(name) {
                 var cookieValue = null;
                 if (document.cookie && document.cookie != '') {
                     var cookies = document.cookie.split(';');
                     for (var i = 0; i < cookies.length; i++) {
                         var cookie = (new String(cookies[i])).trim();
                         // Does this cookie string begin with the name we want?
                         if (cookie.substring(0, name.length + 1) == (name + '=')) {
                             cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                             break;
                         }
                     }
                 }
                 return cookieValue;
             }
             if (!(/^http:.*/.test(request.url) || /^https:.*/.test(request.url))) {
               
                 // Only send the token to relative URLs i.e. locally.
                  alert(getCookie('csrftoken'))
                  alert(request.url)
                  console.log(request.headers.set('X-CSRFToken', getCookie('csrftoken')))
             }
            }, 
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
      //通过websocket协议进行发送消息，接收消息
      sendmessage(){
            //如果未连接到websocket
            if(this.socket === '' || this.socket.readyState == WebSocket.CLOSED) {
                alert("websocket未连接.")
            } else {
                this.socket.send("666")//通过websocket发送数据
            }
      },
      //关闭websocket链接
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
