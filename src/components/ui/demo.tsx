import Icon from '@/components/ui/Icon';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const data = [
    { title: 'Home', icon: 'appLogo' },
    { title: 'Search', icon: 'search' },
    { title: 'Profile', icon: 'person' },
    { title: 'Settings', icon: 'settings' },
    { title: 'Music', icon: 'musicQueue' },
    { title: 'Theme', icon: 'sun' },
] as const;

export function AppleStyleDock() {
    return (
        <div className="fixed bottom-2 left-1/2 z-20 max-w-full -translate-x-1/2">
            <Dock className="items-end pb-3">
                {data.map((item) => (
                    <DockItem key={item.title} className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800">
                        <DockLabel>{item.title}</DockLabel>
                        <DockIcon>
                            <Icon icon={item.icon} className="h-full w-full text-neutral-600 dark:text-neutral-300" />
                        </DockIcon>
                    </DockItem>
                ))}
            </Dock>
        </div>
    );
}
