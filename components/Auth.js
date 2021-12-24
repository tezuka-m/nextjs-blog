import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";
import { LockClosedIcon } from "@heroicons/react/solid";

const cookie = new Cookie();

export default function Auth() {
    const router = useRouter();
    /**
     * @summary stateの初期化
     */
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    /**
     * ログイン用のAPIを叩く関数
     *    認証に成功した場合：jwtトークン(https://qiita.com/Naoto9282/items/8427918564400968bd2b)を発行し、main-pageへ遷移
     *    認証に失敗した場合："authentication failed"とアラート出力
     */
    const login = async () => {
        try {
            await fetch(
                // .env.localの環境変数 + APIのPath
                `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/create/`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            )
                .then((res) => {
                    if (res.status === 400) {
                        throw "authentication failed";
                    } else if (res.ok) {
                        return res.json();
                    }
                })
                .then((data) => {
                    const options = { path: "/" };
                    cookie.set("access_token", data.access, options);
                });
            router.push("/main-page");
        } catch (error) {
            alert(error);
        }
    };

    /**
     * ログイン or サインアップ(isLoginの状態で変わる)
     * @param {*} e
     */
    const authUser = async (e) => {
        e.preventDefault();
        // true: ログイン処理, false: サインアップ処理(サインアップ完了後はそのままログイン)
        if (isLogin) {
            login();
        } else {
            await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/register/`, {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                if (res.status === 400) {
                    throw "authentication failed";
                }
            });
            login();
        }
    };

    return (
        <div className="max-w-md w-full space-y-8">
            <div>
                {/* 下記のコメントをつけないとwarningが出る */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    {isLogin ? "Login" : "Sign up"}
                </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={authUser}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <input
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => {
                                // フォームの値をusernameに入れる(ログインorサインアップで利用)
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                // フォームの値をpasswordに入れる(ログインorサインアップで利用)
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div className="text-sm">
                        <span
                            className="cursor-pointer hover:text-gray-400"
                            onClick={() => {
                                // "Login", "Sign up"の切り替え
                                setIsLogin(!isLogin);
                            }}
                        >
                            Change mode
                        </span>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 duration-300"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LockClosedIcon
                                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                aria-hidden="true"
                            />
                        </span>
                        {isLogin ? "Login" : "Sign up"}
                    </button>
                </div>
            </form>
        </div>
    );
}
