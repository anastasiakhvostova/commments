// "use client"

// import Confetti from "react-confetti"
// import { useWindowSize, useAudio } from "react-use"
// import Image from "next/image"
// import { ResultCard } from "./result-card"
// import { Button } from "@/components/ui/button"
// import { useRouter } from "next/navigation"

// type Props = {
//   hearts: number
//   points: number
// }

// export const ResultScreen = ({ hearts, points }: Props) => {
//   const router = useRouter()
//   const { width, height } = useWindowSize()

//   const [finishAudio] = useAudio({
//     src: "/finish.mp3",
//     autoPlay: true,
//   })

//   return (
//     <div className="flex flex-col gap-y-6 lg:gap-y-10 items-center justify-center h-full text-center px-4">

//       {finishAudio}
//       <Confetti
//         width={width}
//         height={height}
//         numberOfPieces={600}
//         recycle={false}
//         tweenDuration={1500}
//       />

//       <Image src="/finish.png" alt="Finish" height={100} width={100} />

//       <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700">
//         Чудова робота! <br /> Ви завершили урок!
//       </h1>

//       <div className="flex items-center gap-6 w-full max-w-md justify-center">
//         <ResultCard variant="points" value={points} />
//         <ResultCard variant="hearts" value={hearts} />
//       </div>

//       <Button
//         onClick={() => router.push("/learn")}
//         className="px-6 py-3 text-lg font-semibold mt-4"
//       >
//         Повернутися до навчання
//       </Button>
//     </div>
//   )
// }
