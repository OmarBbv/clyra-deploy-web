const { marked } = require("marked");
const asyncHandler = require("express-async-handler");
const Story = require("../models/storyModel");
const Search = require("../models/searchModel");

const createStory = asyncHandler(async (req, res) => {
  const { title, description, content, tags, lessonId, images } = req.body;

  const htmlContent = marked(content);

  const newStory = new Story({
    title,
    description,
    content: htmlContent,
    tags,
    lessonId,
    images,
  });

  const savedStory = await newStory.save();

  res.status(201).json({
    success: true,
    message: "Hikaye başarıyla oluşturuldu!",
    data: savedStory,
  });
});

const updateStory = asyncHandler(async (req, res) => {
  const { content, tags, lessonId } = req.body;
  const { id } = req.params;

  try {
    const htmlContent = marked(content);
    const updatedStory = await Story.findByIdAndUpdate(
      id,
      {
        content: htmlContent,
        tags,
        lessonId,
      },
      { new: true, runValidators: true }
    );

    if (!updatedStory) {
      return res.status(404).json({
        success: false,
        message: "Hikaye bulunamadı!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hikaye başarıyla güncellendi!",
      data: updatedStory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hikaye güncellenirken bir hata oluştu.",
      error: error.message,
    });
  }
});

const getStoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Hikaye bulunamadı!",
      });
    }

    story.content = marked(story.content);
    story.views += 1;

    await story.save();

    res.status(200).json({
      success: true,
      message: "Hikaye başarıyla alındı!",
      data: story,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hikaye alınırken bir hata oluştu.",
      error: error.message,
    });
  }
});

const getAllStory = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const title = req.query.title;

    const filter = title ? { title: { $regex: title, $options: "i" } } : {};

    const totalStories = await Story.countDocuments(filter);

    const allStories = await Story.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    allStories.forEach((story) => {
      story.content = marked(story.content);
    });

    const totalPages = Math.ceil(totalStories / limit);

    res.status(200).json({
      success: true,
      message: "Hikayeler başarıyla alındı!",
      data: allStories,
      pagination: {
        totalStories,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hikayeleri alırken bir hata oluştu.",
      error: error.message,
    });
  }
});

const getStoriesByLessonId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const stories = await Story.find({ lessonId: id });
    res.status(200).json({
      success: true,
      message: "Hikayeler başarıyla alındı!",
      data: stories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hikayeler alınırken bir hata oluştu.",
      error: error.message,
    });
  }
});

const allSearch = asyncHandler(async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res
        .status(400)
        .json({ message: "Arama için bir sorgu parametresi girin!" });
    }

    const results = await Story.find({
      $or: [
        { title: { $regex: title, $options: "i" } },
        { description: { $regex: title, $options: "i" } },
      ],
    }).exec();

    if (results.length > 0) {
      await Search.findOneAndUpdate(
        { query: title },
        { $inc: { count: 1 }, lastSearchedAt: new Date() },
        { upsert: true }
      );
    }

    res.status(200).json({
      success: true,
      message: `Aramanıza uygun ${results.length} sonuç bulundu.`,
      data: results,
    });
  } catch (error) {
    console.error("Hata:", error.message);
    res.status(500).json({ message: "Sunucu hatası!" });
  }
});

const getTopViewedStories = asyncHandler(async (req, res) => {
  try {
    const topStories = await Story.find()
      .sort({ views: -1 }) 
      .limit(5) 
      .select("title views"); 

    res.status(200).json({
      success: true,
      data: topStories, 
    });
  } catch (error) {
    console.error(error); 
    res.status(500).json({
      success: false,
      message: "Sunucuda bir hata oluştu. Lütfen tekrar deneyin.",
    });
  }
});

const searchStories = asyncHandler(async (req, res) => {
  const query = req.query.query;

  console.log("Arama sorgusu:", query);

  await Search.findOneAndUpdate(
    { query },
    { $inc: { count: 1 }, lastSearchedAt: new Date() },
    { new: true, upsert: true }
  );

  const stories = await Story.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ],
  });

  console.log("Bulunan hikayeler:", stories);

  res.json(stories);
});


module.exports = {
  createStory,
  getAllStory,
  getStoryById,
  updateStory,
  getStoriesByLessonId,
  allSearch,
  getTopViewedStories,
  searchStories
};
