import { Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { NewPostModal } from "../../components/NewPostModal";
import { Post } from "../../components/Post";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";

import styles from "./Home.module.css";

interface Post {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  content: [
    {
      id: string;
      post_id: string;
      type: "paragraph" | "link";
      value: string;
    }
  ];
  comments: [
    {
      id: string;
      likes: 1;
      user_id: string;
      post_id: string;
      commentary: string;
      created_at: string;
    }
  ];
  user: {
    name: string;
    role: string;
    avatar: string | null;
    avatar_url: string;
    email: string;
  };
}

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    api.get("/posts").then((resp) => {
      setPosts(resp.data);
    });
  }, []);
  
  return (
    <div>
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <form className={styles.newPost}>
            <button type="button" onClick={handleOpenModal}>
              <Plus />
              Nova publicação
            </button>
            <NewPostModal
              isOpen={isModalOpen}
              onRequestClose={handleCloseModal}
            />
          </form>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              author={post.user}
              content={post.content}
              publishedAt={post.created_at}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
