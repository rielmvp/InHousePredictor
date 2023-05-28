import numpy as np
import pandas as pd
import pickle

street_address = input()
bed = int(input())
bath = int(input())
listing_area = int(input())
certificate = input()
jakarta_division = input()

one_df = pd.DataFrame({'Street Address':[street_address],
                        'Bed':[bed],
                        'Bath':[bath],
                        'Listing Area':[listing_area],
                        'Certificate':[certificate],
                        'Jakarta Division':[jakarta_division]})

low_cardinality_cols = [cname for cname in one_df.columns if one_df[cname].nunique() < 10 and 
                        one_df[cname].dtype == "object"]
high_cardinality_cols = [cname for cname in one_df.columns if one_df[cname].nunique() >= 10 and 
                        one_df[cname].dtype == "object"]

numerical_cols = [cname for cname in one_df.columns if one_df[cname].dtype in ['int64', 'float64']]

my_cols = low_cardinality_cols + high_cardinality_cols+ numerical_cols
one_df = one_df[my_cols].copy()

# Get list of categorical variables
s = (one_df.dtypes == 'object')
object_cols = list(s[s].index)

print(object_cols)
filename1 = "../data/ordinal_encoder.pickle"

# load model
ordinal_encoder = pickle.load(open(filename1, "rb"))
one_df[object_cols] = ordinal_encoder.transform(one_df[object_cols])

filename = "../data/random_forest.pickle"

# load model
loaded_model = pickle.load(open(filename, "rb"))

# you can use loaded model to compute predictions
preds = loaded_model.predict(one_df)

# mape = mean_absolute_percentage_error(y, preds)
print(preds[0])