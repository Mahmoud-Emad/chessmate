# ChessMate

ChessMate is an online chess game that allows users to play chess with each other in real-time. It allows users to create a room with a generated username and room ID, join a room using the generated room ID, and play chess with other users in the same room.

## Features

- Create a room with a generated username and room ID
- Join a room using the generated room ID
- Play chess with other users in the same room
- Chat with other users in the same room
- Detect when a user enters or leaves the room

## Getting Started

To get started with ChessMate, follow these steps:

- Clone the repository to your local machine:

```sh
git clone https://github.com/Mahmoud-Emad/chessmate.git
```

- Install the dependencies:

```sh
cd chessmate
npm install
```

- Set up Firebase for your project by creating a new Firebase project, setting up the Firebase CLI, and creating a Firebase Realtime Database.
- Replace the Firebase configuration in src/utils/environment.ts with your own Firebase configuration.
- Start the server:

```sh
ng start
```

- Open your browser and go to [localhost:4200](http://localhost:4200).

## Usage

To use ChessMate, follow these steps:

- Visit the [ChessMate](https://chess-app-25fb5.web.app/) website.
- Click on the "Create Room" button to create a new room with a generated username and room ID.
- Share the generated room ID with other users you want to play with.
- Other users can join the room by entering the generated room ID on the "Join Room" card.
- Once all users have joined the room, the game can begin.
- Use the chessboard to play the game.
- Chat with other users in the room using the chat feature.
- When the game is over, users who are not playing can watch the game as spectators. `feature will be implemented soon, if user did a refresh to the page will watch the game as a spectator`
- When user enter the room in anytime of the game, the game history will be loaded.

## Contributing

If you'd like to contribute to ChessMate, follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix:

```sh
git checkout -b feature/your-feature-name
```

- Make changes and commit them:

```sh
git add .
git commit -m "Your commit message"
```

- Push your changes to your fork:

```sh
git push origin feature/your-feature-name
```

- Create a pull request.
