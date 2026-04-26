# 🏠 Apartment marketplace with price prediction using ML

This project is an apartment marketplace that integrates a machine learning model for apartment price prediction. 
Users can explore apartment listings and estimate property prices based on selected features such as size, number of rooms, location, and additional attributes. 
As part of the project requirements, the web application and the ML prediction service were deployed on different cloud providers to demonstrate integration of multiple cloud services within a single system.



## 📁 Project Structure

```
Apartment-marketplace-with-price-prediction-using-ML/
│
├── images/
│
├── ML/
│  ├── api/
│  ├── model_training/
│
├── Web_App/
│  ├── backend/
│  ├── frontend/
│  ├── .env
│  ├── .gitignore
│  ├── docker-compose.yml
│
├── README.md

```

- images/ folder with images used in the README.
- ML/api/ folder with the ML prediction API.
- ML/model_training/ folder with jupyter notebooks for data analysis and model training.
- Web_App/backend/ folder with the backend of the web application.
- Web_App/frontend/ folder with the frontend of the web application.
- Web_App/.env file with environment variables for the application.
- Web_App/.gitignore file specifying files ignored by Git.
- Web_App/docker-compose.yml file for running the full web application stack using Docker.
- README.md provides project overview and instructions.



## 🏗️ Architecture of the Solution

Загальний опис архітектури рішення та використаних клаудових провайдерів та служб 

Картинка 



## 🤖 Price Prediction Model

Детальний опис частини з машинним навчанням 



## 💻 Web Application 

Детальний опис веб застосунку з картинками



## 🛠️ Tools Used

For data analysis and training the ML model:

- Python (Pandas, Matplotlib, Searbon, Scikit-learn, XGBoost)
- Jupyter Notebook

For creating an API with the ML model:

- FastAPI
- Docker

For creating a web application:

- React.js
- FastAPI
- PostgreSQL
- Docker



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

1. Run the API with the price prediction model (See the instructions above) <br>

2. Open the folder with the web application: <br>

   `cd Web_App` <br>

3. Build and run the application using Docker Compose: <br>

   `docker compose up --build` <br>
   
   The application will be available at the URL: http://localhost:3000 <br>

4. Stop the application: <br>

   `docker compose down -v` <br>



## ✍️ Authors

This project was implemented in the summer semester of 2026 in the subject of Cloud technologies. The project was carried out by Dmytro Skrypchenko (ML part), Nikita Dakhno (backend of the web application), Daria Rezvin (frontend of the web application).






