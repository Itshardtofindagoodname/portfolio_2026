declare module 'vara' {
  export type VaraTextDefinition =
    | string
    | {
        text: string
        fontSize?: number
        strokeWidth?: number
        color?: string
        id?: string | number
        duration?: number
        textAlign?: 'left' | 'center' | 'right'
        x?: number
        y?: number
        autoAnimation?: boolean
        queued?: boolean
        delay?: number
        letterSpacing?: number | Record<string, number>
      }

  export interface VaraProperties {
    fontSize?: number
    strokeWidth?: number
    color?: string
    duration?: number
    textAlign?: 'left' | 'center' | 'right'
    autoAnimation?: boolean
    queued?: boolean
    letterSpacing?: number | Record<string, number>
    width?: number
  }

  export interface VaraRenderedText {
    characters: SVGGElement[]
    container: SVGGElement
  }

  export default class Vara {
    constructor(
      selector: string,
      fontSource: string,
      text: string | VaraTextDefinition[],
      properties?: VaraProperties,
    )

    ready(callback: () => void): void
    animationEnd(
      callback: (id: string | number, renderedText: VaraRenderedText) => void,
    ): void
    get(id: string | number): VaraRenderedText | false
    draw(id: string | number, duration?: number): void
    playAll(): void
  }
}
