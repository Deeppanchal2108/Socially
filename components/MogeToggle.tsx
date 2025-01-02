"use client"
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

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center"
            aria-label="Toggle Dark Mode"
        >
            {theme === "light" ? (
                <Sun className="w-4 h-4" />
            ): (
                    <Moon className = "w-4 h-4" />
                
            )}
        </Button>
    );
}
