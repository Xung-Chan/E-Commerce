# E-commerce

## Get Google Key & Gemini Key

Access: https://aistudio.google.com/api-keys and create API Key for Google Api Key

Access: https://console.cloud.google.com/auth/overview , follow instruction and create Client ID and Client Secret

## Environment

Create `.env` includes these variables:

SECRET_KEY

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

GOOGLE_API_KEY

USER_EMAIL

USER_PASSWORD

BASE_URL

PORT

BRAND

MONGODB_PORT

DB_NAME

### Example:
```env
SECRET_KEY="<YOUR SECRET KEY>"

# google
GOOGLE_CLIENT_ID="<YOUR GOOGLE CLIENT ID>"
GOOGLE_CLIENT_SECRET="YOUR GOOGLE CLIENT SECRET"

#GEMINI
GOOGLE_API_KEY="YOUR GEMINI KEY"

USER_EMAIL="<YOUR MAIL>"
USER_PASSWORD="<YOUR MAIL PASSWORD>"

BASE_URL=http://localhost:8000
PORT=8000
BRAND=E-Commerce

MONGODB_PORT=27018
DB_NAME=e_commerce
```


## 📦 How to Start

### Open CMD at root

```cmd
docker-compose up --build
```
 
### Default Admin Account 
email: ```<your email in .env>```

password: ```admin```
