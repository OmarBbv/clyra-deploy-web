const asyncHandler = require("express-async-handler");
const Lessons = require("../models/lessonModel");
const Story = require("../models/storyModel");

const createLessons = asyncHandler(async (req, res) => {
  const { name, description, images } = req.body;

  try {
    const newLessons = new Lessons({
      name,
      description,
      images,
    });

    const savedLesson = await newLessons.save();

    res.status(201).json({
      success: true,
      message: "Ders Eklendi!",
      data: savedLesson,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Bu isimde bir ders zaten mevcut!",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Bir hata oluştu!",
      error: error.message || "Sunucu hatası",
    });
  }
});

const getLessonsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const lessons = await Lessons.findById(id);

  if (!lessons) {
    return res.status(404).json({
      success: false,
      message: "Ders Bulunamadı!",
    });
  }

  res.status(200).json({
    success: true,
    message: "Ders Bulundu!",
    data: lessons,
  });
});

const getAllLessons = asyncHandler(async (req, res) => {
  const { title, page = 1, limit = 10 } = req.query;
  const filter = title ? { title: { $regex: title, $options: "i" } } : {};

  const totalLessons = await Lessons.countDocuments(filter);

  const allLessons = await Lessons.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Tüm Dersler Getirildi!",
    data: allLessons,
    pagination: {
      totalLessons,
      totalPages: Math.ceil(totalLessons / limit),
      currentPage: Number(page),
      limit: Number(limit),
    },
  });
});

const updateLesson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, image, tags } = req.body;

  const lesson = await Lessons.findById(id);
  if (!lesson) {
    return res.status(404).json({
      success: false,
      message: "Ders bulunamadı.",
    });
  }

  lesson.name = name || lesson.name;
  lesson.description = description || lesson.description;
  lesson.image = image || lesson.image;
  lesson.tags = tags || lesson.tags;

  const updatedLesson = await lesson.save();

  res.status(200).json({
    success: true,
    message: "Ders güncellendi!",
    data: updatedLesson,
  });
});

const getFilteredLessons = asyncHandler(async (req, res) => {
  const { filter } = req.query;


  const queryFilter = filter
    ? { name: { $regex: filter, $options: 'i' } }  
    : {}; 

  const filteredLessons = await Lessons.find(queryFilter);

  res.status(200).json({
    success: true,
    message: "Filtrelenmiş Dersler Getirildi!",
    data: filteredLessons,
  });
});

const deleteLesson = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const findLesson = await Lessons.findById(id);
  if (!findLesson) {
    return res.status(404).json({
      success: false,
      message: "Ders bulunamadı.",
    });
  }

  await Story.deleteMany({ lessonId: id });

  await Lessons.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Ders ve ona ait hikayeler başarıyla silindi.",
  });
});

module.exports = {
  createLessons,
  getLessonsById,
  getAllLessons,
  updateLesson,
  deleteLesson,
  getFilteredLessons
};
