from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Example model
class ExampleModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    def to_dict(self):
        return {'id': self.id, 'name': self.name}

# API endpoints
@app.route('/api/examples', methods=['GET'])
def get_examples():
    examples = ExampleModel.query.all()
    return jsonify([example.to_dict() for example in examples])

@app.route('/api/examples', methods=['POST'])
def create_example():
    data = request.json
    new_example = ExampleModel(name=data['name'])
    db.session.add(new_example)
    db.session.commit()
    return jsonify(new_example.to_dict()), 201

if __name__ == '__main__':
    db.create_all()  # Create database tables
    app.run(debug=True)