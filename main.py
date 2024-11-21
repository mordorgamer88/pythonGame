from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Example Game State
game_state = {
    "score": 0,
    "player_position": {"x": 0, "y": 0},
}


@app.route("/")
def home():
    return render_template("index.html")  # HTML front-end


@app.route("/game-state", methods=["GET", "POST"])
def game_state_api():
    if request.method == "POST":
        data = request.json
        game_state.update(data)  # Update the game state
    return jsonify(game_state)  # Return the updated game state


if __name__ == "__main__":

    app.run(host="0.0.0.0", port=5000)  # Set to listen on all IPs for public access
