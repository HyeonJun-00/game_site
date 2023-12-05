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
        return HttpResponse("create")

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




def get_game_list(req):
    game_list = []
    for game in GameModel.objects.all():
        game_list.append(
            {
                "name": game.game_name,
                "view": game.game_view,
                "tag": game.game_tag,
                "description": game.game_description,
                "created":str(game.created_date.date()),
            }
        )
    return HttpResponse(json.dumps(game_list))

def create_game(req):
    game_name = req.GET["name"]
    game_description = req.GET["description"]
    game_tag = req.GET["tag"]
    GameModel.objects.create(game_name=game_name, game_description=game_description, game_tag=game_tag)
    return HttpResponse("create")

def delete_game(req):
    game_name = req.GET["name"]
    GameModel.objects.get(game_name=game_name).delete()
    return HttpResponse("delate")

def update_game(req):
    game_name = req.GET["name"]
    game_description = req.GET["description"]
    game_tag = req.GET["tag"]
    game_view = req.GET["view"]
    GameModel.objects.filter(game_name=game_name).update(game_name=game_name, game_description=game_description, game_tag=game_tag, game_view=game_view)
    return HttpResponse("update")

# Create your views here.
