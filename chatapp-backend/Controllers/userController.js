let {UserService} = require("../Services/userService");
let service = new UserService();
class UserController {
    async signUp(req,res) {
        let data = req.body;
        let result = await service.signUp(data);
        if(result === false){
            res.json({
                message :"Their is error in signup"
            })
        }else if(result === true) {
            res.json({
                message :"Successful signup"
            })
        }else{
            res.json({
                message: "the username already exists use another one!"
            })
        }
    }

    async login(req,res) {
        let {username, password} = req.body;
        let result = await service.login(username, password);
        if (result === null) {
            res.json({
                message: "login fail try another time"
            })
        }else if (result.message === "user not found") {
            res.status(404).json({
                message: "user not found"
            })
        }else if (result.message === "password wrong") {
            res.json({
                message: "password wrong try another time!"
            })
        }else{
            res.json({
                result
            })
        }
    }

    async getProfile(req,res) {
        let token = req.headers["authorization"];
        let result = await service.getProfile(token);
        if(result === null){
            res.status(404).json({
                message: "user not found"
            })
        }else{
            res.json({
                user :result
            })
        }
    }

    async getUserById(req,res) {
        let id = req.params.id;
        let user = await service.getUserById(id);
        if (user === null) {
            res.status(404).json({
                message: "there is no user found!"
            })
        } else {
            res.json({
                "user": user
            })
        }
    }

    async getAllUsers(req,res) {
        let result = await service.listAllUsers();
        if (result === null) {
            res.json({
                message: "there is error to list all user"
            })
        } else {
            res.json({
                "users": result
            })
        }
    }
}
module.exports = {
    UserController
}