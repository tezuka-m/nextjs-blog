import Link from "next/link";

/**
 * ブログの一覧作成
 */
export default function Post({ post }) {
    return (
        <div className="m-4">
            <span>{post.id}</span>
            {" : "}
            <Link href={`/posts/${post.id}`}>
                <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
                    {post.title}
                </span>
            </Link>
        </div>
    );
}
