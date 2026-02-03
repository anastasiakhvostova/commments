import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"

import { Sidebar } from "@/components/sidebar"
import { Menu } from "lucide-react"

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-white"/>
            </SheetTrigger>
            <SheetContent className="p-0 z-[100]" side="left">
                <SheetHeader>
                    <SheetTitle className="sr-only">Mobile Sidebar</SheetTitle>
                </SheetHeader>
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}
