import { db } from './firebase_init.js';
import {
  collection,
  addDoc,
  Timestamp,
  collectionGroup,
  getDocs,
  query,
  orderBy,
  where
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export async function createRandomPosts(communityId, userId) {
  const types = ["meme", "academic", "event", "podcast"];

  const postsRef = collection(db, `Communities/${communityId}/Users/${userId}/Posts`);

  for (let i = 0; i < 5; i++) {
    await addDoc(postsRef, {
      type: types[Math.floor(Math.random() * types.length)],
      likes: Math.floor(Math.random() * 200),
      publishedAt: Timestamp.fromDate(new Date(Date.now() - Math.random() * 10000000000)),
      status: "active"
    });
  }
}


export async function getPopularAcademicPosts(communityId) {
  const q = query(
    collectionGroup(db, "Posts"),
    where("type", "==", "academic"),
    where("likes", ">", 50),
    orderBy("publishedAt", "desc") 
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    path: doc.ref.path,
    ...doc.data()
  }));
}



export async function getTopUsersByPopularPosts(communityId) {
  const snapshot = await getDocs(collectionGroup(db, "Posts"));

  const userPostCount = {};

  snapshot.forEach(doc => {
    const post = doc.data();


    if (post.likes > 100) {
      const path = doc.ref.path;

      const match = path.match(/Communities\/(.+?)\/Users\/(.+?)\/Posts\//);
      if (match) {
        const pathCommunityId = match[1];
        const userId = match[2];


        if (pathCommunityId === communityId) {
          userPostCount[userId] = (userPostCount[userId] || 0) + 1;
        }
      }
    }
  });

  const sorted = Object.entries(userPostCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return sorted.map(([userId, count]) => ({ userId, count }));
}