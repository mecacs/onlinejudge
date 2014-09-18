from django.shortcuts import render_to_response
from django.core.context_processors import csrf
from django.http import HttpResponseRedirect,HttpResponse
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import json
from source.submission import *
from source.misc import *
from source.player import *


def index(request):
    c = {}
    errors = []
    if request.method == 'POST':
        if not request.POST.get('username', ''):
            errors.append('Enter username.')
        if not request.POST.get('password', ''):
            errors.append('Enter a passowrd.')
        if not errors:
            if authenticate_user(request):
                print "Entered"
                request.session['playerid'] = get_player_id(request.user.id)
                return HttpResponseRedirect('/profile/')
            else:
                if errors ==[]:
                    errors.append('Invalid Credentials')  
    c = {'errors' : errors}
    c.update(csrf(request))
    return render_to_response("signin.html",c)

@login_required(login_url='/login/')
def contactus(request):
    c={}
    c["profile"] = get_player_profile(request)
    c.update(csrf(request))
    return render_to_response("contactus.html",c)

@login_required(login_url='/login/')
def rules(request):
    c={}
    c["profile"] = get_player_profile(request)
    c.update(csrf(request))
    return render_to_response("rules.html",c)

@login_required(login_url='/login/')
def submission(request):
    c={}
    c["profile"] = get_player_profile(request)
    c['submissions'] = get_player_submissions(request)
    c.update(csrf(request))
    return render_to_response("submission.html",c)

@login_required(login_url='/login/')
def leaders(request):
    c = {"leaderboard" : leaderboard}
    c["profile"] = get_player_profile(request)
    c.update(csrf(request))
    return render_to_response("leaderboard.html",c)

@login_required(login_url='/login/')
def profile(request):
    c = {}
    c["profile"] = get_player_profile(request)
    c.update(csrf(request))
    return render_to_response("profile.html",c)

@login_required(login_url='/login/')
def problem(request):
    id = request.GET.get('id')
    details = get_problem_details(id)
    request.session['playerid'] = get_player_id(request.user.id)
                
    update_views(request.session['playerid'],id)
    c = {'q': details}
    c["profile"] = get_player_profile(request)
    print 'yeahhere'
    c['code']=request.POST.get('c-code','')
    c.update(csrf(request))
    return render_to_response("submit.html",c)

@login_required(login_url='/login/')
def fullscreen(request):
    id = request.GET.get('id')
    details = get_problem_details(id)
    c = {'q': details}
    print request.POST
    if request.POST:
        c['code']=request.POST.get('c-code','')
    c.update(csrf(request))

    return render_to_response("fullscreen.html",c,context_instance=RequestContext(request))

@login_required(login_url='/login/')
def allproblems(request):
    details = get_problems()
    c = {'problem0':details[0],'problems': details[1]}
    c["profile"] = get_player_profile(request)
    c.update(csrf(request))
    return render_to_response("question.html",c)

def login(request,msg=""):
    errors = [msg]
    print request.POST
    if request.method == 'POST':
        if not request.POST.get('username', ''):
            errors.append('Enter username.')
        if not request.POST.get('password', ''):
            errors.append('Enter a passowrd.')
        if errors==['']:
            if authenticate_user(request):
                request.session['playerid'] = get_player_id(request.user.id)
                return HttpResponseRedirect('/profile/')
            else:
                if errors==['']:
                    errors.append('Invalid Credentials')  
    c = {'errors' : errors}
    c.update(csrf(request))
    return render_to_response("signin.html",c)

@login_required(login_url='/login/')
def upload(request):
    id = request.POST.get('qid')
    details = get_problem_details(id)
                
    update_views(request.session['playerid'],id)
    c = {'q': details}
    if request.POST:
        print request.POST
        submissionid = save_submission(request,id)
        print submissionid
        if type(submissionid) == type("s"):
            c['messages']=submissionid
        elif submissionid>0:
            c['messages']="Upload Successful."
            c['message_compilation'] = compile_submission(request,str(submissionid),id)
        else:
            c['messages']='Upload failed, please try again.'
    print json.dumps(c)
    return HttpResponse(json.dumps(c), content_type="application/json")
    

@login_required(login_url='/login/')
def home(request):
    c={}
    print "hello", request.user.is_authenticated()
    files=get_player_submissions(request)
    c['submissions']=files
    c["profile"] = get_player_profile(request)
    c['problems'] = get_problems()
    c.update(csrf(request))
    return render_to_response("profile.html",c,context_instance=RequestContext(request))

@login_required(login_url='/login/')
def discussionboard(request):
    id = request.GET.get('id')
    details = get_problem_details(id)
    request.session['playerid'] = get_player_id(request.user.id)
                
    update_views(request.session['playerid'],id)
    c = {'q': details}
    c.update(csrf(request))
    return render_to_response("discussion.html",c)


def logout(request):
    logout_player(request)
    del request.session['playerid']
    return HttpResponseRedirect('/index/')

def signup(request):
    errors = []
    print request.POST
    if request.method == 'POST':
        if not request.POST.get('username', ''):
            errors.append('Enter username.')
        if not request.POST.get('password', ''):
            errors.append('Enter a password.')
        if not request.POST.get('name', ''):
            errors.append('Enter a name.')
        if not request.POST.get('email', ''):
            errors.append('Enter an email.')
        if not request.POST.get('college', ''):
            errors.append('Enter a college.')
        if request.POST.get('password'):
            if request.POST.get('password','one')!=request.POST.get('confirmpassword','two'):
                errors.append('Passwords do not match.')
                
        if not errors:
            if register_player(request.POST):
                return HttpResponseRedirect('/login/',"Registration Successful")
            else:
                errors.append('Error, Try again')
    c = {'errors' : errors}
    c.update(csrf(request))

    return render_to_response("Signup.html",c,context_instance=RequestContext(request))

@login_required(login_url='/login/')
def createquestion(request):
    errors = []
    if request.method == 'POST':
        if not request.POST.get('title', ''):
            errors.append('Enter title.')
        if not request.POST.get('description', ''):
            errors.append('Enter a description.')
        if not request.FILES.get('testcases', ''):
            errors.append('Enter testcase.')
        if not request.FILES.get('output', ''):
            errors.append('Enter output.')
        if not errors:
            if save_question(request):
                return HttpResponseRedirect('/login/')
            else:
                errors.append('Error, Try again')
    c = {'errors' : errors}
    c.update(csrf(request))
    return render_to_response("create-question.html",c,context_instance=RequestContext(request))

@csrf_exempt
def fblogin(request):
    data={}
    logging.info(request)
    name=str(request.POST['name'])
    id=str(request.POST['id'])
    data['username']=name.replace(' ','')
    data['password']=name.replace(' ','')+id
    data['name']=name
    data['college']='N/A'
    data['id']=id
    data['email']='N/A'
    p = Player.objects.filter(fbuserid=data['id'])

    if len(p)<1:
        k=register_player(data)
    else:
        p = Player.objects.get(fbuserid=data['id'])
        request.user=p.userid
        authenticate_user(data,request)
        request.session['playerid'] = get_player_id(request.user.id)
                
        return HttpResponse('success')
    if k=="Duplicate username":
        return HttpResponse(k)
    elif k==True:
        p = Player.objects.get(fbuserid=data['id'])
        request.user=p.userid
        authenticate_user(data,request)
        request.session['playerid'] = get_player_id(request.user.id)
                
        return HttpResponse('success')
