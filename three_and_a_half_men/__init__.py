from flask import Flask

def create_app():
    # Instantiate app
    app = Flask(__name__)

    # Register blueprints
    from three_and_a_half_men.main.routes import main
    app.register_blueprint(main)

    return app