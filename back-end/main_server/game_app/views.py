from django.shortcuts import render, HttpResponse
from game_app.models import UserModel, GameModel
import json
from django.views import View

class User(View):
    def get(self, req):
        user_list = []
        for user in UserModel.objects.all():
            user_list.append(
                {
                    "no" : user.id,
                    "nickname":user.user_nickname,
                    "email":user.user_email,
                    "created":str(user.created_date.date())
                }
            )
        return HttpResponse(json.dumps(user_list))
    
    def delete(self, req, id):
        UserModel.objects.get(id=id).delete()
        return HttpResponse(status=200)

    def post(self, req):
        nickname = req.POST["nickname"]
        password = req.POST["password"]
        email = req.POST["email"]
        UserModel.objects.create(user_nickname=nickname, user_password=password, user_email=email)
        return HttpResponse(status=200)

class Game(View):
    def get(self, req):
        game_list = []
        for game in GameModel.objects.all():
            game_list.append(
                {
                    "id" : game.id,
                    "name": game.game_name,
                    "view": game.game_view,
                    "tag": game.game_tag,
                    "description": game.game_description,
                    "created":str(game.created_date.date()),
                }
            )
        return HttpResponse(json.dumps(game_list))
    
    def delete(self, req, id):
        GameModel.objects.get(id=id).delete()
        return HttpResponse(status=200)

    def patch(self, req, id, view):
        view = view == "true"
        GameModel.objects.filter(id=id).update(game_view=view)
        return HttpResponse(status=200)

    def post(self, req):
        game_name = req.POST["name"]
        game_description = req.POST["description"]
        game_tag = req.POST["tag"]
        GameModel.objects.create(game_name=game_name, game_description=game_description, game_tag=game_tag)
        return HttpResponse(status=200)
    
    def put(self, req, id, name, tag, description):
        GameModel.objects.filter(id=id).update(game_name=name, game_description="\n".join(description.split("@#@")), game_tag=tag)
        return HttpResponse(status=200)

def user_login(req):
    nickname = json.loads(req.body)["nickname"]
    password = json.loads(req.body)["password"]
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


# Create your views here.
