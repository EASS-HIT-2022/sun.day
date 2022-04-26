FROM python:3.9

WORKDIR /code

COPY ./requirements.txt .

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./main.py .

COPY ./__init__.py .

ADD core ./core

ADD routers ./routers

ADD models ./models

ADD db ./db

ADD tests ./tests

ENV DATABASE_USER=<your_user>

ENV DATABASE_PASSWORD=<your_password>

ENV PYTHONPATH "${PYTHONPATH}:/code"

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8080"]
