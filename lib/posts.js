//import fetch from "node-fetch";
const apiUrl = "https://jsonplaceholder.typicode.com/posts";


//非同期処理を定義する関数宣言
/**
 * 
 * async functionは呼び出されるとPromiseを返す
 * async functionが値をreturnした場合、Promiseは戻り値をresolveする
 * async functionが例外や何らかの値をthrowした場合はその値をrejectする
 * 
 * PromiseはES2015で導入された非同期処理の状態や結果を表現するビルトインオブジェクト
 * 非同期処理に成功した場合は、resolveを呼ぶ
 * 非同期処理に失敗した場合は、rejectを呼ぶ
 */
export async function getAllPostsData(){
    //await式はPromiseの非同期処理が完了するまで処理を止める構文で非同期処理を同期処理のように扱える
    const res = await fetch(new URL(apiUrl));// fetchでエンドポイントから取得したjsonを読み込む
    const posts = await res.json(); // resをjson形式に変換
    return posts;
}


// IDの一覧を取得する
export async function getAllPostIds(){
    const res = await fetch(new URL(apiUrl));
    const posts = await res.json();

    return posts.map((post) => {
        return {
            params: {
                id: String(post.id),
            },
        };
    });
}

// 特定のIDを使ってDBからビルド時にデータを取得する
// IDを引数として受け取ったらそのIDを使ってURLを生成しfetch
export async function getPostData(id){
    const res = await fetch(new URL(`${apiUrl}/${id}/`));
    const post = await res.json();

    return post;
}


