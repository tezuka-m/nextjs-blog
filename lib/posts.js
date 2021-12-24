import fetch from "node-fetch";

/**
 * ブログの詳細情報を取得
 */
export async function getAllPostData() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`
    );
    const posts = await res.json();
    // ブログ情報の作成日を昇順にして取得
    const filteredPosts = posts.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    return filteredPosts;
}

/**
 * ブログのidを取得
 */
export async function getAllPostIds() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`
    );
    const posts = await res.json();
    // map(() => ())と書けば return の記載は不要
    return posts.map((post) => ({
        params: {
            id: String(post.id),
        },
    }));
}

/**
 * idからブログ情報を取得
 */
export async function getPostData(id) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}`
    );
    const post = await res.json();
    return {
        post,
    };
}
