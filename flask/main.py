from flask import Flask, request
from fastapi.middleware.cors import CORSMiddleware
import io
import json

app = Flask(__name__)
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_credentials= True,
    allow_methods = ["*"],
    allow_headers = ["*"]

)
@app.route("/")
def hello_world():
    return "<p>Hello, Wege!</p>"

@app.route('/api/upload', methods=['POST'])
def upload_file():
    pdf_file = request.files['pdfFile']
    array_data = json.loads(request.form['array_data'])
    
    # Process the uploaded PDF file and the array data
    # ...

    return {"message": "File and array uploaded"}