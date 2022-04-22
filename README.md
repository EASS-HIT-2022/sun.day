![Logo](/Sun.Day.png)

# Sun.Day Web Application

Sun.Day this is a simple web application that I developed in part of "EASS-HIT-2022" course, 
I developed it to manage my clients and the tasks of each of them.


## Requirements

- Docker 🐳
- docker-compose


## 🌱 Getting Started
### Installation
To run this project, you will need to edit the following environment variables in Dockerfile
1. Clone the repo
   ```sh
   git clone https://github.com/EASS-HIT-2022/sun.day-app.git
   ```
2. Enter your MongoDB Atlas credentials in `Dockerfile`
   ```
   ENV DATABASE_USER=<your_user>

   ENV DATABASE_PASSWORD=<your_password>
   ```
3. Docker build
   ```sh
   cd <your_path>/sun.day-app/backend

   docker build -t sunday-backend .
   ```
4. Docker run
   ```sh
   docker run -d -p 8080:8080 sunday-backend
   ```
5. That's all, The API server running and listen at http://localhost:8080/docs
## Roadmap

- [x] First microservice: Backend with FastAPI & Pydantic
- [ ] Second microservice: Frontend with React.js
    - [ ] Welcome Page
    - [ ] Login \ Register
- [ ] Third microservice: Database MongoDB

```sh
Project tree:

.
├── README.md
└── backend
    ├── Dockerfile
    ├── __init__.py
    ├── core
    │   ├── __init__.py
    │   ├── config.py
    │   ├── hashing.py
    │   ├── jwttoken.py
    │   └── oauth.py
    ├── db
    │   ├── __init__.py
    │   └── database.py
    ├── main.py
    ├── models
    │   ├── __init__.py
    │   ├── ObjectId.py
    │   ├── customers.py
    │   ├── tasks.py
    │   ├── tokens.py
    │   └── users.py
    ├── requirements.txt
    └── routers
        ├── __init__.py
        └── api
            └── v1
                ├── __init__.py
                ├── customers.py
                ├── tasks.py
                └── users.py


```
## Built With

**Client:** React, Redux, TailwindCSS

**Server:** Python, FastAPI


## Support

For support, email nivh@gmail.com or join our Slack channel.


