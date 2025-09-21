from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # allow all origins for now

# Flask-Mail config
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv("EMAIL_USER")
app.config['MAIL_PASSWORD'] = os.getenv("EMAIL_PASS")
app.config['MAIL_DEFAULT_SENDER'] = os.getenv("EMAIL_USER")

mail = Mail(app)

@app.route("/")
def home():
    return send_from_directory(".", "index.html")  # serve from root folder

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({"error": "All fields are required"}), 400

    try:
        msg = Message(
            subject="New Contact Form Submission",
            recipients=[os.getenv("EMAIL_USER")],  # Your inbox
            body=f"From: {name} <{email}>\n\nMessage:\n{message}"
        )
        mail.send(msg)
        return jsonify({"success": True, "message": "Email sent successfully"}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Failed to send email"}), 500
    

if __name__ == "__main__":
    app.run(debug=True)


