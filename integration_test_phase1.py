import requests
import time
import json

BASE_URL = "http://localhost:8000/api/v1"

def test_endpoint(endpoint_url, payload=None, expected_intent=None):
    print(f"\n--- Testing Endpoint: {endpoint_url} ---")
    start_time = time.time()
    try:
        if payload is not None:
            response = requests.post(endpoint_url, json=payload, timeout=10)
        else:
            response = requests.get(endpoint_url, timeout=10)
        
        duration = time.time() - start_time
        print(f"Status Code: {response.status_code}")
        print(f"Duration: {duration:.4f}s")
        
        if response.status_code != 200:
            print(f"❌ Error: {response.text}")
            return False
            
        data = response.json()
        
        # Verify schema
        required_keys = {"intent", "response", "sources", "financial_data"}
        actual_keys = set(data.keys())
        missing_keys = required_keys - actual_keys
        
        print(f"Returned Intent: {data.get('intent')}")
        
        if missing_keys:
            print(f"❌ Schema validation failed! Missing keys: {missing_keys}")
            print(f"Response: {json.dumps(data, indent=2)}")
            return False
            
        if expected_intent and data["intent"] != expected_intent:
             print(f"⚠️ Warning: Expected intent '{expected_intent}' but got '{data['intent']}'.")
             
        print("✅ Success! Schema matches.")
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Connection error: {e}")
        return False

def run_all_tests():
    print("Starting Integration Tests Phase 1...")
    
    # Wait for server to be up optionally, but assume it's running
    
    passed = 0
    total = 0
    
    # 1. Knowledge query
    total += 1
    query_payload = {
        "query": "What is NPS Tier 1?",
        "user_profile": {}
    }
    if test_endpoint(f"{BASE_URL}/ask", query_payload, "knowledge_query"):
        passed += 1
        
    # 2. Forecast query
    total += 1
    forecast_payload = {
        "age": 30,
        "monthly_contribution": 5000
    }
    if test_endpoint(f"{BASE_URL}/forecast", forecast_payload, "retirement_forecast"):
        passed += 1
        
    # 3. Simulation query
    total += 1
    simulation_payload = {
        "age": 30,
        "monthly_contribution": 5000,
        "volatility": 0.15
    }
    if test_endpoint(f"{BASE_URL}/simulate", simulation_payload, "simulation"):
        passed += 1
        
    # 4. Recommendation query
    total += 1
    recommend_payload = {
        "age": 30,
        "risk_preference": "moderate"
    }
    if test_endpoint(f"{BASE_URL}/recommend", recommend_payload, "investment_recommendation"):
        passed += 1
        
    print(f"\nCompleted: {passed}/{total} tests passed.")
    if passed == total:
         print("🎉 ALL TESTS PASSED SUCCESSFULLY! Integration Phase 1 Complete.")
    else:
         print("⚠️ SOME TESTS FAILED. Please check the logs.")

if __name__ == "__main__":
    run_all_tests()
