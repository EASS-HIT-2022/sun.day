<p align="center">
<img src="assets/Sun.Day.png">
</p>

# Sun.Day Web Application

Sun.Day this is a simple web application that I developed in part of "EASS-HIT-2022" course,
I developed it to manage my clients and the tasks of each of them.

![Application Design](assets/ApplicationDesign.svg)

## Requirements

- Docker 🐳
- docker-compose

## 🌱 Getting Started

### Installation

To run this project, you will need to edit the following environment variables in Dockerfile

1. Clone the repo
   ```sh
   git clone https://github.com/EASS-HIT-2022/sun.day.git
   ```
2. Enter your MongoDB Atlas credentials in `backend/Dockerfile`

   ```
   ENV DATABASE_USER=<your_user>

   ENV DATABASE_PASSWORD=<your_password>
   ```

   For test you can set: DATABASE_USER=nivh ,DATABASE_PASSWORD=1234566

3. Docker build

   ```sh
   cd <your_path>/sun.day/backend

   docker build -t sunday-backend .
   ```

4. Docker run
   ```sh
   docker run -d --name sunday-backend-container -p 8080:8080 sunday-backend
   ```
5. That's all, The API server running and listen at http://localhost:8080/docs
6. To run pytest:
   ```sh
   docker exec -ti sunday-backend-container bash
   pytest
   ```
7. Part 2 - Docker build Frontend

   ```sh
   cd <your_path>/sun.day/frontend

   docker build -t sunday-frontend:latest .
   ```

8. Part 2 - Docker run frontend
   ```sh
   docker run -d --name sunday-frontend-container -p 3000:3000 sunday-frontend:latest
   ```
9. Enjoy! 🤩 ☁️

   Sun.Day Application is on the air: http://localhost:3000

## Screenshots

![Home](/assets/Home.png)

![Dashboard](/assets/Dashboard.png)

![CustomerPage](/assets/CustomerPage.png)

## Roadmap

- [x] First microservice: Backend with FastAPI & Pydantic
- [x] Second microservice: Frontend with React.js
  - [x] Welcome Page
  - [x] Login \ Register
  - [x] Dashboard
- [ ] Third microservice: Database MongoDB

```sh
Project tree:

.
├── README.md
├── frontend
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

**Client:** React (Next.js), TailwindCSS

**Server:** Python, FastAPI

## Support

For support, email nivh@gmail.com or join our Slack channel.
