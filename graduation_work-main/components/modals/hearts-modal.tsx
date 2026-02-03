"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useHeartsModal } from "@/store/use-hearts-modal"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"

export const HeartsModal = () => {
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const { isOpen, close } = useHeartsModal()

    useEffect(() => setIsClient(true), [])

    const onClick = () => {
        close()
        router.push("/shop")
    }
    if (!isClient) {
        return null
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/mascot_bad.png" alt="Mascot" height={80} width={80}/>
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        У вас завершились серця!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Перейдіть у магазин та поновіть їх.
                    </DialogDescription>

                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary" className="w-full" size="lg" onClick={onClick}>
                            Поновити серця
                        </Button>
                        <Button variant="primaryOutline" className="w-full" size="lg" onClick={close}>
                            Ні, дякую
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}