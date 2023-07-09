from flask import Flask, request, jsonify, Response
import pandas as pd
import logging
import sys

abalone_train = pd.read_csv(
    "https://storage.googleapis.com/download.tensorflow.org/data/abalone_train.csv",
    names=["Length", "Diameter", "Height", "Whole weight", "Shucked weight",
           "Viscera weight", "Shell weight", "Age"])

app = Flask(__name__)



app.route('/stream')
def stream():
    def generate():
        logger = logging.getLogger('flask_app')  # Replace 'flask_app' with your logger name
        handler = logging.StreamHandler()

        logger.addHandler(handler)
        logger.setLevel(logging.INFO)

        try:
            while True:
                yield 'data: {}\n\n'.format(handler.stream.readline().strip())  # Send log message as SSE event
        finally:
            logger.removeHandler(handler)

    return Response(generate(), mimetype='text/event-stream')

@app.route("/upload", methods=['GET', 'POST'])
def upload_file():
    if request.method == "POST":
        file = request.files["file"]
        file.save("uploads/" + file.filename)
        return {"message": "File uploaded successfully", "filename": file.filename}
    else:
        return {"message": "Method is not valid"}
     



@app.route('/table-data')
def get_table_data():
    table_data = [
        {'name': 'John', 'age': 30},
        {'name': 'Jane', 'age': 25},
        {'name': 'Bob', 'age': 40},
    ]
    return jsonify(table_data)

@app.route('/results')
def dataFrame():
    #df = abalone_train[["Length", "Diameter", "Height"]]
    df  =abalone_train
    df = df.loc[:100]
    df["id"] = df.index.tolist()
    df22 = df.to_dict(orient='records')
    df.to_csv("/Users/harikhanal/flaskApp/app/results/hello_download.csv", index = False)
    return jsonify(df22)




@app.route('/api/data', methods=["GET", 'POST'])
def get_data():
    data = request.get_json()
    name = data['name']
    age = data['age']
    result = {"name": name, "age": age}
    return jsonify(result)


