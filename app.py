from flask import Flask, jsonify, request
from flask_mongoengine import MongoEngine
from flask_cors import CORS, cross_origin
app = Flask(__name__)
db = MongoEngine(app)
# CORS(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
# Configuration
app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost:27017/testDB',
    'connect': True
}

# Routes 
# decorators
@app.route('/')
def hello():
    return "Hello Flask"

@app.route('/<name>')
def hello_name(name):
    return f"hello {name}"


# Follow MVC modal view=>React controller
# ORM => Object Relational mapping
class Todo(db.Document):
    title = db.StringField(required = True)
    description = db.StringField()

# Blueprints in flask

# CRUD operation

# create
# routes are also called endpoints
# The return type must be a string, dict, tuple, Response instance, or WSGI callable, but it was a Todo.
@app.route('/api/todo/create/', methods=['POST'])
def create_todo():
    response = {
        "error":True,
        "data":"",
        "message":""
    }
    
    data = request.get_json()
    todo = Todo(**data) # saves data in ram
    # todo = Todo.objects.create(**data) # saves data instantly in database
    # todo = Todo()
    
    # todo.description = "description" 
    if len(todo.title)>=3:    
        # todo.title = data['title'] # throws error
        todo.title = data.get('title',"Noting")  # returns default value 'Noting'
        # todo.title = data.get('title')  # returns default value None
        todo.save()
        response['data']=todo
        response['error']=False
        
    else:
        response['message'] = "Please enter a valid title"
    return jsonify(response)

@app.route('/api/todos')
def get_all_todos():
    # return jsonify(Todo.objects.filter(title__icontains="crud"))
    return jsonify(Todo.objects())

@app.route('/api/todos/<id>/',methods = ['PUT','PATCH'])
def update_todos(id):
    # todo = Todo.objects.get(id=id)
    # todo.title = "updated"
    # todo.save()
    data = request.get_json()
    todo = Todo.objects.filter(id=id).update(**data)
    return jsonify(todo)

    

@app.route('/api/todos/<id>/',methods = ['DELETE'])
@cross_origin()
def delete_todo(id):
    response = {
        'error':True,
        'data':"",
        'message':""
    }

    try:
        todo = Todo.objects.get(id=id)
        todo.delete()
        response['error']=False
        response['message'] = "deleted successfully"
    except Todo.DoesNotExist:
        response['message']= "Todo Not found"
    return jsonify(response)


app.run(debug=True)