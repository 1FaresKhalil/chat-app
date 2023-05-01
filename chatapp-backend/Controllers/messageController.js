let {MessageService} = require("../Services/messageService");
let service = new MessageService();
class MessageController {

    async addMessage(req,res) {
        const data = req.body;
        let result = await service.addMessage(data);
        if(result === null){
            res.status(500).json({message : "Their is error happen"});
        }else if (result === "success"){
            res.status(200).json({message : "Message added"});
        }
    }

    async getMessagesOfConversation(req,res) {
        const {conversationId} = req.params;
        let result = await service.getMessagesOfConversation(conversationId);
        if(result === null){
            res.status(500).json({message : "Their is error happen"});
        }else{
            res.status(200).json({result : result});
        }
    }
}
module.exports = {
    MessageController
}