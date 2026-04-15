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

if __name__ == '__main__':
    app.run(debug=True)