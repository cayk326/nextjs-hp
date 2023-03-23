import Layout from "../components/Layout";
import Post from "../components/Post";
import { getAllPostsData } from "../lib/posts";



export default function Blog ({ posts }) {
  //propsとしてpostsをうけとりmapに展開
  return(
    <Layout title="Blog">
      <ul className="m-10">
        {
          posts && posts.map((post) => <Post key={post.id} post={post} />)
        }
      </ul>
    </Layout>
  );
};



/**
 * サーバーサイドでビルド時に実行される 
 * getstaticprops
 * asyncを使って非同期処理を定義する
 * async functionは呼び出されるとPromiseを返す
 * async functionが値をreturnした場合、Promiseは戻り値をresolveする
 * async functionが例外や何らかの値をthrowした場合はその値をrejectする
 */
export async function getStaticProps(){
  // getAllPostsDataを実行する ビルド時にサーバーサイドで一回だけ実行される
  const posts = await getAllPostsData();

  /**
   * 取得したpostsをpropsの状態にして返す
   * props: 親コンポーネントから子コンポーネントへ値を渡すための仕組み
   * state: 各コンポーネントごとに持つ、コンポーネントの状態を管理する仕組み
   */
  // 取得したpostsをpropsとして返す
  // postsはBlog関数のpropsで受け取れる
  return {
    props: { posts },
  };

}
