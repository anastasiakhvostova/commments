"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { useLanguage } from "./languageContext"
import { translations } from "./translations"

export const Feedback = () => {
  const { lang } = useLanguage()
  const t = translations[lang]

  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<null | "success" | "error">(null)
  const [loading, setLoading] = useState(false)

  const sendFeedback = async () => {
    if (!message || !message.trim()) {
      setStatus("error")
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })

      if (!res.ok) throw new Error()

      setMessage("")
      setStatus("success")
    } catch {
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <h3 className="font-bold text-lg">{t.feedbackTitle}</h3>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t.feedbackPlaceholder}
        className="w-full border rounded-lg p-3 text-sm min-h-[70px] resize-none"
      />

      <Button onClick={sendFeedback} className="w-full" disabled={loading}>
        {t.sendButton}
      </Button>

      {status === "error" && (
        <p className="text-sm text-red-600">
          {t.feedbackError}
        </p>
      )}

      {status === "success" && (
        <p className="text-sm text-green-600">
          {t.feedbackSuccess}
        </p>
      )}
    </div>
  )
}


