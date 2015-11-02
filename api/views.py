from django.db.models import Count
from datetime import datetime, timedelta
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Region, City, Branch
from app.serializers import RegionSerializer, CitySerializer
from feedback.models import Question, FeedbackOption
from feedback.serializers import OverallFeedbackSerializer, RegionalAnalysisSerializer, CityAnalysisSerializer, \
    OverallRattingSerializer
from lively import constants
from lively.utils import generate_missing_options


@api_view(['GET', 'POST'])
def region(request):

    if request.method == 'GET':
        regions = Region.objects.all()
        serializer = RegionSerializer(regions, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def city(request):

    if request.method == 'GET':
        cities = None
        region_id = request.query_params.get('region', None)
        if region_id:
            region = Region.get_by_id(region_id)
            if region:
                cities = region.cities.all()
        else:
            cities = City.objects.all()
        serializer = CitySerializer(cities, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def branch(request):

    if request.method == 'GET':
        branches = None
        city_id = request.query_params.get('city', None)
        if city_id:
            city = City.get_by_id(city_id)
            if city:
                branches = city.branches.all()
        else:
            branches = Branch.objects.all()
        serializer = CitySerializer(branches, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def overall_feedback(request):

    if request.method == 'GET':

        try:
            region_id = request.query_params.get('region', None)
            city_id = request.query_params.get('city', None)
            branch_id = request.query_params.get('branch', None)

            question = Question.objects.get(type=constants.MAIN_QUESTION)

            if region_id and city_id and branch_id:
                feedback_options = FeedbackOption.objects.filter(
                    option__in=question.options.values_list('id'),
                    feedback__branch__exact=branch_id, feedback__branch__city__exact=city_id, feedback__branch__city__region__exact=region_id).\
                    values('option_id', 'option__text').annotate(count=Count('option_id'))
            elif region_id and city_id:
                feedback_options = FeedbackOption.objects.filter(
                    option__in=question.options.values_list('id'),
                    feedback__branch__city__exact=city_id, feedback__branch__city__region__exact=region_id).\
                    values('option_id', 'option__text').annotate(count=Count('option_id'))
            elif region_id:
                feedback_options = FeedbackOption.objects.filter(
                    option__in=question.options.values_list('id'),
                    feedback__branch__city__region__exact=region_id).\
                    values('option_id', 'option__text').annotate(count=Count('option_id'))
            else:
                feedback_options = FeedbackOption.objects.filter(
                    option__in=question.options.values_list('id')).\
                    values('option_id', 'option__text').annotate(count=Count('option_id'))
            list_feedback = generate_missing_options(question, feedback_options)
            total_feedbacks = FeedbackOption.objects.filter(option__in=question.options.values_list('id')).count()
            data = {'feedback_count': total_feedbacks, 'feedbacks': list_feedback}
            feedback_response = OverallFeedbackSerializer(data)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)


@api_view(['GET'])
def regional_analysis(request):

    if request.method == 'GET':

        try:
            question = Question.objects.get(type=constants.MAIN_QUESTION)
            regions = Region.objects.all()
            regional_feedbacks = []

            for region in regions:
                feedback_options = FeedbackOption.objects.filter(
                    option__in=question.options.values_list('id'),
                    feedback__branch__city__region__exact=region.id).\
                    values('option_id', 'option__text').annotate(count=Count('option_id'))
                list_feedback = generate_missing_options(question, feedback_options)
                total_feedbacks = FeedbackOption.objects.filter(option__in=question.options.values_list('id'),
                                        feedback__branch__city__region__exact=region.id).count()

                region_data = {'feedback_count': total_feedbacks, 'feedbacks': list_feedback}
                regional_feedbacks.append(
                    {'region': region, 'data': region_data}
                )

            region_data = {'region_count': regions.count(), 'regional_feedbacks': regional_feedbacks}
            feedback_response = RegionalAnalysisSerializer(region_data)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)


@api_view(['GET'])
def city_analysis(request):

    if request.method == 'GET':

        try:
            region_id = request.query_params.get('region', None)

            if region_id:
                question = Question.objects.get(type=constants.MAIN_QUESTION)
                region = Region.objects.get(pk=region_id)
                cities = region.cities.all()

                city_feedbacks = []

                for city in cities:
                    feedback_options = FeedbackOption.objects.filter(
                        option__in=question.options.values_list('id'),
                        feedback__branch__city__exact=city.id).\
                        values('option_id', 'option__text').annotate(count=Count('option_id'))
                    list_feedback = generate_missing_options(question, feedback_options)
                    total_feedbacks = FeedbackOption.objects.filter(option__in=question.options.values_list('id'),
                                            feedback__branch__city__exact=city.id).count()

                    city_data = {'feedback_count': total_feedbacks, 'feedbacks': list_feedback}
                    city_feedbacks.append(
                        {'city': city, 'data': city_data}
                    )

                city_data = {'city_count': cities.count(), 'city_feedbacks': city_feedbacks}
                feedback_response = CityAnalysisSerializer(city_data)
                return Response(feedback_response.data)

        except Exception as e:
            return Response(None)


@api_view(['GET'])
def overall_rating(request):

    if request.method == 'GET':

        try:
            region_id = request.query_params.get('region', None)
            city_id = request.query_params.get('city', None)
            branch_id = request.query_params.get('branch', None)

            question = Question.objects.get(type=constants.SECONDARY_QUESTION)

            if region_id and city_id and branch_id:
                feedback_options = FeedbackOption.objects.filter(
                    option__in=question.options.filter(parent=None).values_list('id'),
                    feedback__branch__exact=branch_id, feedback__branch__city__exact=city_id, feedback__branch__city__region__exact=region_id,
                    created_at__gte=datetime.now() - timedelta(days=7))
            elif region_id and city_id:
                feedback_options = FeedbackOption.objects.filter(
                    option__in=question.options.filter(parent=None).values_list('id'),
                    feedback__branch__city__exact=city_id, feedback__branch__city__region__exact=region_id,
                    created_at__gte=datetime.now() - timedelta(days=7))
            elif region_id:
                feedback_options = FeedbackOption.objects.filter(
                    option__in=question.options.filter(parent=None).values_list('id'),
                    feedback__branch__city__region__exact=region_id,
                    created_at__gte=datetime.now() - timedelta(days=7))
            else:
                feedback_options = FeedbackOption.objects.filter(
                    option__in=question.options.filter(parent=None).values_list('id'),
                    created_at__gte=datetime.now() - timedelta(days=7))

            feedback_records_list = []
            start_date = datetime.now() - timedelta(days=7)
            for single_date in (start_date + timedelta(n) for n in range(7)):
                feedbacks = feedback_options.filter(created_at__day=single_date.day)
                filtered_feedbacks = feedbacks.values('option_id', 'option__text').annotate(count=Count('option_id'))
                list_feedback = generate_missing_options(question, filtered_feedbacks)
                date_data = {'feedback_count': feedbacks.count(), 'feedbacks': list_feedback}
                feedback_records_list.append({'date': single_date, 'data': date_data})

            feedback_response = OverallRattingSerializer(feedback_records_list, many=True)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)