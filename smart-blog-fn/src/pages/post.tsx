import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { getAllPost, createPost } from "../services/posts"

export default function Post() {
  const [post, setPost] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState("")

  const fetchData = async (pageNumber = 1) => {
    try {
      const data = await getAllPost(pageNumber, 10)
      setPost(data?.data)
      setTotalPage(data?.totalPages)
      setPage(pageNumber)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSavePost = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("tags", tags)
      if (image) formData.append("image", image)

      await createPost(formData)
      await fetchData(1)

      // Clear form
      setTitle("")
      setContent("")
      setTags("")
      setImage(null)
      setPreview("")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Create Post Section */}
      <form
        onSubmit={handleSavePost}
        className="max-w-2xl mx-auto bg-white/70 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-10 space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-700 text-center">Create New Post</h2>

        {/* Title */}
        <div className="space-y-1">
          <label className="block text-gray-600 font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Content */}
        <div className="space-y-1">
          <label className="block text-gray-600 font-medium">Content</label>
          <textarea
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl h-32 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
          />
        </div>

        {/* Tags */}
        <div className="space-y-1">
          <label className="block text-gray-600 font-medium">Tags</label>
          <input
            type="text"
            placeholder="e.g. tech, coding, lifestyle"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Upload Image */}
        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">Upload Image</label>

          <label className="w-full border border-dashed border-gray-400 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="text-gray-500 text-sm">Click to choose an image</span>
            <span className="text-xs text-gray-400 mt-1">(PNG, JPG, JPEG)</span>
          </label>
        </div>

        {/* Preview */}
        {preview && (
          <div className="w-full mt-4 rounded-xl overflow-hidden border shadow">
            <img src={preview} className="w-full h-64 object-cover" />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md transition"
        >
          Publish Post
        </button>
      </form>

      {/* Posts List */}
      <h2 className="text-3xl font-bold mt-14 mb-8 text-gray-700 text-center">All Posts</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {post.map((p: any, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl overflow-hidden border hover:shadow-xl transition"
          >
            {p?.imageURL && (
              <img src={p.imageURL} className="w-full h-48 object-cover" />
            )}

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800">{p?.title}</h3>

              <p className="text-gray-600 text-sm mt-2 line-clamp-3">{p?.content}</p>

              {/* Tags */}
              {p?.tags && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {(Array.isArray(p.tags) ? p.tags : String(p.tags).split(",")).map(
                    (tag: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md"
                      >
                        #{tag.trim()}
                      </span>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-12 max-w-xl mx-auto">
        <button
          onClick={() => fetchData(page - 1)}
          disabled={page === 1}
          className="px-5 py-2 bg-gray-300 rounded-xl font-medium disabled:opacity-50 hover:bg-gray-400 transition"
        >
          Prev
        </button>

        <span className="text-gray-700 font-medium">
          Page {page} of {totalPage}
        </span>

        <button
          onClick={() => fetchData(page + 1)}
          disabled={page === totalPage}
          className="px-5 py-2 bg-gray-300 rounded-xl font-medium disabled:opacity-50 hover:bg-gray-400 transition"
        >
          Next
        </button>
      </div>
    </div>
  )
}
