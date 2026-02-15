import joblib
import numpy as np

class RiskPredictionModel:
    def __init__(self, model_path: str):
        # Load a pre-trained model from the specified path
        self.model = joblib.load(model_path)

    def predict(self, features: np.ndarray) -> np.ndarray:
        # Make a prediction using the loaded model
        return self.model.predict(features)

    def predict_proba(self, features: np.ndarray) -> np.ndarray:
        # Get prediction probabilities
        return self.model.predict_proba(features)