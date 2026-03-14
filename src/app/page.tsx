import { BodyViewer } from '@/components/anatomy/BodyViewer';
import ThemeToggler from '@/components/ui/ThemeToggler';

export default function Home() {
    return (
        <div className="bg-background relative min-h-screen overflow-hidden">
            <div className="from-primary/8 pointer-events-none absolute inset-x-0 -top-48 h-96 bg-linear-to-b to-transparent blur-2xl" />

            <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 pt-8 pb-10 sm:px-8 lg:px-10">
                <header className="mb-8 flex items-start justify-between gap-4 sm:mb-10">
                    <div>
                        <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.2em] uppercase">ANATOMY WORKSPACE</p>
                        <h1 className="text-foreground text-4xl leading-tight font-bold tracking-tight sm:text-5xl">Barbell Atlas</h1>
                        <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed sm:text-base">
                            Hover over muscle groups to inspect movement zones and prepare your training splits with precision.
                        </p>
                    </div>
                    <ThemeToggler className="mt-1 shrink-0" />
                </header>

                <main className="grid flex-1 grid-cols-1 gap-5 lg:grid-cols-[1.45fr_0.85fr]">
                    <section className="bg-card text-card-foreground rounded-xl border p-5 shadow-sm sm:p-7">
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Interactive Muscle Viewer</h2>
                            <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">Front + Back</span>
                        </div>

                        <div className="bg-background/80 rounded-xl border p-3 sm:p-4">
                            <BodyViewer />
                        </div>
                    </section>

                    <aside className="space-y-5">
                        <section className="bg-card text-card-foreground rounded-xl border p-5 shadow-sm sm:p-6">
                            <h3 className="text-sm font-semibold tracking-wide uppercase">Session Notes</h3>
                            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                                Selected muscles, volume guidance, and exercise recommendations can be rendered in this panel.
                            </p>
                        </section>

                        <section className="bg-card text-card-foreground rounded-xl border p-5 shadow-sm sm:p-6">
                            <h3 className="text-sm font-semibold tracking-wide uppercase">Flow</h3>
                            <div className="mt-4 space-y-3">
                                <div className="bg-background rounded-lg border p-3">
                                    <p className="text-muted-foreground text-xs font-semibold tracking-[0.15em] uppercase">01 Hover</p>
                                    <p className="mt-1 text-sm">Discover target and supporting muscles instantly.</p>
                                </div>
                                <div className="bg-background rounded-lg border p-3">
                                    <p className="text-muted-foreground text-xs font-semibold tracking-[0.15em] uppercase">02 Toggle</p>
                                    <p className="mt-1 text-sm">Switch between basic and advanced granularity.</p>
                                </div>
                                <div className="bg-background rounded-lg border p-3">
                                    <p className="text-muted-foreground text-xs font-semibold tracking-[0.15em] uppercase">03 Program</p>
                                    <p className="mt-1 text-sm">Build smarter routines around selected zones.</p>
                                </div>
                            </div>
                        </section>
                    </aside>
                </main>
            </div>
        </div>
    );
}
