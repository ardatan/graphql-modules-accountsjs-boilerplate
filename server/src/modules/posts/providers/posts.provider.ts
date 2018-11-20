import { Injectable } from "@graphql-modules/core";
import { Db, Collection } from "mongodb";
import { PostDbObject } from "@models";

@Injectable()
export class PostsProvider {
    collection: Collection<PostDbObject>;
    constructor(db: Db) {
        this.collection = db.collection('posts');
    }
    getAllPosts() {
        return this.collection.find().toArray();
    }
    getPostsOfUser(userId: string) {
        return this.collection.find({ userId }).toArray();
    }
    async addPost(title, content, userId): Promise<PostDbObject> {
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
