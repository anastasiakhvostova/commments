import Image from "next/image"

// Тип пропсів для компонента QuestionBubble
// "question" — текст питання, який відображається у бульбашці
type Props = {
    question: string
}

// Функціональний компонент QuestionBubble
// Відповідальний за відображення питання з аватаром та бульбашкою
export const QuestionBubble = ({ question }: Props) => {
    return (
        // Основний контейнер для аватара та бульбашки
        // flex: включає flex-контейнер
        // items-start: вирівнювання по верхньому краю
        // gap-x-4: відступ між аватаром та бульбашкою
        // mb-8: відступ знизу
        // animate-fadeIn: анімація появи (fade-in)
        <div className="flex items-start gap-x-4 mb-8 animate-fadeIn">

            {/* Аватар персонажа */}
            <Image
                src="/mascot1.png"             // шлях до картинки аватара
                alt="Mascot"                   // альтернативний текст
                height={70}                     // висота зображення
                width={70}                      // ширина зображення
                className="rounded-full shadow-lg lg:h-[90px] lg:w-[90px]" // кругле зображення з тінню, більші розміри на lg
            />

            {/* Бульбашка з питанням */}
            <div className="relative py-4 px-6 bg-gradient-to-br from-orange-400 to-orange-600 
                            border-2 border-orange-700 shadow-xl rounded-2xl 
                            text-white text-base lg:text-xl leading-relaxed max-w-[80%]">

                {/* Вставляємо текст питання */}
                {question}

                {/* Хвостик бульбашки */}
                <div className="absolute -left-4 top-6 w-0 h-0 
                                border-y-8 border-y-transparent 
                                border-r-8 border-r-orange-600" />
            </div>
        </div>
    )
}
