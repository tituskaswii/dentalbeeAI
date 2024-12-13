# Notes App
A simple Notes App made using React JS, Redux and Django Rest Framework.

<br/>

<div align="center"><img src="https://i.ibb.co/ZVh1f3m/Dashboard.png" alt="base" border="0"><p>Home Page</p></div>

<div align="center"><img src="https://i.ibb.co/1dkyqk9/Alert.png" alt="alert" border="0"><p>React Alert Component</p></div>

<div align="center"><img src="https://i.ibb.co/yn4MtMk/Login.png" alt="login" border="0"><p>Login Page</p></div>

<div align="center"><img src="https://i.ibb.co/85PZqC6/Register.png" alt="register" border="0"><p>Register Page</p></div>

<div align="center"><img src="https://i.ibb.co/XCBXGTh/Create-note.png" alt="base" border="0"><p>Create Note</p></div>

<div align="center"><img src="https://i.ibb.co/FzZHPmx/View-note.png" alt="base" border="0"><p>View Note</p></div>

<div align="center"><img src="https://i.ibb.co/Z8XHJbh/Update-edit-note.png" alt="base" border="0"><p>Update Note</p></div>

<div align="center"><img src="https://i.ibb.co/bPrgZT4/delete-note.png" alt="base" border="0"><p>Delete Note Page</p></div>

<div align="center"><img src="https://i.ibb.co/hH7btjw/Record-audio-permision.png" alt="base" border="0"><p>Record audio</p></div>

<div align="center"><img src="https://i.ibb.co/0rZmD3M/record-audio.png" alt="base" border="0"><p>Record audio</p></div>

## Technologies used:

Frontend:
- Frontend - `ReactJS`
- Styling - `vanilla CSS`
- `React Alert` package for showing Toast messages (frontend)
- `Redux` for managing state (frontend)
- `React Router` for routing (frontend)
- `ReactMic` for Recording audio (frontend)

Backend:
- Backend - `Django` + `Django Rest Framework`

Database:
- Database - `Postgres`. But you can easily plug and use the DB of your choice, e.g. SQLite, Mysql.

## Description

This is a simple note taking app with Token Based Authentication. Any user can easily login/register using their `email` and `password`. After that they will be able to use this Notes App. The authenticated users will be able to do the following:

- Create a note
- Read all (and only) their notes
- Delete their own note
- Logout from their current account
- Add an audio to a note (Cannot upload mp3 audio, user must record from within the app)

A single `note` consists of the following data:

- `title` - the title of the note
- `body` - the content of the note
- `created_at` - when it was created
- `author` - who created it

## Option 1. Running the system as a container (Docker)

Here is a comprehensive guide on how to set up and run your Dockerized project on a local machine or laptop. This guide assumes that you are working with a project that includes Dockerized services such as a PostgreSQL database, a backend API, and any other services (e.g., microservices, web apps) that are part of the project.

---

# Setting Up Your Dockerized Project Locally

## Prerequisites

Before you start, ensure you have the following installed on your machine:

### 1. **Docker Engine**

You need to have Docker installed on your machine to run Docker containers. Follow the instructions below based on your operating system:

