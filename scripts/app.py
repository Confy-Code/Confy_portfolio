from flask import Flask, send_from_directory, render_template
import os

app = Flask(__name__,
            template_folder='../templates',
            static_folder='../scripts')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scripts/<path:path>')
def static_files(path):
    return send_from_directory('../scripts', path)

@app.route('/Jean Confiance_Photo.jpeg')
def profile_photo():
    return send_from_directory('..', 'Jean Confiance_Photo.jpeg')

@app.route('/Resume.pdf')
def resume():
    return send_from_directory('..', 'Resume.pdf')

if __name__ == '__main__':
    app.run(debug=True)