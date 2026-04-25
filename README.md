# 🏠 Apartment marketplace with price prediction <br> using ML

Короткий опис проєкту



## 📁 Project Structure

Файлова структура проєкту



## 🏗️ Architecture of the Solution

Загальний опис архітектури рішення та використаних клаудових провайдерів та служб 

Картинка 



## 🤖 Price Prediction Model

Детальний опис частини з машинним навчанням 



## 💻 Web Application 

Детальний опис веб застосунку з картинками



## 🛠️ Tools Used

Інструменти використані в ML частині та веб застосунку



## ⚡ Installation

1. Clone the repository: <br>

   `git clone https://github.com/TheDim0nu4/Apartment-marketplace-with-price-prediction-using-ML.git` <br>
   `cd Apartment-marketplace-with-price-prediction-using-ML` <br>



## 🧠 Running Jupyter Notebooks (Conda)

1. Open the folder with the jupyter notebooks: <br>

   `cd ML/model_training` <br>

2. Create a Conda environment: <br>

   `conda create -n apartment_predict_env python=3.11` <br>

3. Activate the environment: <br>

   `conda activate apartment_predict_env` <br>

4. Install project dependencies: <br>

   `python -m pip install -r requirements.txt` <br>

5. Select the environment kernel in Jupyter: <br>

   - Open the notebooks and select the kernel corresponding to the created Conda environment (apartment_predict_env).
   - After selecting the kernel, you can run the notebook cells and start working with the project.



## 🚀 Running the API with the Price Prediction Model (Docker)

1. Open the folder with the API: <br>

   `cd ML/api` <br>

2. Build the Docker Image: <br>

   `docker build -t apartment-ml-api .` <br>

3. Running the container: <br>

   `docker run -p 8080:8080 apartment-ml-api` <br>

4. Using the API (Python example): <br>

   ```python
   import requests

   url = "http://localhost:8080/get-apartment-price-prediction"

   data = {
      "rooms": 3,
      "size": 75,
      "reconstructed": "Yes",
      "garage": "No",
      "balcony": "Yes",
      "new": "No",
      "location": "Bratislava"
   }

   response = requests.post(url, json=data)
   print(response.json())
   # {'predicted price': 299419.5}
   ```



## 🌐 Running the Web Application (Docker)

1. 



## ✍️ Authors





