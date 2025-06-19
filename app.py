import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import SVC
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.pipeline import Pipeline
import nltk
import re
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import warnings
warnings.filterwarnings('ignore')

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

app = Flask(__name__)
CORS(app)

class SpamClassifier:
    def __init__(self):
        self.models = {
            'naive_bayes': None,
            'svm': None,
            'neural_network': None
        }
        self.vectorizer = TfidfVectorizer(max_features=5000, stop_words='english')
        self.is_trained = False
        
    def preprocess_text(self, text):
        """Clean and preprocess text data"""
        if pd.isna(text):
            return ""
        
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters and digits, but keep some spam-related symbols
        text = re.sub(r'[^a-zA-Z\s\$\!\?\.]', '', text)
        
        # Remove extra whitespace
        text = ' '.join(text.split())
        
        return text
    
    def load_and_prepare_data(self, csv_path):
        """Load and prepare the SMS spam dataset"""
        print("Loading SMS spam dataset...")
        
        # Try different encodings
        for encoding in ['utf-8', 'latin-1', 'iso-8859-1']:
            try:
                df = pd.read_csv(csv_path, encoding=encoding)
                break
            except UnicodeDecodeError:
                continue
        
        # The SMS spam dataset has format: label, message, empty columns
        # Handle both formats
        if 'v1' in df.columns and 'v2' in df.columns:
            # SMS spam format
            df = df[['v1', 'v2']].copy()
            df.columns = ['label', 'text']
        elif 'Spam/Ham' in df.columns:
            # Enron format
            df['text'] = df['Subject'].fillna('') + ' ' + df['Message'].fillna('')
            df = df[['Spam/Ham', 'text']].copy()
            df.columns = ['label', 'text']
        else:
            raise ValueError("Unknown dataset format")
        
        # Remove any empty messages
        df = df.dropna(subset=['text'])
        df = df[df['text'].str.strip() != '']
        
        # Preprocess text
        df['text'] = df['text'].apply(self.preprocess_text)
        
        # Convert labels to binary (ensure consistent mapping)
        label_mapping = {'ham': 0, 'spam': 1}
        df['label_binary'] = df['label'].map(label_mapping)
        
        # Remove rows with unmapped labels
        df = df.dropna(subset=['label_binary'])
        
        print(f"Dataset loaded: {len(df)} samples")
        print(f"Label distribution: {df['label'].value_counts().to_dict()}")
        
        return df['text'], df['label_binary']
    
    def train_models(self, csv_path):
        """Train all three models"""
        print("Training spam classification models...")
        
        # Load and prepare data
        X, y = self.load_and_prepare_data(csv_path)
        
        # Check if we have both classes
        unique_labels = y.unique()
        if len(unique_labels) < 2:
            raise ValueError(f"Dataset must contain both spam and ham examples. Found labels: {unique_labels}")
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        print(f"Training set: {len(X_train)} samples")
        print(f"Test set: {len(X_test)} samples")
        
        # Vectorize text
        X_train_vec = self.vectorizer.fit_transform(X_train)
        X_test_vec = self.vectorizer.transform(X_test)
        
        # Train Naive Bayes
        print("Training Naive Bayes...")
        nb_model = MultinomialNB()
        nb_model.fit(X_train_vec, y_train)
        nb_pred = nb_model.predict(X_test_vec)
        nb_accuracy = accuracy_score(y_test, nb_pred)
        self.models['naive_bayes'] = nb_model
        
        # Train SVM
        print("Training SVM...")
        svm_model = SVC(kernel='linear', probability=True, random_state=42, C=1.0)
        svm_model.fit(X_train_vec, y_train)
        svm_pred = svm_model.predict(X_test_vec)
        svm_accuracy = accuracy_score(y_test, svm_pred)
        self.models['svm'] = svm_model
        
        # Train Neural Network
        print("Training Neural Network...")
        nn_model = MLPClassifier(hidden_layer_sizes=(100, 50), max_iter=500, random_state=42, alpha=0.001)
        nn_model.fit(X_train_vec, y_train)
        nn_pred = nn_model.predict(X_test_vec)
        nn_accuracy = accuracy_score(y_test, nn_pred)
        self.models['neural_network'] = nn_model
        
        self.is_trained = True
        
        # Save models
        self.save_models()
        
        print(f"Training completed!")
        print(f"Naive Bayes Accuracy: {nb_accuracy:.4f}")
        print(f"SVM Accuracy: {svm_accuracy:.4f}")
        print(f"Neural Network Accuracy: {nn_accuracy:.4f}")
        
        # Test with known spam example
        test_spam = "FREE! Win a $1000 Walmart gift card! Click here now!"
        test_result = self.predict(test_spam, 'naive_bayes')
        print(f"\nTest prediction for spam example:")
        print(f"Text: {test_spam}")
        print(f"Prediction: {test_result['prediction']}")
        print(f"Spam probability: {test_result['spam_probability']:.3f}")
        
        return {
            'naive_bayes': nb_accuracy,
            'svm': svm_accuracy,
            'neural_network': nn_accuracy
        }
    
    def save_models(self):
        """Save trained models and vectorizer"""
        joblib.dump(self.vectorizer, 'vectorizer.pkl')
        for name, model in self.models.items():
            if model is not None:
                joblib.dump(model, f'{name}_model.pkl')
    
    def load_models(self):
        """Load pre-trained models"""
        try:
            self.vectorizer = joblib.load('vectorizer.pkl')
            for name in self.models.keys():
                self.models[name] = joblib.load(f'{name}_model.pkl')
            self.is_trained = True
            return True
        except FileNotFoundError:
            return False
    
    def predict(self, text, model_type='naive_bayes'):
        """Predict if text is spam or ham"""
        if not self.is_trained:
            return None
        
        # Preprocess text
        processed_text = self.preprocess_text(text)
        
        # Vectorize
        text_vec = self.vectorizer.transform([processed_text])
        
        # Get model
        model = self.models.get(model_type)
        if model is None:
            return None
        
        # Predict
        prediction = model.predict(text_vec)[0]
        probability = model.predict_proba(text_vec)[0]
        
        return {
            'prediction': 'spam' if prediction == 1 else 'ham',
            'confidence': float(max(probability)),
            'spam_probability': float(probability[1]) if len(probability) > 1 else 0.0,
            'ham_probability': float(probability[0])
        }

