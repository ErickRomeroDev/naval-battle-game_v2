
export enum OverlayType {
  IllegalMoveHover = 'Illegal',
  LegalMoveHover = 'Legal',
  PossibleMove = 'Possible',
}
export interface OverlayProps {
  type: OverlayType
}

export const Overlay = ({ type }: OverlayProps) => {
  const color = getOverlayColor(type)
  return (
    <div
      className="overlay absolute top-0 left-0 h-full w-full rounded-sm z-10 opacity-30"
      role={type}
      style={{
        backgroundColor: color,
      }}
    />
  )
}

// Determines the background color for the Overlay component based on its type.
function getOverlayColor(type: OverlayType): string {
  switch (type) {
    case OverlayType.IllegalMoveHover:
      return 'red'
    case OverlayType.LegalMoveHover:
      return '#a3e635'
    case OverlayType.PossibleMove:
      return 'yellow'
  }
}