- **Windows**: [Install Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/)
- **macOS**: [Install Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/)
- **Linux**: Follow the official instructions for your Linux distribution [Install Docker Engine on Linux](https://docs.docker.com/engine/install/)

Once installed, verify that Docker is running by running this command in your terminal:
```bash
docker --version
```

This should return the installed Docker version.

### 2. **Docker Compose**

Docker Compose is a tool used to define and manage multi-container Docker applications. If you installed Docker Desktop (on Windows or macOS), Docker Compose is included by default. On Linux, you may need to install Docker Compose separately:

Follow the official instructions: [Install Docker Compose](https://docs.docker.com/compose/install/).

Once installed, verify Docker Compose by running:
```bash
docker-compose --version
```

This should display the installed version of Docker Compose.

## Project Setup

### Step 1: Clone the Project Repository

Start by cloning the project repository to your local machine. Replace `<your-repository-url>` with the URL of your project:

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

### Step 2: Configure Environment Variables

Your project likely requires environment variables for configuring things like database credentials, ports, and other application settings. These variables are often stored in `.env` files or can be passed directly into your Docker containers.

1. **Check for a `.env.example` file**:  
   Many projects include a sample `.env` file (e.g., `.env.example`) with all the required variables. Copy it and rename it to `.env`:

   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file**:  
   Open the `.env` file and make any necessary adjustments for your local setup. This may include database credentials, service ports, etc.

### Step 3: Build the Docker Containers

Your project should include a `docker-compose.yml` file, which defines all the services that will run within Docker containers. To build the containers, run:

```bash
docker-compose build
```

This will download any required images and build your containers based on the configuration specified in the `docker-compose.yml` file.

### Step 4: Start the Services

Once the containers are built, start all the services by running:

```bash
docker-compose up
```

This will start the containers in the foreground. You should see logs from all the running services in your terminal.

If you want to run the containers in the background (detached mode), use the `-d` flag:

```bash
docker-compose up -d
```

### Step 5: Verify the Services are Running

Once the containers are up and running, you can check their status with the following command:

```bash
docker-compose ps
```

This will show the status of all the containers. If everything is set up correctly, you should see all your services in the `Up` state.

### Step 6: Access the Application

Depending on the configuration, your project may expose different ports for various services (e.g., a backend API, a web application, or a database). To access the application:

1. **Web Application**: If you have a web app running inside a container, it may be accessible on `http://localhost:3000 or http://127.0.0.1:3000`. Check the `docker-compose.yml` for the specific port or to adjust it fi need be.

2. **API**: If the backend API is running, it will be accessible via `http://localhost:8000 or http://127.0.0.1:8000`.

3. **Database**: You can connect to the PostgreSQL database running in a container using a PostgreSQL client. For example, using `psql`:

   ```bash
   psql -h localhost -U <username> -d <database-name>
   ```

   Replace `<username>` and `<database-name>` with the correct values from your `.env` file.

### Step 7: Access Docker Logs

You can view the logs of any container by running:

```bash
docker-compose logs <service-name>
```

For example, to view the logs of the backend API service, use:

```bash
docker-compose logs backend
```

This will print the logs of the specified service.

### Step 8: Stopping and Cleaning Up

To stop the containers, run:

```bash
docker-compose down
```

This stops and removes the containers, but it leaves the images and volumes intact. To remove everything (images, containers, and volumes), you can run:

```bash
docker-compose down --volumes --rmi all
```

This is useful if you want to completely clean up your environment.

## Troubleshooting

1. **Port Conflicts**: If you get an error about a port already being in use, check if any other services are using the same port. You can change the port mapping in your `docker-compose.yml` to resolve this.

2. **Database Connection Issues**: Ensure that the database service is fully initialized before your application attempts to connect. Sometimes, services that depend on the database may fail if the database is not yet ready. You may want to add a health check or retry mechanism for the dependent services.

3. **Missing Dependencies**: If you encounter issues with missing dependencies or broken builds, ensure all required files and dependencies (such as `Dockerfile`, `.env`, etc.) are in place.

---

### Conclusion

That's it! You should now have the Dockerized Notes Management app running locally.

---

### Example README section

Here’s a sample section you could use in your README file:

```markdown
## Running the Project Locally with Docker

### Prerequisites

- Docker (Engine & Docker Compose) installed on your machine.

### Setup

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   cd <your-project-folder>
   ```

2. Configure environment variables:

   Copy the `.env.example` file and rename it to `.env`, then modify the values as necessary:

   ```bash
   cp .env.example .env
   ```

3. Build the Docker containers:

   ```bash
   docker-compose build
   ```

4. Start the services:

   ```bash
   docker-compose up
   ```

   Or in detached mode:

   ```bash
   docker-compose up -d
   ```

5. Access the application at `http://localhost:<port>`, depending on your configuration.

6. To stop the services:

   ```bash
   docker-compose down
   ```

For more detailed information on troubleshooting or Docker commands, refer to the Docker documentation.
```

This guide should help anyone new to the project get up and running quickly using Docker on their local machine.

## Option 2. RUnning the system services (Frontend & Backend) Separately

I developed both the Django backend and the ReactJS frontend separately.
One of the many ways to run this project is to **run the Django backend API alone** and then **use the React frontend to consume the API**.

So to do that, first:

- `git clone` or `Download ZIP` this repo `https://github.com/tituskaswii/dentalbeeAI.git`

Then setup the Backend...

# Backend Setup

To setup and start/activate the Backend API server, do the following:

- `cd notes_app/backend/backend/`

## Setting up a virtual environment using venv
- `python3 -m venv venv` will make a virtual environment
- `source venv/bin/activate` to activate the venv. (If you are on windows, then run this instead `venv\Scripts\activate.bat`)

## Installing the requirements
- `pip install -r requirements.txt` will install the needed backend project requirements

## Making migrations
- `python manage.py makemigrations`
- `python manage.py makemigrations notes users`
- `python manage.py migrate`

## Creating the super user
- `python manage.py createsuperuser` and provide the needed infos

## Starting the backend API server
- `python manage.py runserver` will start the Django API server

- At this point, if you want, you can **Login** to the pre-built admin panel by visiting- `http://localhost:8000/admin/` in your browser as the superuser account you just created. From this panel, you will be able to do almost anything to the application!

<br/>
Now our backend server is ready to accept the API requests! So let's setup the frontend...
<br/>

# Frontend Setup

Now let's run our frontend so that we can visually interact with our backend API.

- Open up another terminal and `cd notes_app/frontend/`
- `npm install` will install all the needed modules for the frontend to work
- `npm run start` to start the frontend development server
- Visit `http://localhost:3000` in your browser (normally ReactJS would do this for us)
- Login/Register and test the application!!!
