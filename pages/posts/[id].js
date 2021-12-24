import Link from "next/link";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
// アイコン名(uppercamelcase)+Icon で heroiconsのアイコンをコンポーネントとして呼び出せる
import { ChevronDoubleLeftIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

/**
 * ブログの詳細一覧画面
 * @param post getStaticPropsの戻り値propsが渡される
 */
export default function Post({ post }) {
    const router = useRouter();

    if (router.isFallback || !post) {
        return <div>Loading......</div>;
    }
    return (
        <Layout title={post.title}>
            <p className="m-4 text-gray-400">
                {"ID : "}
                {post.id}
            </p>
            <p className="mb-4 text-xl font-bold hover:scale-110 duration-200">
                {post.title}
            </p>
            <p className="mb-12 text-gray-400">{post.created_at}</p>
            <p className="px-10 text-gray-400">{post.content}</p>
            <Link href="/blog-page">
                <div className="flex m-6 items-center cursor-pointer hover:text-gray-400 text-2xl">
                    <ChevronDoubleLeftIcon
                        className="h-7 w-7"
                        aria-hidden="true"
                    />
                    <span>Return to blog-page</span>
                </div>
            </Link>
        </Layout>
    );
}

/**
 * ビルド時にDynamic Routes([id].js)でも静的ファイルを生成する
 * ここでは、APIからID一覧を取得し、idに合わせて静的ファイルを生成
 * 例 APIからid(1-10)を取得した場合：ビルド時に posts/1 - posts/10 までのページを生成
 */
export async function getStaticPaths() {
    const paths = await getAllPostIds();
    return {
        paths,
        /**
         * true: 「404」ページを返さずgetStaticPropsを実行してidに紐づく静的ファイルを生成する
         * false: getStaticPathsで生成されていないパスは全て「404」ページを返す
         */
        fallback: true,
    };
}

/**
 * ビルド時にidに紐づいたブログ情報を取得し、ページを生成する
 * @param params ルートパラメータ{id: ...}
 */
export async function getStaticProps({ params }) {
    const { post: post } = await getPostData(params.id);
    return {
        props: {
            post,
        },
        /**
         * ISRにする(revalidate の値は秒数で前回から何秒以内のアクセスを無視するか指定)
         * WARNING: devモードだとISRの検証不可(devモードでは毎回getStaticPropsが呼び出される)
         *          「npm run build」 -> 「npm start」の順に実行
         */
        revalidate: 3,
    };
}
