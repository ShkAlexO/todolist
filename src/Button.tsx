type Props = {
  title: string
  className?: string
  onClick?: () => void
}

export const Button = ({ title, className, onClick }: Props) => {
  return <button className={className} onClick={onClick}>{title}</button>
}
