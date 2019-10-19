from flask import render_template, Blueprint

# Define blueprint
main = Blueprint('main', __name__)

@main.route('/')
def home():
    """Return the SPA for 1UP-NASA-EARTH"""
    return render_template('main.html')

@main.route('/api')
def api():
    """
    TODO: Create APIs for all game types
    """
    return 'STILL IN DEVELOPMENT'