import Image from "next/image";

const insideAppImage =
  "https://github.com/user-attachments/assets/9398b001-f8ca-424d-9a28-89871997803f";

export default function InsideAppSection() {
  return (
    <section className="mx-auto mt-16 max-w-5xl px-4 bg-[#050816]">
      <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
        Inside the app
      </h2>
      <p className="text-sm sm:text-base text-zinc-300 mt-2">
        A complete view of the trainer and athlete experience across dashboard,
        workouts, leaderboard, and profile screens.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-2 sm:p-3">
        <Image
          src={insideAppImage}
          alt="Coach Jake app interface preview across trainer and athlete screens"
          width={954}
          height={768}
          className="h-auto w-full rounded-xl"
          priority
        />
      </div>
    </section>
  );
}
