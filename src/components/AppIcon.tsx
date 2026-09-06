import type { LucideIcon } from 'lucide-react'
import { MapPin, Clock, TrendingUp, ArrowRight, BrainCircuit, Brain, PenLine, Gauge, History, Download, Network, Lock, Gamepad2, Compass, BookOpen, Lightbulb, Building2, Terminal, Gavel, Airplay } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  location_on: MapPin,
  schedule: Clock,
  trending_up: TrendingUp,
  arrow_right_alt: ArrowRight,
  arrow_right: ArrowRight,
  neurology: BrainCircuit,
  psychology: Brain,
  edit: PenLine,
  speed: Gauge,
  history_edu: History,
  download: Download,
  account_tree: Network,
  lock: Lock,
  sports_esports: Gamepad2,
  travel_explore: Compass,
  book: BookOpen,
  lightbulb: Lightbulb,
  architecture: Building2,
  terminal: Terminal,
  gavel: Gavel,
  airplay: Airplay,
}

type AppIconProps = {
  name: string
  size?: number
  className?: string
  'aria-hidden'?: boolean | 'true' | 'false'
  'aria-label'?: string
}

const AppIcon = ({ name, size = 24, className, ...rest }: AppIconProps) => {
  const Icon = iconMap[name] ?? Compass

  return (
    <Icon
      size={size}
      className={className}
      strokeWidth={1.8}
      aria-hidden={rest['aria-hidden'] ?? true}
      {...rest}
    />
  )
}

export default AppIcon