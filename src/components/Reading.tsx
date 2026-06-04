import VaraHoverText from './VaraHoverText'

const Reading = () => {
  return (
    <section id="reading" className="relative bg-white text-primary border-t-2 border-primary py-8 overflow-hidden">
      <div className="border-[1px] border-primary m-2 md:m-4 relative bg-white py-12 md:py-24">
        <div className="absolute inset-0 bg-dot-grid-pattern-small opacity-30 pointer-events-none z-0"></div>

        <main className="flex-grow z-10 relative px-4 md:px-margin-page py-stack-lg max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="col-span-1 md:col-span-12 mb-8 md:mb-14 relative next-gen-reveal">
            <h1 className="font-headline-xl text-5xl md:text-7xl uppercase leading-none tracking-normal">
              <VaraHoverText text="READING &" fontSize={58} />
              <span className="block font-handwriting lowercase italic text-secondary ml-12 mt-8 text-2xl md:text-3xl font-normal">
                musings
              </span>
            </h1>
          </div>

          {/* Left Column: Currently Reading */}
          <section className="col-span-1 md:col-span-5 flex flex-col gap-stack-md mt-10 md:mt-0 next-gen-reveal">
            <div className="flex items-center gap-4 border-b-2 border-primary pb-2 w-max">
              <h2 className="font-label-caps text-label-caps uppercase tracking-[0.15em]">
                Currently Reading
              </h2>
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                book
              </span>
            </div>

            {/* Book Spines Container */}
            <div className="flex items-end h-[400px] gap-2 md:gap-4 pl-4 border-l-2 border-primary relative select-none">
              {/* Book 1 */}
              <div className="w-16 h-72 border-2 border-primary bg-surface-container-lowest flex items-center justify-center transform -rotate-2 hover:-translate-y-2 transition-transform cursor-pointer shadow-[2px_2px_0_0_#000]">
                <span className="font-headline-md text-body-md font-bold tracking-widest writing-vertical -rotate-90 whitespace-nowrap uppercase">
                  Thinking, Fast &amp; Slow
                </span>
              </div>

              {/* Book 2 */}
              <div className="w-12 h-64 border-2 border-primary bg-primary text-on-primary flex items-center justify-center transform rotate-1 hover:-translate-y-2 transition-transform cursor-pointer shadow-[2px_2px_0_0_#000]">
                <span className="font-body-md text-label-caps tracking-widest writing-vertical -rotate-90 whitespace-nowrap uppercase">
                  Design of Everyday Things
                </span>
              </div>

              {/* Book 3 */}
              <div className="w-20 h-80 sketch-border bg-surface-container-lowest flex items-center justify-center transform rotate-3 hover:-translate-y-2 transition-transform cursor-pointer shadow-[3px_3px_0_0_#000]">
                <span
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                  className="text-body-lg font-bold tracking-widest writing-vertical -rotate-90 whitespace-nowrap italic"
                >
                  Steal Like an Artist
                </span>
              </div>

              {/* Book 4 */}
              <div className="w-10 h-56 border-2 border-primary bg-surface-container-lowest flex items-center justify-center transform -rotate-1 hover:-translate-y-2 transition-transform cursor-pointer border-dashed">
                <span className="font-label-caps text-label-caps tracking-widest writing-vertical -rotate-90 whitespace-nowrap uppercase">
                  Neuromancer
                </span>
              </div>

              {/* Annotation on books */}
              <div className="absolute -left-10 top-20 flex items-center gap-2">
                <span
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                  className="text-body-lg text-secondary italic"
                >
                  favorite
                </span>
                <svg height="20" viewBox="0 0 30 20" width="30" className="opacity-60">
                  <path d="M0 10 Q 15 20 30 10" fill="none" stroke="black" strokeLinecap="round" strokeWidth="1.5"></path>
                  <path d="M20 5 L30 10 L20 15" fill="none" stroke="black" strokeLinecap="round" strokeWidth="1.5"></path>
                </svg>
              </div>
            </div>
          </section>

          {/* Right Column: Random Musings */}
          <section className="col-span-1 md:col-span-7 relative min-h-[500px] mt-16 md:mt-0 next-gen-reveal">
            <div className="flex items-center gap-4 border-b-2 border-primary pb-2 w-max mb-8 md:ml-20">
              <h2 className="font-label-caps text-label-caps uppercase tracking-[0.15em]">
                Random Musings
              </h2>
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                lightbulb
              </span>
            </div>

            {/* Scrap 1 */}
            <div className="paper-scrap w-64 p-6 absolute top-24 left-8 md:left-24 transform rotate-[-4deg] hover:rotate-0 hover:-translate-y-1 transition-all duration-200 next-gen-reveal">
              <div className="tape"></div>
              <p className="font-headline-md text-headline-md font-bold leading-tight">
                CSS is <br />
                <span
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                  className="italic font-normal text-secondary text-2xl"
                >
                  Art.
                </span>
              </p>
              <div className="sketch-line"></div>
              <p className="font-body-md text-body-md text-secondary mt-2">Stop treating it like a chore.</p>
            </div>

            {/* Scrap 2 */}
            <div className="paper-scrap w-48 p-4 absolute top-44 right-0 md:right-20 transform rotate-[6deg] hover:rotate-0 hover:-translate-y-1 transition-all duration-200 bg-primary text-primary next-gen-reveal">
              <div className="tape bg-surface-container-lowest"></div>
              <p className="font-label-caps text-label-caps uppercase tracking-widest border-b border-on-primary pb-1 mb-2">
                2 AM Ideas
              </p>
              <ul
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                className="text-body-md list-none space-y-2 italic"
              >
                <li>- A button that sighs when clicked</li>
                <li>- Dark mode but it's just very squinty</li>
              </ul>
            </div>

            {/* Scrap 3 */}
            <div className="paper-scrap w-56 p-5 absolute bottom-8 left-12 md:left-36 transform rotate-[-2deg] hover:rotate-0 hover:-translate-y-1 transition-all duration-200 next-gen-reveal">
              <div className="tape"></div>
              <span className="material-symbols-outlined text-primary mb-2 text-4xl block">
                architecture
              </span>
              <p className="font-body-lg text-body-lg">
                Form follows function, but sometimes form is just fun.
              </p>
            </div>

            {/* Floating Doodles */}
            <svg
              className="absolute top-64 left-1/2 transform -translate-x-1/2 opacity-25 pointer-events-none"
              height="60"
              viewBox="0 0 60 60"
              width="60"
            >
              <path
                d="M30 10 L35 25 L50 25 L38 35 L42 50 L30 40 L18 50 L22 35 L10 25 L25 25 Z"
                fill="none"
                stroke="black"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <svg
              className="absolute bottom-32 right-1/4 opacity-25 pointer-events-none"
              height="40"
              viewBox="0 0 40 40"
              width="40"
            >
              <circle cx="20" cy="20" fill="none" r="15" stroke="black" strokeDasharray="4 4" strokeWidth="2"></circle>
              <path d="M10 20 L30 20 M20 10 L20 30" fill="none" stroke="black" strokeWidth="2"></path>
            </svg>
          </section>
        </main>
      </div>
    </section>
  )
}

export default Reading
