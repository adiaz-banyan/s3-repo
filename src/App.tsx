import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState<any>(null);
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<any[]>([null]);

  const onImageUpload = async (image: any, description: string) => {
    const fd = new FormData();
    fd.append("image", image);
    fd.append("description", description);
    const result = await axios.post("/api/s3-url-images", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result.data;
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const result = await onImageUpload(file, description);
    setImages([result.image, ...images]);
  };

  const fileSelected = (e: any) => {
    const file = e.currentTarget.files[0];
    setFile(file);
  };

  return (
    <div className="App">
      <header className="App-header">Amazon s3 bucket</header>
      <div className="form-container">
        <form className="image-form" onSubmit={onSubmit}>
          <input
            onChange={fileSelected}
            id="imageInput"
            type="file"
            accept="image/*"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default App;
