"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);
    const [error, setError] = useState('');

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setLoginInProgress(true);
        setError(''); // Clear previous errors

        const result = await signIn('credentials', { 
            email, 
            password,
            callbackUrl: '/'
        });

        if (result.error) {
            setError("Login failed: " + result.error);
            console.error("Login failed:", result.error);
        }

        setLoginInProgress(false);
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Login
            </h1>
            {error && (
                <div className="text-center text-red-500 mb-4">
                    {error}
                </div>
            )}
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    disabled={loginInProgress}
                    onChange={ev => setEmail(ev.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    disabled={loginInProgress}
                    onChange={ev => setPassword(ev.target.value)}
                />
                <button type="submit" disabled={loginInProgress}>
                    Login
                </button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button 
                    type="button" 
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="flex gap-4 justify-center"
                >
                    <Image src={'/google.png'} alt={'Google logo'} width={24} height={24} />
                    Login with Google
                </button>
                
            </form>
            <div className="text-center my-4 text-gray-500 border-t pt-4">
                Doesn't have account?{" "}
                <Link className="underline" href={"/register"}>
                    Register here &raquo;
                </Link>
            </div>
        </section>
    );
}