# Initialize classifier
classifier = SpamClassifier()

@app.route('/api/train', methods=['POST'])
def train_models():
    """Train the models"""
    try:
        # Try SMS spam dataset first, fallback to Enron
        dataset_files = ['spam_dataset.txt', 'enron_spam_data.csv']
        
        for dataset_file in dataset_files:
            try:
                accuracies = classifier.train_models(dataset_file)
                return jsonify({
                    'success': True,
                    'message': f'Models trained successfully using {dataset_file}',
                    'accuracies': accuracies,
                    'dataset_used': dataset_file
                })
            except Exception as e:
                print(f"Failed to train with {dataset_file}: {str(e)}")
                continue
        
        return jsonify({
            'success': False,
            'message': 'Failed to train with any available dataset'
        }), 500
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Training failed: {str(e)}'
        }), 500

@app.route('/api/predict', methods=['POST'])
def predict_spam():
    """Predict if email is spam"""
    try:
        data = request.get_json()
        subject = data.get('subject', '')
        message = data.get('message', '')
        model_type = data.get('model', 'naive_bayes')
        
        # Combine subject and message
        email_text = f"{subject} {message}".strip()
        
        if not email_text:
            return jsonify({
                'success': False,
                'message': 'Please provide some text to analyze'
            }), 400
        
        if not classifier.is_trained:
            # Try to load pre-trained models
            if not classifier.load_models():
                return jsonify({
                    'success': False,
                    'message': 'Models not trained. Please train models first.'
                }), 400
        
        # Get predictions from all models
        predictions = {}
        for model_name in classifier.models.keys():
            pred = classifier.predict(email_text, model_name)
            if pred:
                predictions[model_name] = pred
        
        return jsonify({
            'success': True,
            'predictions': predictions
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Prediction failed: {str(e)}'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'models_trained': classifier.is_trained
    })

if __name__ == '__main__':
    # Try to load existing models on startup
    if classifier.load_models():
        print("Pre-trained models loaded successfully!")
    else:
        print("No pre-trained models found. Please train models first.")
    
    app.run(debug=True, host='0.0.0.0', port=5000) 