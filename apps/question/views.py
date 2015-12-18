from rest_framework.response import Response
from rest_framework.views import APIView
from apps.option.utils import option_get, get_related_option
from apps.question.models import Question
from apps.question.serializers import QuestionSerializer
from apps import constants
from apps.utils import save, response


class QuestionView(APIView):
    def get(self, request, format=None):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            question = Question.get_if_exists(data["objectId"])
            serializer = QuestionSerializer(question, data=data)
            question = save(serializer)

            if "options" in data:
                for option_data in data["options"]:
                    option_parse = option_get(option_data["objectId"])
                    option = get_related_option(option_parse)

                    option.question = question
                    option.save()

            return response(data)