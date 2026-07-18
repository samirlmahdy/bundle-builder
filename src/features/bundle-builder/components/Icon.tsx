import type { BundleStep } from '../model/types'

type IconName = BundleStep['icon']

const iconSources = {
  camera: '/assets/step-camera.svg',
  shield: '/assets/step-plan.svg',
  sensor: '/assets/step-sensors.svg',
  dots: '/assets/step-protection.svg',
} as const satisfies Record<IconName, string>

type IconProps = {
  name: IconName
  className?: string
}

export function Icon({ name, className }: IconProps) {
  return (
    <img
      className={className}
      src={iconSources[name]}
      alt=""
      aria-hidden="true"
      draggable="false"
    />
  )
}
