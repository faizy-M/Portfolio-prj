from django.shortcuts import render, redirect
from main.models import Item
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
# Create your views here.


def homepage(request):
    return render(request, template_name='main/home.html')


def itemspage(request):
    items = Item.objects.all()
    return render(request, template_name='main/items.html', context={'items': items})


def loginpage(request):
    return render(request, template_name='main/login.html')


def registerpage(request):
    if request.method == 'GET':
        return render(request, template_name='main/register.html')

    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            print('done!!!!')
            return redirect('home')
        else:
            print('error!!!!!!!!')
            return redirect('register')


def logoutpage(request):
    pass
