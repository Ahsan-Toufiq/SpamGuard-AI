# Deployment Guide for SpamGuard AI

This guide covers different deployment options for SpamGuard AI, from local development to production environments.

## 🚀 Quick Local Deployment

### Using Automated Scripts

```bash
# Clone and setup
git clone https://github.com/yourusername/SpamGuard-AI.git
cd SpamGuard-AI
./setup.sh

# Start application
./start_app.sh

# Access at http://localhost:3000
```

### Manual Local Deployment

```bash
# Backend setup
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

pip install -r requirements.txt
python app.py

# Frontend setup (new terminal)
cd frontend
npm install
npm start
```

## 🐳 Docker Deployment

### Create Dockerfiles

**Backend Dockerfile:**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci --only=production

COPY frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Docker Compose:**
```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
    volumes:
      - ./data:/app/data

  frontend:
    build:
      context: .
      dockerfile: frontend/Dockerfile
    ports:
      - "3000:80"
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - frontend
      - backend
```

### Run with Docker

```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

## ☁️ Cloud Deployment

### Heroku Deployment

1. **Prepare for Heroku**
   ```bash
   # Install Heroku CLI
   npm install -g heroku

   # Login
   heroku login
   ```

2. **Backend Deployment**
   ```bash
   # Create Heroku app
   heroku create spamguard-api

   # Set environment variables
   heroku config:set FLASK_ENV=production

   # Deploy
   git push heroku main
   ```

3. **Frontend Deployment**
   ```bash
   # Build frontend
   cd frontend
   npm run build

   # Deploy to Netlify/Vercel
   # Or serve from backend static folder
   ```

### AWS Deployment

#### EC2 Deployment

1. **Launch EC2 instance**
   - Ubuntu 20.04 LTS
   - t2.medium or larger
   - Security group: HTTP (80), HTTPS (443), SSH (22)

2. **Setup server**
   ```bash
   # Connect to instance
   ssh -i your-key.pem ubuntu@your-instance-ip

   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install dependencies
   sudo apt install python3 python3-pip nodejs npm nginx -y

   # Clone repository
   git clone https://github.com/yourusername/SpamGuard-AI.git
   cd SpamGuard-AI

   # Setup application
   ./setup.sh
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }

       location /api {
           proxy_pass http://localhost:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

4. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

#### ECS Deployment

1. **Create ECS cluster**
2. **Build and push Docker images**
   ```bash
   # Build images
   docker build -t spamguard-backend .
   docker build -t spamguard-frontend frontend/

   # Tag for ECR
   docker tag spamguard-backend:latest your-account.dkr.ecr.region.amazonaws.com/spamguard-backend:latest

   # Push to ECR
   docker push your-account.dkr.ecr.region.amazonaws.com/spamguard-backend:latest
   ```

3. **Create ECS service**
4. **Configure load balancer**

### Google Cloud Platform

#### Cloud Run Deployment

1. **Build container**
   ```bash
   gcloud builds submit --tag gcr.io/your-project/spamguard-backend
   ```

2. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy spamguard-backend \
     --image gcr.io/your-project/spamguard-backend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

## 🔧 Production Configuration

### Environment Variables

Create `.env` file:
```bash
# Production settings
FLASK_ENV=production
FLASK_DEBUG=False
SECRET_KEY=your-secret-key

# Database (if using)
DATABASE_URL=postgresql://user:pass@host:port/db

# Model settings
MODEL_CACHE_SIZE=100
MAX_REQUESTS_PER_MINUTE=60

# Logging
LOG_LEVEL=INFO
LOG_FILE=/var/log/spamguard.log
```

### Security Configurations

1. **Flask Security**
   ```python
   # In app.py
   app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
   app.config['SESSION_COOKIE_SECURE'] = True
   app.config['SESSION_COOKIE_HTTPONLY'] = True
   ```

2. **CORS Configuration**
   ```python
   CORS(app, origins=['https://your-domain.com'])
   ```

3. **Rate Limiting**
   ```python
   from flask_limiter import Limiter
   limiter = Limiter(app, key_func=get_remote_address)
   
   @app.route('/api/predict')
   @limiter.limit("10 per minute")
   def predict():
       # ...
   ```

### Performance Optimization

1. **Model Caching**
   ```python
   import functools
   
   @functools.lru_cache(maxsize=1)
   def load_models():
       # Load models once and cache
       pass
   ```

2. **Frontend Optimization**
   ```bash
   # Build for production
   npm run build

   # Serve with compression
   npm install -g serve
   serve -s build -l 3000
   ```

3. **Database Optimization** (if using)
   - Connection pooling
   - Query optimization
   - Indexing

## 📊 Monitoring & Logging

### Application Monitoring

1. **Health Checks**
   ```python
   @app.route('/health')
   def health():
       return {'status': 'healthy', 'timestamp': datetime.now()}
   ```

2. **Logging Configuration**
   ```python
   import logging
   logging.basicConfig(
       level=logging.INFO,
       format='%(asctime)s %(levelname)s %(message)s',
       handlers=[
           logging.FileHandler('app.log'),
           logging.StreamHandler()
       ]
   )
   ```

### Infrastructure Monitoring

- **Uptime monitoring**: UptimeRobot, Pingdom
- **Performance monitoring**: New Relic, DataDog
- **Error tracking**: Sentry, Rollbar

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.11
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run tests
        run: python -m pytest

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          # Deployment commands
```

## 🛠️ Maintenance

### Database Backups
```bash
# Backup models
tar -czf models_backup_$(date +%Y%m%d).tar.gz *.pkl

# Automated backup script
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf "$BACKUP_DIR/spamguard_$DATE.tar.gz" *.pkl *.log
```

### Model Updates
```bash
# Update models
python retrain_models.py

# Deploy new models
./deploy_models.sh
```

### Log Rotation
```bash
# Setup logrotate
sudo nano /etc/logrotate.d/spamguard

# Configuration
/var/log/spamguard.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    create 644 www-data www-data
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Out of Memory**
   - Increase server memory
   - Optimize model loading
   - Implement model unloading

2. **Slow Response Times**
   - Enable model caching
   - Use CDN for static files
   - Optimize database queries

3. **SSL Certificate Issues**
   ```bash
   sudo certbot renew --dry-run
   sudo systemctl reload nginx
   ```

### Debugging

```bash
# Check logs
tail -f /var/log/spamguard.log

# Monitor resources
htop
df -h

# Check service status
systemctl status spamguard
```

This deployment guide should help you get SpamGuard AI running in various environments! 🚀 