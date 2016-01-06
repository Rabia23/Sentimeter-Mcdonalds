from apps.person.models import UserInfo
from apps.person.serializers import UserSerializer, UserInfoSerializer
from apps.utils import save, generate_username, generate_password, make_request

__author__ = 'aamish'


def user_get(object_id):
    response = make_request('GET', "application/json", '/1/classes/User/%s' % object_id, '')
    return response


def get_related_user(data):
    user_info = UserInfo.get_if_exists(data["objectId"])

    data['username'] = user_info.user.username if user_info else generate_username()
    data['password'] = user_info.user.password if user_info else generate_password()

    user = user_info.user if user_info else None
    user_serializer = UserSerializer(user, data=data)
    user = save(user_serializer)

    data['user_id'] = user.id

    user_info_serializer = UserInfoSerializer(user_info, data=data)
    save(user_info_serializer)

    return user