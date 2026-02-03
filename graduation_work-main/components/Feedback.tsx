//настя

"use client"
// ✅ Позначаємо, що цей компонент працює на клієнтській стороні (Next.js 13+)

import { useState } from "react"
// ✅ Хук для зберігання локального стану компонента
import { Button } from "./ui/button"
// ✅ Імпорт кнопки з UI-бібліотеки проекту
import { useLanguage } from "./languageContext"
// ✅ Хук для визначення поточної мови користувача
import { translations } from "./translations"
// ✅ Об'єкт з перекладами для різних мов

export const Feedback = () => {
  const { lang } = useLanguage()
  // ✅ Отримуємо поточну мову користувача
  const t = translations[lang]
  // ✅ Вибираємо відповідний об'єкт перекладів для цієї мови

  const [message, setMessage] = useState("")
  // ✅ Стан для тексту повідомлення користувача
  const [status, setStatus] = useState<null | "success" | "error">(null)
  // ✅ Стан для статусу відправки: успіх, помилка або null
  const [loading, setLoading] = useState(false)
  // ✅ Стан для відображення завантаження кнопки

  const sendFeedback = async () => {
    // ✅ Функція для відправки фідбеку на сервер
    if (!message || !message.trim()) {
      // ✅ Перевіряємо, що повідомлення не пусте
      setStatus("error")
      return
    }

    setLoading(true)
    // ✅ Включаємо індикатор завантаження
    setStatus(null)
    // ✅ Скидаємо попередній статус

    try {
      const res = await fetch("/api/feedback", {
        // ✅ Відправляємо POST-запит на сервер
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        // ✅ Тіло запиту містить JSON з повідомленням
      })

      if (!res.ok) throw new Error()
      // ✅ Якщо сервер повертає помилку, кидаємо виняток

      setMessage("")
      // ✅ Очищуємо textarea після успішної відправки
      setStatus("success")
      // ✅ Встановлюємо статус успішної відправки
    } catch {
      setStatus("error")
      // ✅ У разі помилки показуємо повідомлення
    } finally {
      setLoading(false)
      // ✅ Вимикаємо індикатор завантаження
    }
  }

  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      {/* ✅ Контейнер фідбеку з рамкою, закругленими кутами і відступами */}
      <h3 className="font-bold text-lg">{t.feedbackTitle}</h3>
      {/* ✅ Заголовок форми, локалізований */}

      <textarea
        value={message}
        // ✅ Пов’язуємо стан з textarea
        onChange={(e) => setMessage(e.target.value)}
        // ✅ Оновлюємо стан при введенні тексту
        placeholder={t.feedbackPlaceholder}
        // ✅ Плейсхолдер з перекладом
        className="w-full border rounded-lg p-3 text-sm min-h-[70px] resize-none"
        // ✅ Стилі: ширина 100%, рамка, закруглені кути, відступи, мінімальна висота
      />

      <Button onClick={sendFeedback} className="w-full" disabled={loading}>
        {/* ✅ Кнопка відправки */}
        {t.sendButton}
        {/* ✅ Локалізований текст кнопки */}
      </Button>

      {status === "error" && (
        <p className="text-sm text-red-600">
          {t.feedbackError}
          {/* ✅ Повідомлення про помилку */}
        </p>
      )}

      {status === "success" && (
        <p className="text-sm text-green-600">
          {t.feedbackSuccess}
          {/* ✅ Повідомлення про успіх */}
        </p>
      )}
    </div>
  )
}


