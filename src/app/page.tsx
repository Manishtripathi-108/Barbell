import { BodyViewer } from '@/components/anatomy/BodyViewer';
import ThemeToggler from '@/components/ui/ThemeToggler';

export default function Home() {
    return (
        <div className="bg-theme-primary relative min-h-screen">
            <ThemeToggler className="absolute top-4 right-4 cursor-pointer" />

            <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 pt-12 pb-16">
                {/* Header */}
                <header className="mb-10 text-center">
                    <h1 className="text-theme-text-primary text-4xl font-bold tracking-tight">Barbell</h1>
                    <p className="text-theme-text-secondary mt-2 text-sm">Hover over a muscle to explore related exercises</p>
                </header>

                {/* Muscle selector */}
                <main className="flex flex-1 items-start justify-center">
                    <BodyViewer />
                </main>

                {/* Future content: selected muscles, exercise list, etc. */}
                <section className="border-theme-border bg-theme-secondary mt-12 rounded-xl border p-6">
                    <p className="text-theme-text-secondary text-center text-sm">Selected muscles and exercises will appear here.</p>
                </section>
            </div>
        </div>
    );
}
