let {UserController} = require("../Controllers/userController");
let user_controller = new UserController();

let {ConversationController} = require("../Controllers/conversationController");
let conversation_controller = new ConversationController();

let {MessageController} = require("../Controllers/messageController");
let message_controller = new MessageController();
function routes(app) {
    app.post("/signup", user_controller.signUp);
    app.post("/login", user_controller.login);
    app.get("/users", user_controller.getAllUsers)
    app.get("/profile", user_controller.getProfile);
    app.get("/user/:id", user_controller.getUserById);


    app.post("/conversation", conversation_controller.newConversation);
    app.get("/conversation/:userId", conversation_controller.getConversationOfUser);
    app.get("/conversation/find/:firstUserId/:secondUserId",conversation_controller.getConversationOfTwoUsers);

    app.post("/message", message_controller.addMessage);
    app.get("/message/:conversationId", message_controller.getMessagesOfConversation);
}

module.exports = {
    routes
}