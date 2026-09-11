import Heading from "./headings/Heading";
import StoryArt from "../common/StoryArt";

function Story() {
  return (
    <section className="bg-[#FAF7F2]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-8 py-16 lg:grid-cols-2">
        <div className="flex items-center justify-center rounded-xl p-8">
          <StoryArt className="max-h-80 w-full" />
        </div>
        <div className="text-center lg:text-left">
          <Heading title="soft things for everyone" eyebrow="our story" />
          <p className="mt-3 font-barlow text-sm lowercase leading-relaxed text-neutral-600">
            stardust started with one idea: everyday things should feel a little
            special. from wardrobe staples to home comforts, everything here is
            picked to be soft, useful, and easy to love.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Story;
