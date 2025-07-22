// web/src/components/StoryUploadForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

export const StoryUploadForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = async () => {
    const storyData = {
      title,
      author,
      coverImage,
      genre: genre.split(','),
      chapters: []
    };

    await axios.post('http://localhost:4000/stories', storyData);
    alert('Story uploaded!');
  };

  return (
    <div style={{ padding: '16px' }}>
      <h3>Upload New Story</h3>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br />
      <input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} /><br />
      <input placeholder="Cover Image URL" value={coverImage} onChange={e => setCoverImage(e.target.value)} /><br />
      <input placeholder="Genre (comma-separated)" value={genre} onChange={e => setGenre(e.target.value)} /><br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};