from flask import Flask

def create_app():
    # Instantiate app
    app = Flask(__name__)

    # Register blueprints
    from lost_at_home.main.routes import main
    app.register_blueprint(main)

    return app