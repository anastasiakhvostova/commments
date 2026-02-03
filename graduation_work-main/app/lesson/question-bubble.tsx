import Image from "next/image"

type Props = {
    question: string
}

export const QuestionBubble = ({ question }: Props) => {
    return (
        <div className="flex items-start gap-x-4 mb-8 animate-fadeIn">
            {/* Аватар */}
            <Image
                src="/mascot1.png"
                alt="Mascot"
                height={70}
                width={70}
                className="rounded-full shadow-lg lg:h-[90px] lg:w-[90px]"
            />

            {/* Бульбашка */}
            <div className="relative py-4 px-6 bg-gradient-to-br from-orange-400 to-orange-600 
                            border-2 border-orange-700 shadow-xl rounded-2xl 
                            text-white text-base lg:text-xl leading-relaxed max-w-[80%]">

                {question}

                {/* Хвостик */}
                <div className="absolute -left-4 top-6 w-0 h-0 
                                border-y-8 border-y-transparent 
                                border-r-8 border-r-orange-600" />
            </div>
        </div>
    )
}

