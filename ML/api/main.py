from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import joblib
from pydantic import BaseModel, Field
import pandas as pd




app = FastAPI()




app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




model = joblib.load('xgboost.joblib')




class Data(BaseModel):
    rooms: int = Field(..., gt=0)
    size: float = Field(..., gt=0)
    reconstructed: str
    garage: str
    balcony: str
    new: str
    location: str




@app.get('/')
def index():
    return {'status': 'everything is okay'}





@app.post('/get-apartment-price-prediction')
def get_apartment_price_prediction(data: Data):

    data = data.model_dump() 

    for key in ['reconstructed', 'garage', 'balcony', 'new']:

        if data[key] == 'Yes':
            data[key] = 1
        elif data[key] == 'No':
            data[key] = 0
        else:
            raise HTTPException(status_code=400, detail=f"The attribute '{key}' can be 'Yes' or 'No'.")
        
    
    data = {key:[value] for key, value in data.items()}
    data = pd.DataFrame(data)

    prediction = model.predict(data)
    prediction = float(prediction[0])


    return {'predicted price': prediction}

