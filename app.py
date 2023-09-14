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

excel_data = pd.read_excel('path_to_your_excel_file.xlsx')

@app.route('/get_excel_data', methods=['GET'])
def get_excel_data():
    return excel_data.to_json(orient='records')

@app.route('/update_cell', methods=['POST'])
def update_cell():
    data = request.json
    row_index = data['rowIndex']
    column_name = data['columnName']
    new_value = data['newValue']
    
    excel_data.at[row_index, column_name] = new_value
    excel_data.to_excel('path_to_your_excel_file.xlsx', index=False)  # Save the updated data
    
    return jsonify({'message': 'Cell updated successfully'})



# Sample data as a DataFrame
data = pd.DataFrame({
    "id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],  # Sample data with more entries
    "name": ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10"]
})

@app.route("/api/items", methods=["GET", "PUT"])
def items():
    if request.method == "GET":
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 5))

        start_idx = (page - 1) * per_page
        end_idx = start_idx + per_page

        paginated_data = data.iloc[start_idx:end_idx].to_dict(orient="records")
        total_items = len(data)

        return jsonify({
            "data": paginated_data,
            "total_items": total_items
        })
    elif request.method == "PUT":
        updated_data = request.json
        updated_df = pd.DataFrame(updated_data)
        data.update(updated_df)
        data.to_csv("data.csv", index=False)  # Save to CSV file
        return jsonify({"message": "Data updated and saved successfully"})

