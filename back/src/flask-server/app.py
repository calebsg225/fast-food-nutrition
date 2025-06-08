from flask import Flask, request
from markupsafe import escape

app = Flask(__name__)

@app.post('/add-restaurant')
def add_restaurant():
    data = request.get_json()
    name = data['name']
    # add restaurant to DB
    id = 1414
    return f"Added {escape(name)}, Restaurant ID: {id}"

@app.route('/delete-restaurant/<int:id>')
def delete_restaurant(id):
    # get restaurant name from DB
    name = "pizza-hut"
    # delete restaurant from DB

    return f"Deleted {escape(name)}, Restaurant ID: {escape(id)}"

@app.post('/add-menu-item')
def add_menu_item():
    data = request.get_json()
    restaurant_id = data['restaurant_id']
    menu_item = data['item']
    # add new item to DB
    menu_item_id = 1414
    return f"Added {escape(menu_item['name'])} to {escape(restaurant_id)}, Menu Item ID: {menu_item_id}"

@app.post('/get-nearest-restaurants')
def get_nearest_restaurants():
    lat = request.args.get('lat', 181)
    long = request.args.get('long', 181)
    if lat < -90 or lat > 90 or long < -180 or long > 180:
        return f"Coordinates ({lat}, {long}) are invalid."
    # get nearest restaurants
    restaurants = []
    return restaurants

if __name__ == '__main__':
    app.run()
