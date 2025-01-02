"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const currentTheme = theme || "dark";

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center hover:bg-gray-200 focus:ring-2 focus:ring-offset-2"
            aria-label="Toggle Dark Mode"
        >
            {currentTheme === "light" ? (
                <Sun className="w-4 h-4 icon-transition" />
            ) : (
                <Moon className="w-4 h-4 icon-transition" />
            )}
        </Button>
    );
}
