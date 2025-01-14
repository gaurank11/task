import { useState } from 'react';
import axios from 'axios';

function App() {
    const [title, setTitle] = useState('');
    const [outline, setOutline] = useState([]);
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const generateOutline = async () => {
        if (!title.trim()) {
            alert('Please enter a blog title.');
            return;
        }
        setLoading(true);
        setError('');

        try {
            const response = await axios.post("https://backend-one-lake-16.vercel.app/generate-outline", { title });
            setOutline(response.data.outline);
        } catch (err) {
            setError("Error generating outline. Please try again.");
            console.error(err);
        }
        setLoading(false);
    };

    const generateContent = async () => {
        if (outline.length === 0) {
            alert('Please generate the outline first.');
            return;
        }
        setLoading(true);
        setError('');

        try {
            const response = await axios.post("https://backend-one-lake-16.vercel.app/generate-content", { outline });
            setContent(response.data.content);
        } catch (err) {
            setError("Error generating content. Please try again.");
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
            <div className="text-4xl font-bold text-blue-600 mb-6">AI Blog Generator</div>
            <div className="w-full max-w-xl">
                <input
                    type="text"
                    placeholder="Enter Blog Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-300 mb-4"
                />
                <button
                    onClick={generateOutline}
                    className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Generate Outline
                </button>
            </div>

            {loading && <p className="text-xl text-blue-500 mt-4">Loading...</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {outline.length > 0 && (
                <div className="mt-6 w-full max-w-2xl bg-white p-6 rounded shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Outline</h2>
                    <ul className="list-disc ml-6 text-gray-600">
                        {outline.map((heading, index) => (
                            <li key={index}>{heading}</li>
                        ))}
                    </ul>
                    <button
                        onClick={generateContent}
                        className="mt-4 p-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                        Generate Content
                    </button>
                </div>
            )}

            {content.length > 0 && (
                <div className="mt-8 w-full max-w-3xl bg-white p-6 rounded shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Generated Blog</h2>
                    {content.map((section, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{outline[index]}</h3>
                            <p className="text-gray-600">{section}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
