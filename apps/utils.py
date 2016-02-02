from django.contrib.auth.models import User
from rest_framework import status
import string,random
import http.client
import json
from apps.person.enum import UserRolesEnum
from lively import settings
from rest_framework.response import Response

__author__ = 'aamish'

#**************** Parse Util Methods ****************
def make_request(method, content_type, request_url, request_data):
    connection = http.client.HTTPSConnection('api.parse.com', 443)
    connection.connect()
    connection.request(
        method,
        request_url,
        request_data,
        {
            "X-Parse-Application-Id": settings.APPLICATION_ID,
            "X-Parse-REST-API-Key": settings.REST_API_KEY,
            "Content-Type": content_type
        }
    )

    str_response = connection.getresponse().readall().decode('utf-8')
    return json.loads(str_response)


#**************** Generic Util Methods ****************
def save_and_response(serializer, data):
    if serializer.is_valid():
        serializer.save()
        data = {
            "success": data
        }
        return Response(data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def save(serializer):
    if serializer.is_valid():
        return serializer.save()


def response(data):
    data = {
        "success": data
    }
    return Response(data, status=status.HTTP_200_OK)


#**************** Other Util Methods ****************
#copied
def generate_username():
    # Python 3 uses ascii_letters. If not available, fallback to letters
    try:
        letters = string.ascii_letters
    except AttributeError:
        letters = string.letters
    uname = ''.join([random.choice(letters + string.digits + '_')
                     for i in range(30)])
    try:
        User.objects.get(username=uname)
        return generate_username()
    except User.DoesNotExist:
        return uname


#copied
def generate_password():
    # Python 3 uses ascii_letters. If not available, fallback to letters
    try:
        letters = string.ascii_letters
    except AttributeError:
        letters = string.letters
    password = ''.join([random.choice(letters + string.digits)
                     for i in range(10)])
    return password


def get_param(request, key, default):
    key = request.query_params.get(key, default)
    return key or default


def get_data_param(request, key, default):
    key = request.data.get(key, default)
    return key or default


def get_default_param(request, key, default):
    key = request.query_params.get(key, request.data.get(key, default))
    return key or default


def get_user_data(user):
    if user:
        user_info = user.info.first()
        if user_info:
            if user_info.role == UserRolesEnum.BRANCH_MANAGER:
                return None, None, user_info.branch_id
            elif user_info.role == UserRolesEnum.OPERATIONAL_CONSULTANT:
                return user_info.region_id, None, None
    return None, None, None


def get_user_role(user):
    if user:
        user_info = user.info.first()
        if user_info:
            return user_info.role
    return None
