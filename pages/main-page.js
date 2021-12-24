import Cookie from "universal-cookie";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Link from "next/link";

const cookie = new Cookie();

/**
 * コンテンツの選択画面
 */
export default function MainPage() {
    const router = useRouter();
    /**
     * アクセストークンを破棄して、ログイン画面に遷移
     */
    const logout = () => {
        cookie.remove("access_token");
        router.push("/");
    };
    return (
        <Layout title="Main page">
            <div className="mb-10">
                <Link href="/blog-page">
                    <a className="bg-gray-200 text-gray-800 hover:bg-indigo-800 hover:text-white text-2xl px-12 py-12 rounded-full duration-300">
                        Blog page
                    </a>
                </Link>
            </div>
            <svg
                onClick={logout}
                xmlns="http://www.w3.org/2000/svg"
                className="mt-10 cursor-pointer h-20 w-20 hover:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
            </svg>
        </Layout>
    );
}
