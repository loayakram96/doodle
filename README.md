# Doodle
Real-time chat application for a full-stack position at Doodle

# How to run
- Clone the repository to your local machine.
- Ensure that Docker is installed on your computer.
- Make sure you have the necessary environment variables set in a ```.env``` file located in the project's root folder.
- Open a terminal and navigate to the project's root directory.
- Run the following command to build and start the application:
```docker-compose up -d --build```
- Once the containers are up and running, you can access the application at http://localhost:3050/.

# Q: Tell us what motivated your technology choices.

I chose React.js because it is my most experienced front-end framework. I am comfortable with integrating the components and the server calls. I also chose Socket.io because it allows the server to push information to the client in real time, which is essential for a chat app. HarperDB is a good choice for a database because it supports both SQL and NoSQL, and it is easy to integrate with React.js and Node.js. Finally, I chose Node.js because it is a popular and well-documented backend framework that is compatible with React.js.

# Q: How did you tackle the task?

I started by determining the technologies I would use. Once I had decided on the technologies, I immediately started by initializing the client and server projects. I then started with the client side, adding good-looking home/chat pages with simple CSS. I then moved on to implementing Socket.io and connecting the backend and frontend together. Once I had made sure that the Socket.io connection was working, I continued by implementing all of the major sockets, such as join_room, receive_message, send_message, leave_room, and disconnect. I tested each socket to make sure that it was working properly. I then moved on to integrating the HarperDB database. I found that the instructions for integrating HarperDB were well-documented, so I did not have any major problems setting up the environment. I created the two services that I needed, "get-messages" and "save-message", since I did not need any other APIs for this project. I then connected all of the services together and tested different scenarios. Finally, I started to dockerize the application. I provided Nginx as a reverse proxy, which forwards requests to the backend services based on the requested paths. I also set up the docker-compose.yml file, which is responsible for configuring Docker services for a multi-container application.

# Q: What would you do differently if you were given more time?
- Implement the useRef method to automatically scroll the chat container when receiving new messages.
- Address session loss on page refresh/disconnection by implementing user tokens and local storage for improved user experience.
- Enhance the mobile view of the chat page to ensure a better responsive design.
- Optimize API connections to dynamically adapt between Docker and local environments, eliminating the need for manual configuration changes.
- Implement unit tests for backend services, database APIs, and potentially frontend components to enhance code quality and reliability.

# Q: What would you do differently a second time around?

I think I handled all of the steps pretty decently and did not spend more time than needed on the project. I would probably go with the same steps again since they achieved the goal of the challenge and did not require more time to finish.
