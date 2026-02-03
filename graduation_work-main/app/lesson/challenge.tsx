"use client"

import { challengesOptions, challenges } from "@/db/schema"
import { cn } from "@/lib/utils"
import { Card } from "./card"
import { WriteChallenge, WriteChallengeRef } from "./write-challenge" 
import { useState, useRef } from "react"

type Props = {
  options: typeof challengesOptions.$inferSelect[]
  onSelect: (id: number) => void
  status: "correct" | "wrong" | "none"
  selectedOption?: number
  disabled?: boolean
  type: typeof challenges.$inferSelect["type"]
}

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type
}: Props) => {
  const writeRef = useRef<WriteChallengeRef>(null)

  if (type === "WRITE") {
    return (
      <WriteChallenge
        ref={writeRef}
        disabled={status !== "none"} 
      />
    )
  }

  const gridClass = cn(
    "grid gap-2",
    type === "ASSIST" ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
  )

  return (
    <div className={gridClass}>
      {options.map((option, i) => (
        <Card
          key={option.id}
          id={option.id}
          text={option.text}
          imageSrc={option.imageSrc}
          shortcut={`${i + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          audioSrc={option.audioSrc}
          disabled={disabled}
          type={type}
        />
      ))}
    </div>
  )
}

export type { WriteChallengeRef }
