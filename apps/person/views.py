from django.contrib.auth.models import User
from django.db import transaction
from rest_framework.response import Response
from rest_framework.views import APIView
from apps import constants
from apps.branch.models import Branch
from apps.parse import ParseHelper
from apps.person.enum import UserRolesEnum
from apps.person.models import UserInfo
from apps.person.serializers import UserSerializer
from apps.region.models import Region
from apps.utils import get_data_param
from django.db import IntegrityError


class UserView(APIView):
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    @transaction.atomic()
    def post(self, request, format=None):
        try:
            role = get_data_param(request, 'role', None)
            username = get_data_param(request, 'username', None)
            first_name = get_data_param(request, 'first_name', None)
            last_name = get_data_param(request, 'last_name', None)
            password = get_data_param(request, 'password', None)
            email = get_data_param(request, 'email', None)
            phone_no = get_data_param(request, 'phone_no', None)
            branch_id = get_data_param(request, 'branch_id', None)
            region_id = get_data_param(request, 'region_id', None)
            parent_id = get_data_param(request, 'parent_id', None)

            if role:
                branch = Branch.objects.get(pk=branch_id) if branch_id else None
                parent_user = User.objects.get(pk=parent_id) if parent_id else None
                parent = parent_user.info.first() if parent_user else None
                region = Region.objects.get(pk=region_id) if region_id else None

                user = User.objects.create(username=username, first_name=first_name, last_name=last_name, email=email)
                user.set_password(password)
                user.save()

                if branch and parent:
                    if role == UserRolesEnum.GRO:
                        user_info = UserInfo.objects.create(user=user, phone_no=phone_no, role=UserRolesEnum.GRO,
                                                            branch=branch, parent=parent)
                        parse_helper = ParseHelper()
                        parse_helper.item_add(user_info, password)
                        return Response(user_info.to_dict())
                    elif role == UserRolesEnum.BRANCH_MANAGER:
                        user_info = UserInfo.objects.create(user=user, phone_no=phone_no, role=UserRolesEnum.BRANCH_MANAGER,
                                                        branch=branch, parent=parent)
                        return Response(user_info.to_dict())
                elif region and parent:
                    if role == UserRolesEnum.OPERATIONAL_CONSULTANT:
                        user_info = UserInfo.objects.create(user=user, phone_no=phone_no, role=UserRolesEnum.OPERATIONAL_CONSULTANT,
                                                        region=region, parent=parent)
                        return Response(user_info.to_dict())
                elif parent:
                    if role == UserRolesEnum.OPERATIONAL_MANAGER:
                        user_info = UserInfo.objects.create(user=user, phone_no=phone_no,
                                            role=UserRolesEnum.OPERATIONAL_MANAGER, parent=parent)
                        return Response(user_info.to_dict())
                    elif role == UserRolesEnum.ASSISTANT_DIRECTOR:
                        user_info = UserInfo.objects.create(user=user, phone_no=phone_no,
                                            role=UserRolesEnum.ASSISTANT_DIRECTOR, parent=parent)
                        return Response(user_info.to_dict())
                else:
                    if role == UserRolesEnum.DIRECTOR:
                        user_info = UserInfo.objects.create(user=user, phone_no=phone_no, role=UserRolesEnum.DIRECTOR)
                        return Response(user_info.to_dict())

            return Response(False)
        except IntegrityError as e:
            return Response(constants.TEXT_ALREADY_EXISTS)