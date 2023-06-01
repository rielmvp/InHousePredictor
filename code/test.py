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

# low_cardinality_cols = [cname for cname in one_df.columns if one_df[cname].nunique() < 10 and 
#                         one_df[cname].dtype == "object"]
# high_cardinality_cols = [cname for cname in one_df.columns if one_df[cname].nunique() >= 10 and 
#                         one_df[cname].dtype == "object"]
low_cardinality_cols = ['Jakarta Division']
high_cardinality_cols = ['Street Address', 'Certificate']

numerical_cols = [cname for cname in one_df.columns if one_df[cname].dtype in ['int64', 'float64']]

my_cols = low_cardinality_cols + high_cardinality_cols+ numerical_cols
one_df = one_df[my_cols].copy()

# Get list of categorical variables
s = (one_df.dtypes == 'object')
object_cols = list(s[s].index)

filename1 = "../data/ordinal_encoder.pickle"
filename2 = "../data/one_hot_encoder.pickle"

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

filename = "../data/random_forest.pickle"

# load model
loaded_model = pickle.load(open(filename, "rb"))

# you can use loaded model to compute predictions
preds = loaded_model.predict(one_df)

# mape = mean_absolute_percentage_error(y, preds)
print(preds[0])