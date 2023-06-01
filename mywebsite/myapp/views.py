from django.shortcuts import render, redirect
from myapp.models import UserChoice
import numpy as np
import pandas as pd
import pickle
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

def submit(request):
    if request.method == 'POST':
        selected_info = request.POST.get('info_1')
        return render(request, 'myapp/prediction.html')
    return render(request, 'myapp/english_Ver.html')


def home(request):
    return render(request, 'myapp/indonesian_Ver.html')


def english(request):
    return render(request, 'myapp/english_Ver.html')

@csrf_exempt
def prediction_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        street_address = data.get('street_address')
        bedroom_count = int(data.get('bedroom_count'))
        bathroom_count = int(data.get('bathroom_count'))
        listing_area = int(data.get('listing_area'))
        jakarta_division = data.get('jakarta_division')
        certificate = data.get('certificate')
        
        # bedroom_count=int(bedroom_count)
        # bathroom_count= int(bathroom_count)
        # listing_area= int(listing_area)
        
        one_df = pd.DataFrame({'street_address': [street_address],
                           'bedroom_count': [bedroom_count],
                           'bathroom_count': [bathroom_count],
                           'listing_area': [listing_area],
                           'certificate': [certificate],
                           'jakarta_division': [jakarta_division]})
        
        low_cardinality_cols = ['jakarta_division']
        high_cardinality_cols = ['street_address', 'certificate']



        numerical_cols = [cname for cname in one_df.columns if one_df[cname].dtype in ['int64', 'float64']]

        my_cols = low_cardinality_cols + high_cardinality_cols + numerical_cols
        one_df = one_df[my_cols].copy()

        # Get list of categorical variables
        s = (one_df.dtypes == 'object')
        object_cols = list(s[s].index)

        filename1 = "myapp/ordinal_encoder.pickle"
        filename2 = "myapp/one_hot_encoder.pickle"

        # load model
        ordinal_encoder = pickle.load(open(filename1, "rb"))
        OH_encoder = pickle.load(open(filename2, "rb"))
        # Apply ordinal encoder to each column with categorical data
        mix_X_valid = one_df.copy()
        mix_X_valid[high_cardinality_cols] = ordinal_encoder.transform(one_df[high_cardinality_cols])

        # Apply one-hot encoder to each column with categorical data
        OH_cols_valid = pd.DataFrame(OH_encoder.transform(one_df[low_cardinality_cols]))

        OH_cols_valid.index = one_df.index
        OH_cols_valid.columns = OH_cols_valid.columns.astype('str')
        num_X_valid = mix_X_valid.drop(low_cardinality_cols, axis=1)
        one_df = pd.concat([num_X_valid, OH_cols_valid], axis=1)

        filename = "myapp/random_forest.pickle"

        # load model
        loaded_model = pickle.load(open(filename, "rb"))

        # you can use loaded model to compute predictions
        preds = loaded_model.predict(one_df)
        preds = int(preds[0])
        preds = format(preds, ",")
        context = {
            'street_address': street_address,
            'certificate': certificate,
            'listing_area': listing_area,
            'bedroom_count': bedroom_count,
            'bathroom_count': bathroom_count,
            'jakarta_division': jakarta_division,
            'prediction': "Rp. "+ str(preds),

        }
        return JsonResponse(context)
    return render(request, 'myapp/indonesian_Ver.html')

# def prediction_view(request):
#     if request.method == 'POST':
#         street_address = request.POST.get('street_address')
#         bedroom_count = request.POST.get('bedroom_count')
#         bathroom_count = request.POST.get('bathroom_count')
#         certificate = request.POST.get('certificate')
#         listing_area = request.POST.get('listing_area')
#         jakarta_division = request.POST.get('Division_info')
#         context = {
#             'street_address': street_address,
#             'certificate': certificate,
#             'listing_area': listing_area,
#             'bedroom_count': bedroom_count,
#             'bathroom_count': bathroom_count,
#             'jakarta_division': jakarta_division,
#         }
#         return redirect('result')  # result_view로 리디렉션

#     return render(request, 'myapp/Ai2.html')


# def result_view(request):
#     street_address = request.GET.get('street_address')
#     certificate = request.GET.get('certificate')
#     listing_area = int(request.GET.get('listing_area'))
#     bedroom_count = int(request.GET.get('bedroom_count'))
#     bathroom_count = int(request.GET.get('bathroom_count'))
#     jakarta_division = request.GET.get('jakarta_division')
#     one_df = pd.DataFrame({'Street Address': [street_address],
#                            'Bed': [bedroom_count],
#                            'Bath': [bathroom_count],
#                            'Listing Area': [listing_area],
#                            'Certificate': [certificate],
#                            'Jakarta Division': [jakarta_division]})

#     low_cardinality_cols = [cname for cname in one_df.columns if one_df[cname].nunique() < 10 and
#                             one_df[cname].dtype == "object"]
#     high_cardinality_cols = [cname for cname in one_df.columns if one_df[cname].nunique() >= 10 and
#                              one_df[cname].dtype == "object"]

#     numerical_cols = [
#         cname for cname in one_df.columns if one_df[cname].dtype in ['int64', 'float64']]

#     my_cols = low_cardinality_cols + high_cardinality_cols + numerical_cols
#     one_df = one_df[my_cols].copy()

#     # Get list of categorical variables
#     s = (one_df.dtypes == 'object')
#     object_cols = list(s[s].index)

#     filename1 = "myapp/ordinal_encoder.pickle"

#     # load model
#     ordinal_encoder = pickle.load(open(filename1, "rb"))
#     one_df[object_cols] = ordinal_encoder.transform(one_df[object_cols])

#     filename = "myapp/random_forest.pickle"

#     # load model
#     loaded_model = pickle.load(open(filename, "rb"))

#     # you can use loaded model to compute predictions
#     preds = loaded_model.predict(one_df)

#     context = {
#         'street_address': street_address,
#         'certificate': certificate,
#         'listing_area': listing_area,
#         'bedroom_count': bedroom_count,
#         'bathroom_count': bathroom_count,
#         'jakarta_division': jakarta_division,
#         'prediction': preds[0],
#         # 필요한 다른 정보들도 context에 추가
#     }

#     # 결과 페이지로 이동하기 위해 render 함수를 사용하여 result.html 렌더링
#     return render(request, 'myapp/result.html', context)


# def result_view(request):
#     # 결과 페이지에 입력된 정보 전달하기
#     location = request.POST.get('location')
#     room_count = request.POST.get('room_count')
#     # 필요한 다른 정보들도 가져오기

#     context = {
#         'location': location,
#         'room_count': room_count,
#         # 필요한 다른 정보들도 context에 추가
#     }
#     return render(request, 'app_name/result.html', context)
