// web/src/components/StoryView.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStory } from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, spacing, typography } from '../../design-system/src/tokens'; // adjust path as needed

interface Chapter {
  title: string;
  images: string[];
  audio?: string;
}

export const StoryView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [panelIdx, setPanelIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getStory(id).then(res => {
        const firstChapter = res.data.chapters?.[0];
        if (firstChapter) {
          setChapter(firstChapter);
          setLoading(false);
        }
      });
    }
  }, [id]);

  if (loading || !chapter) {
    return <p style={{ textAlign: 'center', marginTop: '32px' }}>Loading panels...</p>;
  }

  const { title, images, audio } = chapter;
  const panelSrc = images[panelIdx];
  const isFirst = panelIdx === 0;
  const isLast = panelIdx === images.length - 1;

  return (
    <div
      style={{
        backgroundColor: colors.background,
        fontFamily: typography.fontFamily,
        color: colors.text,
        padding: spacing.lg,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2 style={{ fontSize: typography.fontSize.heading }}>{title}</h2>

      {/* Panel animation */}
      <div style={{ marginTop: spacing.md, width: '100%', maxWidth: '720px' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={panelIdx}
            src={panelSrc}
            alt={`Panel ${panelIdx + 1}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            style={{
              width: '100%',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          />
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div style={{ marginTop: spacing.md, display: 'flex', alignItems: 'center', gap: spacing.sm }}>
        <button
          disabled={isFirst}
          onClick={() => setPanelIdx(panelIdx - 1)}
          style={{
            padding: spacing.sm,
            fontSize: typography.fontSize.body,
            backgroundColor: colors.primary,
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: isFirst ? 'not-allowed' : 'pointer',
          }}
        >
          Prev
        </button>

        <span style={{ fontSize: typography.fontSize.small }}>
          {panelIdx + 1} / {images.length}
        </span>

        <button
          disabled={isLast}
          onClick={() => setPanelIdx(panelIdx + 1)}
          style={{
            padding: spacing.sm,
            fontSize: typography.fontSize.body,
            backgroundColor: colors.primary,
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: isLast ? 'not-allowed' : 'pointer',
          }}
        >
          Next
        </button>
      </div>

      {/* Optional audio per chapter */}
      {audio && (
        <audio src={audio} autoPlay loop controls style={{ marginTop: spacing.md }}>
          Your browser does not support audio playback.
        </audio>
      )}

      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: spacing.lg,
          fontSize: typography.fontSize.body,
          padding: spacing.sm,
          backgroundColor: colors.accent,
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Back to Library
      </button>
    </div>
  );
};