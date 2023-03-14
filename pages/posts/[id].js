import Link from "next/link";
import Layout from "../../components/Layout";
import {getAllPostIds, getPostData} from "../../lib/posts";

//defaultを使うとimport側の裁量でimport時に対象を自由に命名できる
export default function Post({post}) {
    // propsで渡されたpostを受け取って、そのデータをもとにHTMLを生成する
    if (!post){// postデータがないときはLoading...というテキストを表示
        return <div>Loading...</div>
    }

    //データがある場合はこっちの処理
    // Layoutコンポーネントで全体を囲い、ID、Title、BodyをHTMLとして埋め込む
    return (
        <Layout title={post.title}>
            <p className="m-4">
                {"ID : "}
                {post.id}
            </p>
            <p className="mb-8 text-xl font-bold">{post.title}</p>
            <p className="px-10">{post.body}</p>

            <Link href="/blog-page">
                <div className="flex cursor-pointer mt-12">

                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-6 h-6 mr-3">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                    </svg>
                    <span>Back to blog-page</span>

                </div>
            </Link>
        </Layout>
    );
}



export async function getStaticPaths(){
    const paths = await getAllPostIds(); // APIエンドポイントにアクセスしてIDの一覧を取得する

    return {
        paths,
        fallback: false, //予期しないURLにアクセスしたときに404 not foundを返すようにする.
                         // 動的なコンテンツの取得にはtrueにすることで対応可
    };
}

//DBからそれぞれのIDに応じたPostを取得する
export async function getStaticProps({params}) {
    //const {post: post} = await getPostData(params.id);
    const post = await getPostData(params.id);
    return {
        props: {
            post,
        },
    };
}


