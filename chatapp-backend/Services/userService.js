const User = require('../Model/User');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

class UserService {

    async signUp(data) {
        try {
            const user = await User.findOne({"username": data.username});
            if (!user) {
                data.password = await bcrypt.hash(data.password, 10);
                data.verified = false;
                const new_user = new User(data);
                await new_user.save();
                return true;
            } else {
                return "the username already exists use another one!"
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async login(username, password) {
        try {
            const user = await User.findOne({"username": username});
            if (!user) {
                return {statues: false, message: "user not found"};
            } else {
                if (!await bcrypt.compare(password, user.password)) {
                    return {statues: false, message: "password wrong"};
                } else {
                    let loginToken = jwt.sign({username: user.username, id: user._id, isAdmin: user.isAdmin}
                        , 'loginccqq');
                    return {
                        statues: true,
                        message: "login successfully",
                        token: loginToken,
                    };
                }
            }
        } catch (e) {
            return null;
        }
    }

    async getProfile(token) {
        try {
            let id = await this.getUserIdFromToken(token);
            return await User.findById(id);
        } catch (e) {
            return null;
        }
    }
    async getUserIdFromToken(token) {
        let decoded = jwt.verify(token, 'loginccqq');
        return decoded.id;
    }

    async getUserById(id) {
        try {
            const user = await User.findById(id);
            if (!user) {
                return null;
            } else {
                return user;
            }
        } catch (e) {
            return null;
        }
    }

    async listAllUsers() {
        try {
            return await User.find({});
        } catch (e) {
            return null;
        }
    }
}

module.exports = {
    UserService
}