import { useState } from 'react'
import VaraRevealText from './VaraRevealText'

const Reading = () => {
  const [pulledBook, setPulledBook] = useState<string | null>(null)

  const books = [
    { id: 'b1', title: 'The Pragmatic Programmer', height: 270, width: 55, left: 2, rotate: 1, isBack: true, bg: 'bg-[#0D1015]', textStyle: 'font-headline-md text-[9px] text-[#F5F3EE]' },
    { id: 'b2', title: 'Clean Code', height: 280, width: 55, left: 0, rotate: 1, isBack: true, bg: 'bg-[#F5F3EE] text-[#0D1015] border-[#0D1015]', textStyle: 'font-mono text-[9px] font-bold' },
    { id: 'b3', title: 'Refactoring', height: 260, width: 55, left: 30, rotate: 1, isBack: true, bg: 'bg-[#0D1015]', textStyle: 'font-body-md text-[10px] italic text-[#F5F3EE]' },
    { id: 'b4', title: 'Design Patterns', height: 300, width: 55, left: 70, rotate: 1, isBack: true, bg: 'bg-[#0D1015] border-dashed', textStyle: 'font-label-caps text-[8px] font-bold text-[#F5F3EE]' },

    { id: 'f1', title: 'Deep Work', height: 250, width: 55, left: -90, rotate: 1, isBack: false, bg: 'bg-[#0D1015]', textStyle: 'font-headline-md text-[10px] font-bold text-[#F5F3EE]' },
    { id: 'f2', title: 'The Lean Startup', height: 230, width: 55, left: -55, rotate: 1, isBack: false, bg: 'bg-[#F5F3EE] text-[#0D1015] border-[#0D1015]', textStyle: 'font-body-md text-[8px] tracking-wide' },
    { id: 'f3', title: 'The Phoenix Project', height: 270, width: 55, left: 20, rotate: 1, isBack: false, bg: 'bg-[#0D1015]', textStyle: 'font-handwriting text-xs font-bold italic text-[#F5F3EE]' },
    { id: 'f4', title: 'Code Complete', height: 210, width: 55, left: -60, rotate: 1, isBack: false, bg: 'bg-[#0D1015] border-dashed', textStyle: 'font-label-caps text-[8px] text-[#F5F3EE]' },
  ]

  return (
    <section id="reading" className="paper-cut-section relative bg-[#F5F3EE] text-[#0D1015] border-y-2 border-[#0D1015] py-8 overflow-hidden">
      <div className="border-[1px] border-[#0D1015] m-2 md:m-4 relative bg-[#F5F3EE] py-10 md:py-18">
        <div className="absolute right-8 top-10 hidden font-handwriting text-3xl opacity-40 rotate-6 pointer-events-none select-none md:block">
          <VaraRevealText text="margins are for side quests" fontSize={30} color="#0D1015" />
        </div>

        <main className="flex-grow z-10 relative px-4 md:px-margin-page py-10 md:py-14 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-10 md:gap-x-20">
          <div className="col-span-1 md:col-span-12 mb-6 md:mb-8 relative overflow-hidden">
            <h1 className="font-headline-xl text-5xl md:text-7xl uppercase leading-none tracking-normal whitespace-nowrap md:whitespace-normal text-[#0D1015]">
              <span className="inline-block">
                READING &
              </span>
              <span className="block font-handwriting lowercase italic text-[#5C5268] ml-12 mt-8 text-2xl md:text-3xl font-normal">
                musings
              </span>
            </h1>
          </div>

          <section className="col-span-1 md:col-span-4 flex flex-col gap-stack-md mt-10 md:mt-0">
            <div className="flex items-center gap-4 border-b-2 border-[#0D1015] pb-2 w-max">
              <h2 className="font-label-caps text-label-caps uppercase tracking-[0.15em] text-[#0D1015]">
                Currently Reading
              </h2>
              <span className="material-symbols-outlined text-[#5C5268]" style={{ fontVariationSettings: "'FILL' 1" }}>
                book
              </span>
            </div>

            <div className="reading-shelf flex items-end h-[420px] pl-4 border-l-2 border-[#0D1015] relative select-none min-w-[350px]">
              {books.map((book) => {
                const isPulled = pulledBook === book.id
                return (
                  <div
                    key={book.id}
                    className={`book-spine absolute border-2 border-[#0D1015] cursor-pointer transition-all duration-300 shadow-[2px_2px_0_0_rgba(13,16,21,0.15)] flex justify-center items-start pt-6 ${book.bg}`}
                    style={{
                      height: `${book.height}px`,
                      width: `${book.width}px`,
                      left: `${book.left}px`,
                      bottom: book.isBack ? '0px' : '0px',
                      transform: `translateY(${isPulled ? -80 : 0}px) rotate(${book.rotate}deg)`,
                      zIndex: isPulled ? 40 : (book.isBack ? 1 : 10),
                      opacity: book.isBack && !isPulled ? 0.76 : 1.0,
                      filter: book.isBack && !isPulled ? 'brightness(0.9)' : 'none',
                    }}
                    onClick={() => setPulledBook(pulledBook === book.id ? null : book.id)}
                    onMouseEnter={() => setPulledBook(book.id)}
                    onMouseLeave={() => setPulledBook(null)}
                  >
                    <span className={`book-spine-label font-bold tracking-widest uppercase ${book.textStyle}`}>
                      {book.title}
                    </span>
                  </div>
                )
              })}

              <div className="absolute -left-8 top-16 flex items-center gap-2 pointer-events-none">
                <span
                  style={{ fontFamily: '"HappyMonkey", sans-serif' }}
                  className="text-body-lg text-[#5C5268] italic rotate-[-12deg]"
                >
                  favorite
                </span>
              </div>
            </div>
          </section>

          <section className="musing-board col-span-1 md:col-span-8 relative mt-8 md:mt-0">
            <div className="flex items-center gap-4 border-b-2 border-[#0D1015] pb-2 w-max max-w-full mb-7 md:ml-auto md:mr-4">
              <h2 className="font-label-caps text-label-caps uppercase tracking-[0.15em] text-[#0D1015]">
                Random Musings
              </h2>
              <span className="material-symbols-outlined text-[#5C5268]" style={{ fontVariationSettings: "'FILL' 1" }}>
                lightbulb
              </span>
            </div>

            <div className="musing-scrap-grid relative grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div className="paper-scrap musing-scrap musing-scrap-large p-6 rotate-[-5deg] sm:justify-self-end bg-[#F5F3EE] border-[#0D1015]">
                <div className="tape"></div>
                <p className="font-headline-md text-headline-md font-bold leading-tight text-[#0D1015]">
                  CSS is <br />
                  <span
                    style={{ fontFamily: '"HappyMonkey", sans-serif' }}
                    className="italic font-normal text-[#5C5268] text-2xl"
                  >
                    Art.
                  </span>
                </p>
                <div className="sketch-line bg-[#0D1015]"></div>
                <p className="font-body-md text-body-md text-[#5C5268] mt-2">Stop treating it like a chore.</p>
              </div>

              <div className="paper-scrap musing-scrap musing-scrap-small p-4 rotate-[6deg] text-[#0D1015]">
                <div className="tape bg-[#F5F3EE]"></div>
                <p className="font-label-caps text-label-caps uppercase tracking-widest border-b border-[#F5F3EE] pb-1 mb-2 text-[#0D1015]">
                  2 AM Ideas
                </p>
                <ul
                  style={{ fontFamily: '"HappyMonkey", sans-serif' }}
                  className="text-body-md list-none space-y-2 italic text-[#0D1015]"
                >
                  <li>- A button that sighs when clicked</li>
                  <li>- Dark mode but it's just very squinty</li>
                </ul>
              </div>

              <div className="paper-scrap musing-scrap musing-scrap-medium p-5 rotate-[3deg] sm:mr-80 bg-[#F5F3EE] border-[#0D1015]">
                <div className="tape"></div>
                <span className="material-symbols-outlined text-[#0D1015] mb-2 text-4xl block">
                  architecture
                </span>
                <p className="font-body-lg text-body-lg text-[#0D1015]">
                  Form follows function, but sometimes form is just fun.
                </p>
              </div>

              <div className="paper-scrap musing-scrap musing-scrap-small p-5 rotate-[-4deg] bg-[#F5F3EE] border-[#0D1015]">
                <div className="tape"></div>
                <p className="font-handwriting text-xl leading-none text-[#0D1015]">
                  tiny bugs deserve dramatic soundtracks.
                </p>
              </div>

              <div className="paper-scrap musing-scrap musing-scrap-medium p-5 rotate-[2.5deg] bg-[#F5F3EE] border-[#0D1015]">
                <div className="tape"></div>
                <p className="font-handwriting text-xl leading-tight text-[#0D1015]">
                  Your code is tomorrow's archaeology. Be kind to your future self.
                </p>
              </div>
            </div>

            <svg
              className="absolute top-36 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none"
              height="64"
              viewBox="0 0 80 64"
              width="80"
            >
              <path
                d="M8 45 C20 12 56 8 64 26 C72 44 43 56 30 43 C18 31 48 22 50 38"
                fill="none"
                stroke="#0D1015"
                strokeLinecap="round"
                strokeWidth="2.5"
              ></path>
            </svg>
            <svg
              className="absolute bottom-8 right-1/4 opacity-20 pointer-events-none"
              height="40"
              viewBox="0 0 40 40"
              width="40"
            >
              <circle cx="20" cy="20" fill="none" r="15" stroke="#0D1015" strokeDasharray="4 4" strokeWidth="2"></circle>
              <path d="M10 20 L30 20 M20 10 L20 30" fill="none" stroke="#0D1015" strokeWidth="2"></path>
            </svg>
            <svg
              className="absolute top-2 right-8 opacity-15 pointer-events-none"
              height="44"
              viewBox="0 0 44 44"
              width="44"
            >
              <path d="M8 22 C8 8 34 8 34 22 C34 36 8 36 8 22 Z" fill="none" stroke="#0D1015" strokeDasharray="3 5" strokeWidth="2" />
              <path d="M16 18 L17 18 M27 18 L28 18 M16 27 C20 31 25 31 29 27" fill="none" stroke="#0D1015" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </section>
        </main>
      </div>
    </section>
  )
}

export default Reading
