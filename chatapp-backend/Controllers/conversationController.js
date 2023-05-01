let {ConversationService} = require("../Services/conversationService");
let service = new ConversationService();
class ConversationController {

    async newConversation(req,res) {
        const {senderId, receiverId} = req.body;
        let result = await service.newConversation(senderId, receiverId);
        if(result === null){
            res.status(500).json({message : "Their is error happen"});
        }else if (result === "success"){
            res.status(200).json({message : "Conversation added"});
        }
    }

    async getConversationOfUser(req,res) {
        const {userId} = req.params;
        let result = await service.getConversationOfUser(userId);
        if(result === null){
            res.status(500).json({message : "Their is error happen"});
        }else{
            res.status(200).json({result : result});
        }
    }

    async getConversationOfTwoUsers(req,res) {
        const {firstUserId, secondUserId} = req.params;
        let result = await service.getConversationOfTwoUsers(firstUserId, secondUserId);
        if(result === null){
            res.status(500).json({message : "Their is error happen"});
        }else if(result === []){
            res.status(200).json({result : []});
        }else if(result === 'no conversation'){
            res.status(200).json({result : 'no conversation'});
        }
        // else if(result === 'new conversation with same user created'){
        //     res.status(404).json({message : "new conversation with same user created"});
        // }else if(result === "new conversation created"){
        //     res.status(200).json({message : "new conversation created"});
        // }
        else{
            res.status(200).json({result : result});
        }
    }
}
module.exports = {
    ConversationController
}