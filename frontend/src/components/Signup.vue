<template>
    <Row>
        <Col span="8" offset="8">
        <Card id="signup" shadow>
            <p slot="title" id="title">Sign Up</p>
            <Form ref="signinfo" :label-width="90" :model="signinfo" :rules="ruleSignup">
                <Form-item>
                <Button-group id="select-type">
                    <Button :type="phoneButton" @click="changeType()">Phone</Button>
                    <Button :type="emailButton" @click="changeType()">Email</Button>
                </Button-group>
                </Form-item>
                <Form-item label="email:" v-if="this.type === 1" prop="email">
                    <Input v-model="signinfo.email" placeholder="please input your EMAIL"></Input>
                </Form-item>
                <Form-item label="phone:" v-else prop="phone">
                    <Input v-model="signinfo.phone" placeholder="please input your PHONE"></Input>
                </Form-item>
                <Form-item label="password:" prop="password">
                    <Input v-model="signinfo.password" placeholder="please input your PASSWORD" type="password"></Input>
                </Form-item>
                <Form-item label="repeat:" prop="passwordCheck"> 
                    <Input v-model="signinfo.passwordCheck" placeholder="please repeat your PASSWORD" type="password"></Input>
                </Form-item>
                <Form-item label="nickname:" prop="nickname">
                    <Input v-model="signinfo.nickname" placeholder="please input your NICKNAME"></Input>
                </Form-item>
                <Form-item label="gender:" prop="gender">
                    <Radio-group v-model="signinfo.gender">
                        <Radio label="female"></Radio>
                        <Radio label="male"></Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="verification:" prop="verification">
                <Row>
                    <Col span="12">
                    <Input v-model="signinfo.verification" placeholder="Input VERIFICATION"></Input>
                    </Col>
                    <Col span="6" offset="6">
                    <Button type="primary" v-if="this.state === 'unsent'" @click="achieveVerification()">Achieve</Button>
                    <Button type="primary" disabled v-else id="time-button">{{time}}</Button>
                    </Col>
                </Row>
                </Form-item>
                <Form-item id="submit-item">
                    <Button type="primary" @click="signup()" id="submit">Signupaa</Button>
                </Form-item>
            </Form>
        </Card>    
        </Col>
    </Row>
</template>

<script>
    const countDownNum = 60;
    export default {
        data() {
            //this is for check password
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('please input password'))
                } else {
                    if (this.signinfo.passwordCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.signinfo.validateField('passwordCheck')
                    }
                    callback()
                }
            }
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('please repeat password'))
                } else if (value !== this.signinfo.password) {
                    callback(new Error('not same as before'))
                } else {
                    callback()
                }
            }
            const validateVerification = (rule, value, callback) => {
                console.log(value)
                console.log(this.code)
                if(this.code === '' || value.toString() !== this.code.toString()){
                    callback(new Error('verification error'))    
                }
                else{
                    callback()
                }
            }
            return {
                // 0 means phone 1 means email
                type: 0,
                signinfo: {
                    email: '',
                    phone: '',
                    password: '',
                    passwordCheck: '',
                    nickname: '',    
                    gender: '',
                    verification: '',
                },
                time: countDownNum,
                code: '',
                state: 'unsent',
                ruleSignup: {
                    email: [
                        { required: true, message: 'please input email', trigger: 'blur' },
                        { type: 'email', message: 'this is not an email', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: 'please input phone', trigger: 'blur' },
                        { type: 'string', min: 11, max: 11, message: 'this is not an phone', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, validator: validatePass, trigger: 'blur' },
                        { type: 'string', min: 6, max: 25, message: 'password must be more than 6 chars less than 25', trigger: 'blur' }
                    ],
                    passwordCheck: [
                        { required: true, validator: validatePassCheck, trigger: 'blur' }
                    ],
                    nickname: [
                        { type: 'string', min: 6, max: 20, message: 'nickname must be more than 6 chars less than 20', trigger: 'blur' }
                    ],
                    verification: [
                        { required: true, validator: validateVerification, trigger: 'blur' },
                        { type: 'string', min: 4, max: 4, message: 'verification must be 4 numbers', trigger: 'blur' }
                    ],
                },
            }
        },
        computed: {
            phoneButton() {
                return (this.type === 0)? "primary" : "ghost"
            },
            emailButton() {
                return (this.type === 1)? "primary" : "ghost"
            },
            randomCode(){
                this.code = Math.random()*8999+1000
                return Math.floor(this.code)
            }
        },
        methods: {
            changeType() {
                this.type = (this.type === 0)? 1 : 0 
            },
            beginCountdown() {
                const countDown = () => {
                    this.time-=1
                    if(this.time <= 0){
                        this.state = 'unsent'
                        clearInterval(interval)
                        this.time = countDownNum
                    }
                }
                let interval = setInterval(function(){countDown()}, 1000)
            },
            handleSent() {
                let result = ''
                this.$refs['signinfo'].validate((valid) => {
                    result = valid
                    if (valid) {
                        this.$Message.success('Form legal')
                    } else {
                        this.$Message.error('Form illegal')
                    }
                })
                return result
            },
            achieveVerification() {
                this.state = 'sent'
                this.beginCountdown();
                (this.type === 0)? this.sendMessage() : this.sendEmail()                     
            },
            sendEmail() {
            },
            sendMessage() {
                let randomCode = this.randomCode
                this.code = randomCode
                let data = {
                    account: 'C78894239',
                    password:'25ff6ea6a323a00581db9424daefb7c9',
                    content:  'Your verification code is ' +randomCode+'. Do not reveal to others',
                    mobile: this.signinfo.phone,
                    format: 'json',
                }
                this.$http.jsonp(
                    'http://106.ihuyi.com/webservice/sms.php?method=Submit',
                {
                    params: data,
                    jsonp:'cb',
                }).then(function (res) {
                    this.$Message.success('Send Success')
                    //console.log(res.body)
                }, function (res) {
                    this.$Message.success('Send Success')
                    //console.log(res.status)
                })
            },
            signup() {
                if(this.handleSent()){

                }     
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#signup{
    background-color: rgba(255,255,255,0.95) ;
    margin-top: 10%;
    text-align: left;
}
#select-type{
    float: right;
}
#title {
    margin-left:20px;
}
#submit{
    float: right;
}
#submit-item{
    margin-top: 10%;
}
#time-button {
    float: right;
}
</style>
