import Hero     from "@/components/sections/Hero"
import Marquee  from "@/components/Marquee"
import Work     from "@/components/sections/Work"
import About    from "@/components/sections/About"
import Services from "@/components/sections/Services"
import Footer   from "@/components/sections/Footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee text="Design & Development  ·  Fullstack Creative" speed={80} direction="left" />
      <Work />
      <Marquee text="Making Ideas Come Alive" speed={80} direction="right" />
      <About />
      <Services />
      <div className="bg-black h-20 md:h-40" />
      <Footer />
    </main>
  )
}
