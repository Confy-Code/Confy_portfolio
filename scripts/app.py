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

@app.route('/<filename>')
def root_files(filename):
    # Serve files from root directory
    allowed_files = ['jean_confiance_photo.jpeg', 'Resume.pdf']
    if filename in allowed_files:
        return send_from_directory('..', filename)
    # Return 404 for other files
    from flask import abort
    abort(404)

if __name__ == '__main__':
    app.run(debug=True)