import React, { useEffect, useState } from 'react';
import { getStories } from '../api';
import { useNavigate } from 'react-router-dom';

interface Story {
  _id: string;
  title: string;
  coverImage: string;
  author: string;
}

export const StoryList = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getStories().then(res => setStories(res.data));
  }, []);

  return (
    <div style={{ display: 'grid', gap: '16px', padding: '16px' }}>
      {stories.map(story => (
        <div key={story._id} style={{ border: '1px solid #ccc', padding: '12px', borderRadius: '8px' }}>
          <img src={story.coverImage} alt={story.title} style={{ width: '100%', borderRadius: '4px' }} />
          <h3>{story.title}</h3>
          <p>By {story.author}</p>
          <button onClick={() => navigate(`/stories/${story._id}`)}>Read</button>
        </div>
      ))}
    </div>
  );
};