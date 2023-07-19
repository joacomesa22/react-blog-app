import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { FaTrash } from "react-icons/fa";

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
      <div className="posts__container">
        {postsList.map((post) => {
          return (
            <div className="post" key={post.id}>
              <h2>{post.title}</h2>
              <div className="postTextContainer">
                <p>{post.postText}</p>
              </div>
              <div className="postFooter">
                <h3>@ {post.author.name}</h3>
                <div className="deletePost">
                  {isAuth && post.author.id === auth.currentUser.uid && (
                    <button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
