from typing import Union

from fastapi import FastAPI , UploadFile ,File
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from pdfminer.high_level import extract_pages,extract_text
import io

import re 
import json

app = FastAPI()

# UPLOAD_DIR = Path() / "uploads"
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_credentials= True,
    allow_methods = ["*"],
    allow_headers = ["*"]

)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.post("/uploadfile/")
async def create_upload_file(file_upload: UploadFile = File(...)):
    # data = await file_upload.read()
    # text = extract_text(file_upload)
    # print(text)
    data = await file_upload.read()
    pdf_file = io.BytesIO(data) 
    text = extract_text(pdf_file)
    # print(text)
    l = text.split("\n")
    # print(l)
    ls=["SKILLS","EDUCATION","SOCIAL","WORK & LEADERSHIP EXPERIENCE","AWARDS","PROFILE","PERSONAL DETAILS","LANGUAGES","CERTIFICATIONS","PROJECTS"]
    d={}
    for i in ls:
        itemIndex = text.find(i)
        d[i] = itemIndex
    sorted_dict = dict(sorted(d.items(), key=lambda item: item[1]))
    sortedList =  [i for i in sorted_dict.keys()]
    # print(sorted_dict)
    # print(sortedList)

    # print("content start")
    data = {}
    for i in range(len(sortedList) - 1):
        current_section = sortedList[i]
        next_section = sortedList[i + 1]
        
        section_pattern = re.escape(current_section) + r"(.*?)" + re.escape(next_section)
        section_content = re.search(section_pattern, text, re.DOTALL)
        
        if section_content:
            data[current_section] = section_content.group(1).strip()

    # Print or process the extracted data
    data[sortedList[len(sortedList)-1]] = text[text.index(sortedList[len(sortedList)-1])::]

    # print(data)
    for section, content in data.items():
        print(section)
        print(content)
        print()



    with open("resume.json", "w") as json_file:
        json.dump(data, json_file, indent=4)
    return {"done":data}