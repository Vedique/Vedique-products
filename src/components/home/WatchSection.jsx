import React from 'react'
import { motion } from 'framer-motion'

const videos = [
  {
    id: 1,
    type: 'youtube',
    videoId: 'X2GC2U9_jkw',
    title: 'Black rice',
    tag: 'Black Rice',
    source: 'YouTube',
    sourceName: 'Wellness Journal',
    tagColor: 'sage',
  },
  {
    id: 2,
    type: 'youtube',
    videoId: 'Yurq5lqvqjw',
    title: 'Flax Seeds',
    tag: 'Flax Seeds',
    source: 'YouTube',
    sourceName: 'Earth Rituals',
    tagColor: 'earth',
  },
  {
    id: 3,
    type: 'youtube',
    videoId: '2fI1fH0A780',
    title: 'Saffron',
    tag: 'Saffron',
    source: 'YouTube',
    sourceName: 'Botanical Craft',
    tagColor: 'gold',
  },
  {
    id: 4,
    type: 'youtube',
    videoId: '1jtTpO749jw',
    title: 'Honey',
    tag: 'Honey',
    source: 'YouTube',
    sourceName: 'Vedique Living',
    tagColor: 'sage',
  },
]

const TAG_COLORS = {
  sage: { bg: 'rgba(142, 169, 137, 0.25)', border: 'rgba(142, 169, 137, 0.6)' },
  earth: { bg: 'rgba(176, 141, 107, 0.25)', border: 'rgba(176, 141, 107, 0.6)' },
  gold: { bg: 'rgba(212, 175, 95, 0.25)', border: 'rgba(212, 175, 95, 0.6)' },
}

const AutoPlayVideoCard = ({ video }) => {
  const tagStyle = TAG_COLORS[video.tagColor] || TAG_COLORS.sage
  const watchUrl = `https://www.youtube.com/watch?v=${video.videoId}`

  return (
    <a
      href={watchUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${video.title}`}
      className="reel-video-card reel-card-link"
      onClick={(e) => {
        // Ensure the link works even if iframe captures the click
        window.open(watchUrl, '_blank', 'noopener,noreferrer')
        e.preventDefault()
      }}
    >
      <div className="reel-media">
        {video.type === 'youtube' && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&mute=1&loop=1&playlist=${video.videoId}&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
            className="reel-iframe"
            style={{ pointerEvents: 'none' }} // This prevents iframe from capturing clicks
          />
        )}
      </div>

      <div className="reel-overlay" />

      <div
        style={{ border: `1px solid ${tagStyle.border}`, background: tagStyle.bg }}
        className="reel-tag"
      >
        {video.tag}
      </div>

      <div className="reel-meta">
        <p className="reel-source">
          {video.source} . {video.sourceName}
        </p>
        <p className="reel-title">
          {video.title}
        </p>
      </div>
    </a>
  )
}

const WatchSection = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .watch-section {
          padding: 100px 0;
          background:
            linear-gradient(180deg, #f9f5ee 0%, #f4efe6 54%, #f8f3eb 100%);
          position: relative;
          overflow: hidden;
        }

        .watch-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(125,157,121,0.11) 0%, transparent 63%),
            radial-gradient(ellipse 56% 80% at 82% 18%, rgba(171,139,105,0.09) 0%, transparent 64%);
          pointer-events: none;
        }

        .watch-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .section-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8a7060;
          text-align: center;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .section-eyebrow::before,
        .section-eyebrow::after {
          content: '';
          width: 32px;
          height: 1px;
          background: rgba(138, 112, 96, 0.4);
        }

        .section-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 300;
          line-height: 1.15;
          text-align: center;
          color: #2c2416;
          margin: 0 0 14px;
          letter-spacing: -0.01em;
        }

        .section-heading em {
          font-style: italic;
          color: #7a9e75;
        }

        .section-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 300;
          color: #8a7060;
          text-align: center;
          margin: 0 auto 56px;
          max-width: 420px;
          line-height: 1.6;
        }

        .reels-scroll-wrapper {
          position: relative;
        }

        .reels-scroll-wrapper::before,
        .reels-scroll-wrapper::after {
          display: none;
        }

        .reels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(192px, 232px));
          justify-content: center;
          gap: 22px;
        }

        .reel-card-item {
          width: 100%;
          max-width: 232px;
        }

        .reel-video-card {
          display: block;
          width: 100%;
          aspect-ratio: 9 / 16;
          position: relative;
          isolation: isolate;
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          clip-path: inset(0 round 32px);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: #111;
          box-shadow: 0 24px 48px rgba(24, 19, 13, 0.28);
        }

        .reel-video-card::before {
          content: '';
          display: block;
          padding-top: 177.7778%;
        }

        .reel-media {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          overflow: hidden;
          clip-path: inset(0 round 32px);
          background: #111;
        }

        .reel-iframe {
          display: block;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .reel-card-link {
          transition: transform 0.45s ease;
        }

        .reel-card-link:hover {
          transform: translateY(-4px);
        }

        .reel-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(180deg, rgba(6, 8, 7, 0.15) 12%, rgba(6, 8, 7, 0.42) 52%, rgba(6, 8, 7, 0.78) 100%);
        }

        .reel-tag {
          pointer-events: none;
          position: absolute;
          top: 12px;
          left: 12px;
          border-radius: 999px;
          padding: 4px 10px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .reel-meta {
          pointer-events: none;
          position: absolute;
          bottom: 14px;
          left: 14px;
          right: 14px;
        }

        .reel-source {
          margin: 0 0 6px;
          color: rgba(255, 255, 255, 0.82);
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .reel-title {
          margin: 0;
          color: #fff;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 17px;
          font-weight: 500;
          line-height: 1.25;
        }

        @media (max-width: 768px) {
          .watch-section {
            padding: 72px 0;
          }

          .section-sub {
            margin-bottom: 36px;
            max-width: 340px;
            font-size: 14px;
          }
        }

        @media (max-width: 640px) {
          .watch-container {
            padding: 0;
          }

          .reels-grid {
            display: flex;
            justify-content: flex-start;
            overflow-x: auto;
            gap: 14px;
            padding: 0 max(20px, env(safe-area-inset-left)) 10px;
            margin: 0;
            scroll-snap-type: x mandatory;
            scroll-padding-inline-start: max(20px, env(safe-area-inset-left));
            scroll-padding-inline-end: 20px;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .reels-grid::-webkit-scrollbar { 
            display: none; 
          }

          .reels-grid > * {
            width: min(66vw, 186px);
            flex-shrink: 0;
            scroll-snap-align: start;
          }

          .reel-card-item {
            max-width: min(66vw, 186px);
          }

          .reels-scroll-wrapper::before,
          .reels-scroll-wrapper::after { 
            display: none; 
          }
        }
      `}</style>

      <section id="watch-section" className="watch-section">
        <div className="watch-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <p className="section-eyebrow">Watch & Discover</p>
            <h2 className="section-heading">
              From Nature&apos;s <em>Heart</em><br />to Your Screen
            </h2>
            <p className="section-sub">
              Stories of wellness, ritual and the wild ingredients behind every product.
            </p>
          </motion.div>

          <div className="reels-scroll-wrapper">
            <div className="reels-grid">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  className="reel-card-item"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                >
                  <AutoPlayVideoCard video={video} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default WatchSection
