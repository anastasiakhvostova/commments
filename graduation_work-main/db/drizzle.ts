//НАСТЯ

// Імпорт Neon для serverless-підключення до бази даних
import { neon } from "@neondatabase/serverless";

// Імпорт Drizzle ORM для роботи з Neon через HTTP
import { drizzle } from "drizzle-orm/neon-http";

// Імпорт схеми бази даних
import * as schema from "./schema";

// Підключення до бази даних через Neon, використовуючи URL з environment змінної
const sql = neon(process.env.DATABASE_URL!);

// Створення об’єкту Drizzle для роботи з базою
// Підключаємо схему, щоб можна було працювати з таблицями як з об’єктами
const db = drizzle(sql, { schema });

// Експортуємо підключення, щоб можна було використовувати в інших частинах проєкту
export default db;
