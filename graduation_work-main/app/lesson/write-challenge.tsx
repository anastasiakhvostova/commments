"use client"

import { forwardRef, useImperativeHandle, useState } from "react"

export type WriteChallengeRef = {
  getValue: () => string
  clear: () => void
}

type Props = {
  disabled?: boolean
  placeholder?: string
}

export const WriteChallenge = forwardRef<WriteChallengeRef, Props>(
  ({ disabled, placeholder }, ref) => {
    const [value, setValue] = useState("")

    useImperativeHandle(ref, () => ({
      getValue: () => value,
      clear: () => setValue("")
    }))

    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-xl">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            placeholder={placeholder}

            className="
              w-full px-5 py-3
              text-lg lg:text-xl
              rounded-2xl
              border border-neutral-300
              bg-white
              shadow-sm
              transition-all
              focus:outline-none 
              focus:ring-4 focus:ring-sky-200 
              focus:border-sky-500 
              hover:border-neutral-400
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          />
        </div>
      </div>
    )
  }
)

WriteChallenge.displayName = "WriteChallenge"

