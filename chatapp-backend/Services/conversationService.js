const Conversation = require('../Model/Conversations');
class ConversationService {

    async newConversation(senderId, receiverId) {
        try {
            const saved_conversation = await new Conversation({members : [senderId,receiverId],});
            await saved_conversation.save();
            return "success";
        }catch (e) {
            return null;
        }
    }

    async getConversationOfUser(userId) {
        try {
            return await Conversation.find({members: {$in : [userId]}});
        }catch (e) {
            return null;
        }
    }
}
module.exports = {
    ConversationService
}