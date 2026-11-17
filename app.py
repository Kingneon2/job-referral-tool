from flask import Flask, jsonify, request
from flask_cors import CORS  

app = Flask(__name__, static_url_path="", static_folder="static")
# In-memory storage for referrals
referrals = []

@app.route("/api/referrals", methods=["GET"])
def get_referrals():
  return jsonify(referrals),200

@app.route("/api/referrals", methods=["GET"])
def get_referrals():
  data = request.get_json()

#Basic validation
required_fields = [
  "referrer_name",
  "referred_name",
  "email",
  "job_title",
  "reason",
]
if not all(field in data for field in required_fields):
  return jsonify({"error": "Missing required fields"}), 400

new_referral = {
  "id": len(referrals) +1,
  "referrer_name": data["referrer_name"]
  "referred_name": data["referred_name"]
  "email": data["email"]
  "job_title": data{"job_title"]
  "reason": data["reason"],
                   }
referrals.append(new_referral)
return jsonify(new_referral), 201

@app.route("/api/referrals/<int:ref_id>", methods=["DELETE"])
def delete_referral(ref_id):
  global referrals
  initial_length = len(referrals)
  referrals = [r for r in referrals if r ["id"] !=ref_id]
  if len (referrals) == initial_length
  return jsonify[{"error": "Referral not found"}), 404
  return jsonify({"message" : Referral not found"}), 200

  if __name__=="__main__":
  app.run(debug=True, port=5000)
  
