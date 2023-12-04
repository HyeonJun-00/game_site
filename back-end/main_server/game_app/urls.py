"""game_site URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from game_app import views

urlpatterns = [
    path('', views.index),
    path('get_user_list/', views.get_user_list),
    path('create_user/', views.create_user),
    path('delete_user/', views.delete_user),
    path('nickname_duplicate_check/', views.nickname_duplicate_check),
    path('user_login/', views.user_login),
]
