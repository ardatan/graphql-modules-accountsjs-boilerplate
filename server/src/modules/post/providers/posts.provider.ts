import { Injectable } from "@graphql-modules/di";
import { Db, Collection, ObjectID, ObjectId } from "mongodb";
import { AccountsServer } from '@accounts/server';
import { PostDbObject } from "@models";

@Injectable()
export class PostsProvider {
    collection: Collection<PostDbObject>;
    constructor(db: Db, private accountsServer: AccountsServer) {
        this.collection = db.collection('posts');
    }
    getAllPosts() {
        return this.collection.find().toArray();
    }
    getPostsOfUser(userId: string) {
        return this.collection.find({ userId }).toArray();
    }
    async getUserById(userId: string) {
        return this.accountsServer.findUserById(userId);
    }
    async addPost(title, content, userId) {
        const { insertedId } = await this.collection.insertOne({
            title, 
            content,
            userId,
        } as PostDbObject);
        return {
            _id: insertedId,
            title,
            content,
            userId
        };
    }
}
