import VaraHoverText from './VaraHoverText'

const Reading = () => {
  return (
    <section id="reading" className="paper-cut-section relative bg-white text-primary border-y-2 border-primary py-8 overflow-hidden">
      <div className="border-[1px] border-primary m-2 md:m-4 relative bg-white py-12 md:py-24">
        <div className="absolute inset-0 bg-dot-grid-pattern-small opacity-30 pointer-events-none z-0"></div>

        <main className="flex-grow z-10 relative px-4 md:px-margin-page py-stack-lg max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-y-20 md:gap-y-12 md:gap-x-10">
          <div className="col-span-1 md:col-span-12 mb-8 md:mb-14 relative next-gen-reveal">
            <h1 className="font-headline-xl text-5xl md:text-7xl uppercase leading-none tracking-normal">
              <VaraHoverText text="READING &" fontSize={58} />
              <span className="block font-handwriting lowercase italic text-secondary ml-12 mt-8 text-2xl md:text-3xl font-normal">
                musings
              </span>
            </h1>
          </div>

          {/* Left Column: Currently Reading */}
          <section className="col-span-1 md:col-span-4 flex flex-col gap-stack-md mt-10 md:mt-0 next-gen-reveal">
            <div className="flex items-center gap-4 border-b-2 border-primary pb-2 w-max">
              <h2 className="font-label-caps text-label-caps uppercase tracking-[0.15em]">
                Currently Reading
              </h2>
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                book
              </span>
            </div>

            {/* Book Spines Container */}
            <div className="reading-shelf flex items-end h-[420px] gap-2 md:gap-4 pl-4 border-l-2 border-primary relative select-none">
              {/* Book 1 */}
              <div className="book-spine w-16 h-72 border-2 border-primary bg-surface-container-lowest flex items-center justify-center -rotate-2 cursor-pointer shadow-[2px_2px_0_0_#000]">
                <span className="book-spine-label font-headline-md text-body-md font-bold tracking-widest uppercase">
                  Thinking, Fast &amp; Slow
                </span>
              </div>

              {/* Book 2 */}
              <div className="book-spine w-12 h-64 border-2 border-primary bg-primary text-on-primary flex items-center justify-center rotate-1 cursor-pointer shadow-[2px_2px_0_0_#000]">
                <span className="book-spine-label font-body-md text-label-caps tracking-widest uppercase">
                  Design of Everyday Things
                </span>
              </div>

              {/* Book 3 */}
              <div className="book-spine w-20 h-80 sketch-border bg-surface-container-lowest flex items-center justify-center rotate-3 cursor-pointer shadow-[3px_3px_0_0_#000]">
                <span
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                  className="book-spine-label text-body-lg font-bold tracking-widest italic"
                >
                  Steal Like an Artist
                </span>
              </div>

              {/* Book 4 */}
              <div className="book-spine w-10 h-56 border-2 border-primary bg-surface-container-lowest flex items-center justify-center -rotate-1 cursor-pointer border-dashed">
                <span className="book-spine-label font-label-caps text-label-caps tracking-widest uppercase">
                  Neuromancer
                </span>
              </div>

              {/* Annotation on books */}
              <div className="absolute -left-8 top-16 flex items-center gap-2">
                <span
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                  className="text-body-lg text-secondary italic rotate-[-12deg]"
                >
                  favorite
                </span>
              </div>
            </div>
          </section>

          {/* Right Column: Random Musings */}
          <section className="col-span-1 md:col-span-5 md:col-start-8 relative min-h-[680px] mt-20 md:mt-0 next-gen-reveal">
            <div className="flex items-center gap-4 border-b-2 border-primary pb-2 w-max mb-8 md:ml-4">
              <h2 className="font-label-caps text-label-caps uppercase tracking-[0.15em]">
                Random Musings
              </h2>
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                lightbulb
              </span>
            </div>

            {/* Scrap 1 */}
            <div className="paper-scrap musing-scrap w-64 p-6 absolute top-24 left-2 sm:left-8 md:left-0 rotate-[-8deg] next-gen-reveal">
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
            <div className="paper-scrap musing-scrap w-48 p-4 absolute top-64 right-0 md:right-2 rotate-[9deg] bg-primary text-primary next-gen-reveal">
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
            <div className="paper-scrap musing-scrap w-56 p-5 absolute bottom-24 left-4 md:left-14 rotate-[4deg] next-gen-reveal">
              <div className="tape"></div>
              <span className="material-symbols-outlined text-primary mb-2 text-4xl block">
                architecture
              </span>
              <p className="font-body-lg text-body-lg">
                Form follows function, but sometimes form is just fun.
              </p>
            </div>

            {/* Scrap 4 */}
            <div className="paper-scrap musing-scrap w-52 p-5 absolute bottom-4 right-2 md:right-8 rotate-[-6deg] next-gen-reveal">
              <div className="tape"></div>
              <p className="font-handwriting text-3xl leading-none">
                tiny bugs deserve dramatic soundtracks.
              </p>
            </div>

            {/* Floating Doodles */}
            <svg
              className="doodle-float absolute top-44 left-1/2 -translate-x-1/2 opacity-25 pointer-events-none"
              height="64"
              viewBox="0 0 80 64"
              width="80"
            >
              <path
                d="M8 45 C20 12 56 8 64 26 C72 44 43 56 30 43 C18 31 48 22 50 38"
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeWidth="2.5"
              ></path>
            </svg>
            <svg
              className="doodle-float absolute bottom-40 right-1/4 opacity-25 pointer-events-none"
              height="40"
              viewBox="0 0 40 40"
              width="40"
            >
              <circle cx="20" cy="20" fill="none" r="15" stroke="black" strokeDasharray="4 4" strokeWidth="2"></circle>
              <path d="M10 20 L30 20 M20 10 L20 30" fill="none" stroke="black" strokeWidth="2"></path>
            </svg>
            <svg
              className="doodle-float absolute top-10 right-10 opacity-20 pointer-events-none"
              height="44"
              viewBox="0 0 44 44"
              width="44"
            >
              <path d="M8 22 C8 8 34 8 34 22 C34 36 8 36 8 22 Z" fill="none" stroke="black" strokeDasharray="3 5" strokeWidth="2" />
              <path d="M16 18 L17 18 M27 18 L28 18 M16 27 C20 31 25 31 29 27" fill="none" stroke="black" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </section>
        </main>
      </div>
    </section>
  )
}

export default Reading
