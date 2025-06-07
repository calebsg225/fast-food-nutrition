from flask import Flask
from markupsafe import escape

app = Flask(__name__)

@app.route('/add-restaurant/<name>')
def add_restaurant(name):
    # code to add new restaurant to DB
    return f"Added {escape(name)}, Restaurant ID: x"

@app.route('/delete-restaurant/<name>')
def delete_restaurant(name):
    # code to delete restaurant from DB
    return f"Deleted {escape(name)}, Restaurant ID: x"

@app.route('/add-item/<restaurant_id>/<name>')
def add_menu_item(restaurant_id, name):
    # code to add new item to DB
    return f"Added {escape(name)} to {escape(restaurant_id)}, Menu Item ID: x"

@app.route('/set-calories/<menu_item_id>/<calories>')
def set_menu_item_calories(menu_item_id, calories):
    # code to set calories for menu item
    return f"Set calories for {escape(menu_item_id)} to {escape(calories)}"

@app.route('/get-nearest-restaurants/<latitude>/<longitude>')
def get_nearest_restaurants(latitude, longitude):
    # code to get nearest restaurants
    return f"Nearest Restaurants from {escape(latitude)}, {escape(longitude)}: x"

if __name__ == '__main__':
    app.run()