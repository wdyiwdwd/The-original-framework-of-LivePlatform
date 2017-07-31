<template>
    <Row>
        <Col span="8" offset="8">
        <Card id="signup" shadow>
            <p slot="title" id="title">Sign Up</p>
            <Form ref="signinfo" :label-width="80" :model="signinfo" :rules="ruleSignup">
                <Form-item>
                <Button-group id="selectType">
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
                <Form-item class="submit-item">
                    <Button type="primary" @click="sendEmail()" class="submit"  v-if="this.type === 1">SendEmail</Button>
                    <Button type="primary" @click="sendMessage()" class="submit" v-else>SendMessage</Button>
                    <Modal v-model="modal" title="Waiting Verification" ok-text="Signup"
                    cancel-text="Cancel">
                        <Row>
                        <Col span="14" offset="1">
                            <Input v-model="verification" placeholder="please input your Verification"></Input>
                        </Col>
                        <Col  span="4" offset="5">
                            <Button type="primary" @click="resend()" disabled>{{time}}</Button>
                        </Col>
                        </Row>
                    </Modal>
                </Form-item>
            </Form>
        </Card>    
        </Col>
    </Row>
</template>

<script>
    export default {
        data() {
            //this is for check password
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('please input password'));
                } else {
                    if (this.signinfo.passwordCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.signinfo.validateField('passwordCheck');
                    }
                    callback();
                }
            }
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('please repeat password'));
                } else if (value !== this.signinfo.password) {
                    callback(new Error('not same as before'));
                } else {
                    callback();
                }
            }
            return {
                // 0 means email 1 means phone
                type: 0,
                signinfo: {
                    email: '',
                    phone: '',
                    password: '',
                    passwordCheck: '',
                    nickname: '',    
                    gender: 0,
                },
                modal: false,
                time: 60,
                verification: '',
                ruleSignup: {
                    email: [
                        { required: true, message: 'please input email', trigger: 'blur' },
                        { type: 'email', message: 'this is not an email', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: 'please input phone', trigger: 'blur' },
                        { type: 'number', message: 'this is not an phone', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, validator: validatePass, trigger: 'blur' },
                        { type: 'string', min: 6, message: 'password must be more than 6 chars', trigger: 'blur' }
                    ],
                    passwordCheck: [
                        { required: true, validator: validatePassCheck, trigger: 'blur' }
                    ],
                    nickname: [
                        { required: true, message: 'please input nickname', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'nickname must be more than 6 chars', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: 'please choose gender', trigger: 'change' }
                    ],
                },
            }
        },
        computed: {
            phoneButton(){
                return (this.type === 0)? "primary" : "ghost"
            },
            emailButton(){
                return (this.type === 1)? "primary" : "ghost"
            },
        },
        methods: {
            changeType(){
                this.type = (this.type === 0)? 1 : 0 
            },
            sendEmail(){
                this.modal = true
            },
            sendMessage(){
                this.modal = true
            },
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
#selectType{
    float: right;
}
#title {
    margin-left:20px;
}
.submit{
    float: right;
}
.submit-item{
    margin-top: 15%;
}
</style>
