//Лера
import { Loader } from "lucide-react" 
// Імпортуємо іконку Loader (круглий спінер) з бібліотеки Lucide

const Loading = () => { 
  // Створюємо функціональний компонент Loading
  return (
    <div className="h-full w-full flex items-center justify-center">
      {/* 
        Контейнер на всю ширину і висоту батьківського блоку
        flex → дозволяє центрирувати дочірні елементи
        items-center → вертикальне вирівнювання по центру
        justify-center → горизонтальне вирівнювання по центру
      */}
      <Loader 
        className="h-6 w-6 text-muted-foreground animate-spin" 
        // h-6 w-6 → висота і ширина 24px
        // text-muted-foreground → колір тексту/іконки, визначений у темі
        // animate-spin → анімація обертання (крутиться)
      />
    </div>
  )
}

export default Loading 
// Експортуємо компонент за замовчуванням, щоб можна було підключити у будь-якому іншому файлі
