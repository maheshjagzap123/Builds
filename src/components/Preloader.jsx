export default function Preloader({ hidden }) {
  return (
    <div id="preloader" className={hidden ? 'hidden' : ''}>
      <div className="preloader-brand">
        MB<span className="preloader-dot-brand"> </span>
      </div>
    </div>
  )
}
