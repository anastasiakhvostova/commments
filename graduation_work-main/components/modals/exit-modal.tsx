"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useLanguage } from "@/components/languageContext";
import { translations } from "@/components/translations";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {useExitModal} from "@/store/use-exit-modal"

export const ExitModal = () => {
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const { isOpen, close } = useExitModal()
    const { lang } = useLanguage();

    useEffect(() => setIsClient(true), [])

    if (!isClient) {
        return null
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <div className="flex items-center w-full justify-center mb-5">
                            <Image
                            src="/mascot_sad.png"
                            alt="Mascot"
                            height={80}
                            width={80}/>
                        </div>
                        <DialogTitle>
                            {translations[lang].title}
                        </DialogTitle>
                        <DialogDescription>
                            {translations[lang].description}
                        </DialogDescription>
                        <DialogFooter className="mb-4">
                            <div className="flex flex-col gap-y-4 w-full">
                                <Button variant="primary" className="w-full" size="lg" onClick={close}>
                                    {translations[lang].continue}
                                </Button>
                                 <Button variant="dangerOutline" className="w-full" size="lg" onClick={() => {
                                    close()
                                    router.push("/learn")
                                 }}>
                                    {translations[lang].finish}
                                </Button>
                            </div>
                        </DialogFooter>
                    </DialogHeader>

                </DialogContent>
        </Dialog>
    )
}