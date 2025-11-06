# E-commerce
## Environment

Create `.env` includes these variables:
- SECRET_KEY
- USER_EMAIL
- USER_PASSWORD
- PORT
- BRAND
- MONGODB_PORT
- DB_NAME
Example:
```env
SECRET_KEY=MAY_NHIN_CAI_CHO_GI

USER_EMAIL="<your mail>"
USER_PASSWORD="<your password>"

PORT=8000
BRAND=E-Commerce

MONGODB_PORT=27018
DB_NAME=e_commerce
```


## 📦 How to Start

Open CMD at root

**_Dev Environment_**

```cmd
docker-compose -f docker-compose.dev.yml up --build
```
**_Production Environment_**

```cmd
docker-compose up --build
```

## List api

**...coming soon...**
