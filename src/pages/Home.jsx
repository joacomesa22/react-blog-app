import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { BsFillTrashFill } from "react-icons/bs";

function Home({ isAuth }) {
  const [postsList, setPostsList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (postId) => {
    const postDoc = doc(db, "posts", postId);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [deletePost]);

  return (
    <div className="homePage">
      {postsList.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    <BsFillTrashFill />
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer">
              <p>{post.postText}</p>
            </div>
            <h3>@ {post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
