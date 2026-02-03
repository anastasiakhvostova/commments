import { X, InfinityIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { useExitModal } from "@/store/use-exit-modal"

type Props = {
    hearts: number
    percentage: number
}

export const Header = ({
    hearts,
    percentage,
}: Props) => {
    const { open } = useExitModal() 
    return (
        <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
            <X onClick={open}
                className="text-slate-500 hover:opacity-75 transition cursor-pointer"/>
                <Progress value={percentage}/>
                    <div>
                        <Image src="/heart.png" height={28} width={28} alt="Heart" className="mr-2"/>
                        {hearts}
                    </div>
        </header>
    )
}