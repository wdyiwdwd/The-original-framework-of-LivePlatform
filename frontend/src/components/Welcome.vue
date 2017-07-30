<template>
  <div id="welcome">
  	<div>
  	<p>Welcome To Our Demo</p>
	<router-link to="/hello" class="link">Go to Hello&nbsp;&nbsp;&nbsp;</router-link>
	<router-link to="/signup" class="link">Go to Signup</router-link>
	<div>
  </div>
</template>

<style scoped>
#welcome {
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
}
</style>
