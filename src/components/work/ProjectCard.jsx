import { ArrowUpRight } from 'lucide-react';
import Link from '../layout/Link.jsx';
import ProjectMediaCarousel from './ProjectMediaCarousel.jsx';
import { getCardImages, renderTechLine } from '../../lib/projectMedia.js';

export default function ProjectCard({ project }) {
  const images = getCardImages(project.images);
  const primary = images[0];
  const to = `/work/${project.slug}`;

  return (
    <article className="pc-card">
      <Link to={to} className="pc-card-link" aria-label={`View ${project.name} project`} data-cursor="view" data-cursor-label="View" />
      <div className="pc-media">
        {images.length ? (
          <>
            <ProjectMediaCarousel images={images} projectName={project.name} />
            {['supporting', 'brand-visual'].includes(primary.source) && (
              <span className="pc-supporting" title={primary.source === 'brand-visual' ? 'Branded project cover, not a product screenshot' : 'Contextual image, not a product screenshot'}>
                {primary.source === 'brand-visual' ? 'Project cover' : 'Supporting visual'}
              </span>
            )}
          </>
        ) : (
          <div className="pc-placeholder" aria-hidden="true"><span className="pc-placeholder-mark">MB</span><span className="pc-placeholder-name">{project.name}</span></div>
        )}
        <span className="pc-tag">{project.label}</span>
      </div>

      <div className="pc-body">
        <div className="pc-meta"><span>{project.number}</span><span>{project.type}</span></div>
        <h3 className="pc-title">{project.name}</h3>
        <p className="pc-desc">{project.shortDescription}</p>
        {renderTechLine(project.technologies) && <p className="pc-tech">{renderTechLine(project.technologies)}</p>}
        <span className="pc-cta">View Project <ArrowUpRight size={18} /></span>
      </div>
    </article>
  );
}
