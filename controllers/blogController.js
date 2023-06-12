import Blog from "../models/Blog";

export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();

    if (!blogs) {
      return res.status(404).json({ message: "No Blogs Found" });
    }

    return res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
  }
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  try {
    if (!title || !description || !image || !user) {
      return res.status(400).json({ message: "Ban nhap thieu thong tin" });
    }
    const blog = new Blog({
      description,
      image,
      title,
      user,
    });

    await blog.save();

    return res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
  }
};

export const updateBlog = async (req, res, next) => {
  const blogId = req.params.id;
  const { title, description, image, user } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate(blogId, {
      description,
      image,
      title,
      user,
    });

    if(!blog) {
      return res.status(500).json({message: "Unable to update"})
    }

    return res.status(200).json({ message: "Update success" });
  } catch (error) {
    console.log(error);
  }
};

export const getBlogById = async(req, res, next) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById(blogId);

    if(!blog) {
      return res.status(500).json({message: "Blog not Found"})
    }

    return res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
  }
}

export const deleteBlog = async(req, res, next) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findByIdAndDelete(blogId);

    if(!blog) {
      return res.status(500).json({message: "Blog not Found"})
    }

    return res.status(200).json({ message: "Delete success" });
  } catch (error) {
    console.log(error);
  }
}