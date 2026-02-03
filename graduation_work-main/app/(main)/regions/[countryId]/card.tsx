//Лера

/* ================= Типи Props ================= */
type Props = {
  title: string; // Назва регіону, яка буде відображатися на картці
  id: number;    // Унікальний ID регіону
  onClick: (id: number) => void; // Функція, яка викликається при кліку на картку
  disabled?: boolean; // Опціонально: чи картка заблокована (неактивна)
  active?: boolean;   // Опціонально: чи картка активна (позначена як вибрана)
};

/* ================= Компонент RegionCard ================= */
export const RegionCard = ({ title, id, onClick, disabled, active }: Props) => (
  <div
    onClick={() => onClick(id)} // При кліку викликаємо передану функцію onClick з ID цього регіону
    className="border rounded p-4 cursor-pointer hover:bg-black/5"
    // border – обводка картки
    // rounded – округлені кути
    // p-4 – внутрішні відступи
    // cursor-pointer – курсор у вигляді руки, щоб показати, що картка клікабельна
    // hover:bg-black/5 – при наведенні фон трохи затемнюється
  >
    <p>{title}</p> 
    {/* Відображаємо назву регіону */}

    {active && <span>✔</span>}
    {/* Якщо картка активна, показуємо галочку */}
  </div>
);
