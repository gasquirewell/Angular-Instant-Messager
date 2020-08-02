import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Post } from './../models/post';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';
import { Friend } from '../models/friends';
import { constants } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  /*saveFriend: any;
  getAllFriends() {
    throw new Error("Method not implemented.");
  }*/

  allPost: Observable<Post[]>;
  allFriends: Observable<Friend[] >;

  // COLLECTION <--> DATABASE
  postCollection: AngularFirestoreCollection<Post>;
  friendCollection: AngularFirestoreCollection<Friend>;


  constructor(private fst: AngularFirestore) { 
    this.postCollection = fst.collection<Post>( 'posts');
    this.friendCollection = fst.collection<Friend>( 'friends');
  }


  private retrievePosts() {
    this.allPost = this.postCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(p => {
          const data: any = p.payload.doc.data();
          const badDate: any = data.timeStamp;
          data.timeStamp = new firestore.Timestamp(badDate.seconds, badDate.nanoseconds).toDate();
          return  {...data};
        });
      })
    );
  }

  private retrieveFriends(){
    this.allFriends = this.friendCollection.valueChanges();
  }

  sendPost(post){
    const item = Object.assign({}, post);
    this.postCollection.add(item);

  }

  saveFriend(friend){
    const item = Object.assign({}, friend);
    this.friendCollection.add(item);
  }

  getAllPosts(){
    this.retrievePosts();
    return this.allPost;

  }
getAllFriends(){
    this.retrieveFriends();
    return this.allFriends;
  }
}




