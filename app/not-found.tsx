import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
            <h2 className="text-2xl font-medium text-foreground mb-4">Not Found</h2>
            <p className="text-muted-foreground text-center mb-8">
                Sorry, we couldn't find the page you're looking for.
            </p>
            <Button asChild variant="outline">
                <Link href="/" className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
        </div>
    )
}