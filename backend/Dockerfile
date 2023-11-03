# Use an official Python runtime as a parent image
FROM python:3.10

# # Set environment variables for the database connection
# ENV POSTGRES_DB=changemedatabase
# ENV POSTGRES_USER=changeme
# ENV POSTGRES_PASSWORD=chanegme
# ENV POSTGRES_HOST=db

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Copy the rest of your application's code to the container
COPY . /app/

# Make port 80 available to the world outside this container
EXPOSE 80

# Define the command to run your FastAPI application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
