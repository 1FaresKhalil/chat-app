const Message = require("../Model/Message");
class MessageService {

    async addMessage(data) {
        try {
            const saved_message = await new Message(data);
            await saved_message.save();
            return "success";
        }catch (e) {
            return null;
        }
    }

    async getMessagesOfConversation(conversationId) {
        try {
            return await Message.find({conversationId: conversationId,});
        } catch (err) {
            return null;
        }
    }
}
module.exports = {
    MessageService
}