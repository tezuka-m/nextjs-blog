import Layout from "../components/Layout";
import { ChevronDoubleLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { getAllPostData } from "../lib/posts";
import Post from "../components/Post";

/**
 * ブログの一覧画面
 */
export default function BlogPage({ filteredPosts }) {
    return (
        <Layout title="Blog page">
            <ul>
                {filteredPosts &&
                    filteredPosts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
            </ul>
            <Link href="/main-page">
                <div className="flex m-6 items-center cursor-pointer hover:text-gray-400 text-2xl">
                    <ChevronDoubleLeftIcon
                        className="h-7 w-7"
                        aria-hidden="true"
                    />
                    <span>Return to main page</span>
                </div>
            </Link>
        </Layout>
    );
}

/**
 * ビルド時にブログ情報を全て取得
 */
export async function getStaticProps() {
    const filteredPosts = await getAllPostData();
    return {
        props: { filteredPosts },
        revalidate: 3,
    };
}
