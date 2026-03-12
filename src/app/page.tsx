import { BodyViewer } from '@/components/anatomy/BodyViewer';

// import ThemeToggler from "@/components/ui/ThemeToggler";

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            {/* <ThemeToggler className='absolute top-4 right-4 cursor-pointer' /> */}
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
                <BodyViewer />
            </main>
        </div>
    );
}
