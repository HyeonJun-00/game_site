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
    path('user/', views.User.as_view()),
    path('user/<int:id>/', views.User.as_view()),
    path('user/<int:id>/<str:rermissions>/', views.User.as_view()),
    path('nickname_duplicate_check/', views.nickname_duplicate_check),
    path('user_login/', views.user_login),
    path('user_gold/', views.UserGold.as_view()),
    path('user_gold/<str:name>/<int:chgAmt>/', views.UserGold.as_view()),
    path('game/', views.Game.as_view()),
    path('game/<int:id>/', views.Game.as_view()),
    path('game/<int:id>/<view>/', views.Game.as_view()),
    path('game/<int:id>/<str:name>/<str:tag>/<str:description>/<str:english_name>/', views.Game.as_view()),
]
