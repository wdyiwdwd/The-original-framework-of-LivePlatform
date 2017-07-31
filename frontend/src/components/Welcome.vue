<template>
  	<!--div>
  	<p>Welcome To Our Demo</p>
	<router-link to="/hello" class="link">Go to Hello&nbsp;&nbsp;&nbsp;</router-link>
	<router-link to="/signup" class="link">Go to Signup</router-link>
	<div-->
	<Carousel id="carousel" :height="auto" v-model="value" :trigger="hover">
        <Carousel-item>
            <div class="demo-carousel" id="carousel1">
            	<hello></hello>
            </div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel" id="carousel2">
            	<h1 id="welcome">Welcome To Our Demo</h1>
            	<Button type="text" class="link" @click="goLeft()">Go to Hello</Button>
            	<Button type="text" class="link" @click="goRight()">Go to Test</Button>
            </div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel" id="carousel3">
            	<signup></signup>
            </div>
        </Carousel-item>
    </Carousel>
</template>

<script>
import Hello from './Hello'
import Signup from './Signup'

export default {
	components: {
	    Hello,
	    Signup
  	},
	data() {
        return {
            value: 1,
        }
    },
    methods:{
    	goLeft(){
    		this.value = 0
    	},
    	goRight(){
    		this.value = 2
    	}
    }
}
</script>

<style scoped>
/*#welcome {
	height: 732px;
	background-repeat: no-repeat;
	background-image: url("../assets/bg1.jpg");
	border:1px solid white;
}
p{
	color: white;
	font-size: 50px;
	padding-top: 250px;
}
.link {
	display: inline-block;
	color: white;
	font-size: 40px;
	text-decoration:none;
}*/

.demo-carousel {
	background-repeat: no-repeat;
	background-size: 100% 100%;  
	height: 630px;
}

#carousel1 {
	background-image: url(../assets/bg3.jpg);
}

#carousel2 {
	background-image: url(../assets/bg2.jpg);
	color: white !important;
}

#carousel3 {
	background-image: url(../assets/bg1.jpg);
}

.link {
	padding-top: 30px;
	color: white;
	font-size: 30px;
}

.link:hover {
	color: gray;
	font-size: 30px;
}

#welcome {
	font-size: 35px;
	padding-top: 250px;
}
</style>
