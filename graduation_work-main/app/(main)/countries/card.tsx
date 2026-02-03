//Лера
// ----------------------
// Імпорти
// ----------------------
import { cn } from "@/lib/utils"; 
// cn – утиліта, яка дозволяє об’єднувати CSS-класи умовно.
// Наприклад: cn("class1", condition && "class2") → якщо condition true, то додається class2.

import { Check } from "lucide-react"; 
// Іконка галочки з бібліотеки Lucide. Використовується для позначення активної картки.

import Image from "next/image"; 
// Компонент Next.js для зображень. Оптимізує розмір, підтримує lazy-loading, responsive та webp.


// ----------------------
// Типи пропсів
// ----------------------
type Props = {
    title: string; // Текстовий заголовок картки, відображається під зображенням
    id: number; // Унікальний ID картки, передається при кліку в onClick
    imageSrc: string; // URL або локальний шлях до зображення картки
    onClick: (id: number) => void; // Функція, яка викликається при кліку на картку, отримує id
    disabled?: boolean; // Якщо true, картка неактивна і не клікабельна
    active?: boolean; // Якщо true, картка вважається вибраною (показує галочку)
};

// ----------------------
// Компонент Card
// ----------------------
export const Card = ({
    title,
    id,
    imageSrc,
    disabled,
    onClick,
    active
}: Props) => {

    return (
        // Основний контейнер картки
        <div
            onClick={() => onClick(id)} 
            // Коли користувач натискає на картку, викликаємо onClick з id картки
            className={cn(
                // Основні стилі картки:
                "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]", 
                // h-full – картка займає всю доступну висоту контейнера
                // border-2 – товщина рамки 2px
                // rounded-xl – округлені кути
                // border-b-4 – товщина нижньої границі більша (ефект "піднятої" кнопки)
                // hover:bg-black/5 – при наведенні фон стає чорним на 5% opacity
                // cursor-pointer – курсор стає рукою
                // active:border-b-2 – при натисканні нижня межа зменшується до 2px (ефект натискання)
                // flex flex-col – вертикальне вирівнювання елементів
                // items-center – по горизонталі центр
                // justify-between – вертикально розподіляємо контент по краях
                // p-3 pb-6 – паддінги: 0.75rem зверху/з боків, 1.5rem знизу
                // min-h-[217px] min-w-[200px] – мінімальна висота і ширина картки
                disabled && "pointer-events-none opacity-50"
                // Якщо disabled = true:
                // pointer-events-none – картка не реагує на клік
                // opacity-50 – робимо напівпрозорою
            )}
        >
            {/* Верхня частина картки для галочки активності */}
            <div className="min-[24px] w-full flex items-center justify-end">
                {/* min-[24px] – мінімальна висота 24px */}
                {/* w-full – займає всю ширину контейнера */}
                {/* flex items-center justify-end – вирівнювання: по вертикалі центр, по горизонталі вправо */}
                
                {active && (
                    // Якщо картка активна, показуємо зелений прямокутник з галочкою
                    <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
                        {/* rounded-md – трохи округлені кути */}
                        {/* bg-green-600 – зелений фон */}
                        {/* flex items-center justify-center – центрування іконки */}
                        {/* p-1.5 – паддінг 0.375rem */}
                        <Check className="text-white stroke-[4] h-4 w-4"/>
                        {/* Іконка галочки */}
                        {/* text-white – колір білий */}
                        {/* stroke-[4] – товщина лінії 4px */}
                        {/* h-4 w-4 – висота і ширина 1rem */}
                    </div>
                )}
            </div>

            {/* Зображення картки */}
            <Image 
                src={imageSrc} // джерело зображення
                alt={title} // alt текст для доступності
                height={70} // висота зображення 70px
                width={93.33} // ширина зображення 93.33px
                className="rounded-lg drop-shadow-md border object-cover"
                // rounded-lg – кути злегка округлені
                // drop-shadow-md – тінь
                // border – рамка 1px (за замовчуванням)
                // object-cover – зображення заповнює контейнер без спотворень
            />

            {/* Заголовок картки */}
            <p className="text-neutral-700 text-center font-bold mt-3">
                {title}
                {/* Відображаємо заголовок */}
                {/* text-neutral-700 – сірий колір тексту */}
                {/* text-center – центроване вирівнювання */}
                {/* font-bold – жирний шрифт */}
                {/* mt-3 – відступ зверху 0.75rem */}
            </p>
        </div>
    );
};
