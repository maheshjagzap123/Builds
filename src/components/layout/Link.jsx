import { useNavClick } from '../../lib/router.js';

/**
 * Internal link that uses the History API for real-path routes ("/", "/work",
 * "/work/tripwise") while letting hash anchors ("#contact") and external links
 * behave natively. Keeps SPA navigation without full page reloads.
 */
export default function Link({ to, href, children, onClick, ...rest }) {
  const navClick = useNavClick();
  const target = to || href || '';

  const handleClick = (e) => {
    onClick?.(e);
    navClick(e);
  };

  return (
    <a href={target} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
