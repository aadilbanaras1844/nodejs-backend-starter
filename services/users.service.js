/* eslint-disable require-jsdoc */


const Cruds = require('./Cruds');
const {UsersModel} = require('./../models');
const {helper} = require('./../config');
const jwt = require('jsonwebtoken');
const { keys } = require('./../config');

class UserService extends Cruds {

    async addStaff(params={}){
        params.is_staff = true;
        params.is_super_admin = true;
        params.password = await helper.encryptPassword(params.password)
        return this.create(params)
    }

    async updateUser(id, params={}){
        const user = await this.model.findOne({where:{id: id}});
        if(params.first_name)
            user.first_name = params.first_name;
        if(params.last_name)
            user.last_name = params.last_name;
        if(params.username)
            user.username = params.username;
        if(params.password && params.password != '')
            user.password = await helper.encryptPassword(params.password);
        const updatedUser = await user.save();
        return updatedUser.id;
    }

    async deleteUser(id){
        const user = await this.model.findOne({where:{id: id}});
        if(!user)
            throw new Error('User not found')
        return user.destroy();    
    }

    login(username='', password=''){
        const self = this;
        return new Promise(async function(resolve, reject){
            try {
                let user = await self.findOne({username: username});
                if (!user) return reject(new Error("User not found"));
                const passwordMatch = await helper.comparePassword(password, user.password)
                if(!passwordMatch)
                    return reject(new Error("Password mismatch"));
                const token = self.generateUserToken(user);
                return resolve({
                    token: token,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    is_super_admin: user.is_super_admin,
                    is_staff: user.is_staff,
                    username: user.username,
                })
            } catch (error) {
                return reject(error);
            }
            
        })
    }

    async getUsers(){
        let users = await this.findAll();
        return users.map(function(obj) {
            obj.password = '';
            return obj;
        })
    }

    generateUserToken(user){
        const token = jwt.sign( {
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,        
            is_super_admin: user.is_super_admin,
            is_staff: user.is_staff,
        }, keys.jwtKey,
        { expiresIn: '1h' } );
        return token;
    }

}

const userService = new UserService(UsersModel, {});

module.exports = userService;


