import { ArrowUpRight } from 'lucide-react';
import Link from '../layout/Link.jsx';

/**
 * Reusable project card. Renders any project (personal or client) from the
 * project data model. A real screenshot/asset is used as the visual when
 * available; otherwise a labelled supporting image; otherwise a branded
 * placeholder tile. Supporting images are never presented as screenshots.
 *
 * The whole card is a real anchor (keyboard-focusable, screen-reader friendly).
 */
export default function ProjectCard({ project }) {
  const hero = pickHeroImage(project.images);
  const to = `/work/${project.slug}`;

  return (
    <Link to={to} className="pc-card" data-cursor="view" data-cursor-label="View">
      <div className="pc-media">
        {hero ? (
          <>
            <img
              src={hero.src}
              alt={hero.alt}
              loading="lazy"
              decoding="async"
            />
            {['supporting', 'brand-visual'].includes(hero.source) && (
              <span className="pc-supporting" title={hero.source === 'brand-visual' ? 'Branded project cover, not a product screenshot' : 'Contextual image, not a product screenshot'}>
                {hero.source === 'brand-visual' ? 'Project cover' : 'Supporting visual'}
              </span>
            )}
          </>
        ) : (
          <div className="pc-placeholder" aria-hidden="true">
            <span className="pc-placeholder-mark">MB</span>
            <span className="pc-placeholder-name">{project.name}</span>
          </div>
        )}
        <span className="pc-tag">{project.label}</span>
      </div>

      <div className="pc-body">
        <div className="pc-meta">
          <span>{project.number}</span>
          <span>{project.type}</span>
        </div>
        <h3 className="pc-title">{project.name}</h3>
        <p className="pc-desc">{project.shortDescription}</p>
        {renderTechLine(project.technologies) && (
          <p className="pc-tech">{renderTechLine(project.technologies)}</p>
        )}
        <span className="pc-cta">
          View Project <ArrowUpRight size={18} />
        </span>
      </div>
    </Link>
  );
}

function pickHeroImage(images = []) {
  if (!images.length) return null;
  const priority = ['screenshot', 'project-asset', 'brand-visual', 'supporting', 'external'];
  const heroes = images.filter((i) => i.type === 'hero');
  const pool = heroes.length ? heroes : images;
  return [...pool].sort(
    (a, b) => priority.indexOf(a.source) - priority.indexOf(b.source)
  )[0];
}

function renderTechLine(tech = {}) {
  const all = [
    ...(tech.frontend || []),
    ...(tech.backend || []),
    ...(tech.database || []),
  ];
  return all.length ? all.slice(0, 4).join(' · ') : '';
}

export { pickHeroImage, renderTechLine };
