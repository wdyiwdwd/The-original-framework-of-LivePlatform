from django.http import HttpResponse
from django.contrib.auth.models import User
from .models import Test
from .forms import TestForm
from dwebsocket.decorators import accept_websocket,require_websocket
from django.views.decorators.csrf import csrf_exempt
from django.contrib import auth
import json
# Create your views here.

#注册执行的函数，接收GET请求，返回字符串
def signup_submit(request):
	username = request.GET.get('username')
	password = request.GET.get('password')
	print(username)
	print(password)
	try:
		user = User.objects.create_user(username=username, password=password)
		return HttpResponse("signup success")
	except:
		return HttpResponse("signup failure")

#登录执行的函数，接收POST请求，返回字符串，注意@csrf_exempt目前来说必不可少
#@csrf_exempt
def login_submit(request):
	print(request.body.decode('utf-8'))
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	user = auth.authenticate(request, username=body['username'], password=body['password'])
	if not user:
		return HttpResponse("login failure")
	auth.login(request, user)
	return HttpResponse("login success")

#查找用户名是否存在函数，接收GET请求，返回字符串
def query_repeat_username(request):
	get_username = request.GET.get('reusername')
	print(get_username)
	try:
		has_email = User.objects.get(username=get_username)
		if(has_email):
			return HttpResponse("username repeat")			
	except:
		return HttpResponse("username is ok") 

#向一个TEST表中写入数据，通过django的form形式，比较简单，注意forms.py这个文件
def insert(request):
	params = request.POST if request.method == 'POST' else None
	form = PostForm(params)
	if form.is_valid():
		form.save()
		return HttpResponse("insert success")
	return HttpResponse("insert failure")

#websocket的服务器端，接收消息返回消息
@require_websocket
def websocket(request):
	for message in request.websocket:
		params = {'content' :message.decode(encoding='utf-8')}
		form = TestForm(params)
		if form.is_valid():
			form.save()
			request.websocket.send("insert success: ".encode(encoding='utf-8') + message)
		else:
			request.websocket.send("insert failure: ".encode(encoding='utf-8') + message)