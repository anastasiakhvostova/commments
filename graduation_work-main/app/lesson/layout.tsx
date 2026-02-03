//МАША

// Тип пропсів для компонента LessonLayout
// "children" — це будь-які елементи React, які можна вставити всередину компонента
type Props = {
    children: React.ReactNode
}

// Функціональний компонент LessonLayout
// Відповідальний за обгортку контенту уроку
const LessonLayout = ({ children }: Props) => {
    return (
        // Верхній контейнер Flexbox
        // flex: включає flex-контейнер
        // flex-col: розташування елементів по вертикалі
        // h-full: висота на 100% від батьківського елемента
        <div className="flex flex-col h-full">
            
            {/* Вкладений контейнер */}
            {/* flex-col та h-full повторюють вертикальне розташування і висоту */}
            {/* w-full: ширина на 100% */}
            <div className="flex flex-col h-full w-full">
                
                {/* Тут рендериться весь контент, який передали в компонент */}
                {children}
            </div>
        </div>
    )
}

// Експорт компонента для використання в інших частинах проєкту
export default LessonLayout
