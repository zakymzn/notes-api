const Note = require("../models/note");

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({
      title,
      content,
      UserId: req.user.id, // Menggunakan ID user dari token
    });
    res.status(201).json(note);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menambahkan catatan", error: error.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({ where: { UserId: req.user.id } });
    res.json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil catatan", error: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      where: {
        id: req.params.id,
        UserId: req.user.id, // Pastikan hanya mengambil catatan milik user
      },
    });

    if (!note) {
      return res.status(404).json({ message: "Catatan tidak ditemukan" });
    }
    res.json(note);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil catatan", error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findOne({
      where: { id: req.params.id, UserId: req.user.id },
    });

    if (!note) {
      return res.status(404).json({ message: "Catatan tidak ditemukan" });
    }

    note.title = title;
    note.content = content;
    await note.save();

    res.json({ message: "Catatan diperbarui", note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal memperbarui catatan", error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      where: { id: req.params.id, UserId: req.user.id },
    });

    if (!note) {
      return res.status(404).json({ message: "Catatan tidak ditemukan" });
    }

    await note.destroy();
    res.json({ message: "Catatan dihapus" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus catatan", error: error.message });
  }
};
