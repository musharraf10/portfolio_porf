import { useState } from "react";
import { FiX, FiMonitor } from "react-icons/fi";

export function DesktopDisclaimer() {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    return (
        <div className="fixed top-16 left-0 right-0 z-40 bg-amber-50 border-b border-amber-200 md:hidden">
            <div className="section-container flex items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-2">
                    <FiMonitor className="h-4 w-4 text-amber-600 shrink-0" />
                    <p className="text-xs text-amber-900">
                        For the best experience, please view this portfolio on a <span className="font-semibold">desktop</span> or larger screen.
                    </p>
                </div>
                <button
                    onClick={() => setDismissed(true)}
                    className="p-1 text-amber-600 hover:text-amber-700 transition-colors shrink-0"
                    aria-label="Dismiss"
                >
                    <FiX className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
