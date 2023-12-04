from django.shortcuts import render, HttpResponse
from game_app.models import UserModel
import json

def index(req):

    return HttpResponse("hhhh")

def get_user_list(req):
    user_list = []
    for user in UserModel.objects.all():
        user_list.append(
            {
                "nickname":user.user_nickname,
                "email":user.user_email,
                "created":str(user.created_date.date())
            }
        )
    return HttpResponse(json.dumps(user_list))

def user_login(req):
    nickname = req.GET["nickname"]
    password = req.GET["password"]
    id_check = len(UserModel.objects.filter(user_nickname=nickname)) == 0
    password_check = len(UserModel.objects.filter(user_nickname=nickname, user_password=password)) == 0
    
    if (id_check):
        return HttpResponse("id is null")
    elif (password_check):
        return HttpResponse("password is null")
    return HttpResponse("success")

def nickname_duplicate_check(req):
    nickname = req.GET["nickname"]
    duplication_check = len(UserModel.objects.filter(user_nickname=nickname)) > 0
    if (duplication_check):
        return HttpResponse("false")
    else:
        return HttpResponse("true")

def create_user(req):
    nickname = req.GET["nickname"]
    password = req.GET["password"]
    email = req.GET["email"]
    UserModel.objects.create(user_nickname=nickname, user_password=password, user_email=email)
    return HttpResponse("create")

def delete_user(req):
    nickname = req.GET["nickname"]
    UserModel.objects.get(user_nickname=nickname).delete()
    return HttpResponse("delate")


# Create your views here.
