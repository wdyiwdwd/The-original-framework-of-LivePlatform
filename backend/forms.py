from django import forms
from .models import Test

class TestForm(forms.ModelForm):
	class Meta:
		model = Test
		fields = ('content',)