from flask import Flask, render_template,request
app = Flask(__name__)
@app.route("/")
def home():
    return render_template("try.html")
@app.route("/map")
def map():
    return render_template("index.html")
@app.route("/car")
def car():
    return render_template("car.html")


if __name__ == "__main__":
    app.run(debug=True)
