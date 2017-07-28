from django.conf.urls import url
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="index.html")),
    url(r'^signup/$', views.signup_submit, name='signup'),
    url(r'^findre/$', views.query_repeat_username, name='findre'),
    url(r'^websocket/$', views.websocket, name='websocket'),
]
