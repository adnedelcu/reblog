import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../config';
import { TextInput } from '../components/TextInput';
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg';
import { getToken, getUser } from '../utils/auth';

export const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [cover, setCover] = useState('');
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      alert("You need to be logged in to create an post.");
      return;
    }

    if (!title || !content || !cover) {
      alert("Please fill in all fields.");
      return;
    }

    const user = getUser();
    console.log(user);

    const postData = {
      title: title,
      content: content,
      cover: cover,
    };

    try {
      const response = await fetch(`${baseUrl}/users/${user.id}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        const errorData = await response.json();
        alert(`Error creating post: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Network error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="gap-8 w-full p-6">

        <form className="p-8 rounded-lg shadow-lg space-y-6 border border-gray-600" onSubmit={handleCreatePost}>
          <h2 className="text-3xl font-semibold text-center text-gray-200">Create Post</h2>

          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="title" className="block text-gray-400 font-semibold">Enter Title</label>
              <TextInput type="text" placeholder="Enter title" onChange={e => setTitle(e.target.value)} value={title || ''} />
            </div>

            <div className="relative">
              <label htmlFor="content" className="block text-gray-400 font-semibold">Enter Content</label>
              <EditorProvider>
                <Editor value={content} onChange={e => setContent(e.target.value)}>
                  <Toolbar>
                    <BtnUndo />
                    <BtnRedo />
                    <Separator />
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <BtnStrikeThrough />
                    <Separator />
                    <BtnNumberedList />
                    <BtnBulletList />
                    <Separator />
                    <BtnLink />
                    <BtnClearFormatting />
                    <HtmlButton />
                    <Separator />
                    <BtnStyles />
                  </Toolbar>
                </Editor>
              </EditorProvider>
            </div>

            <div className="relative">
              <label htmlFor="cover" className="block text-gray-400 font-semibold">Enter Cover</label>
              <TextInput type="text" placeholder="Enter Cover" onChange={e => setCover(e.target.value)} value={cover || ''} />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button type="submit" className="w-full py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
