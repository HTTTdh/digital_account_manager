const TaiSan = require("../services/tai_san");

const getTaiSan = async (req, res) => {
  try {
    const { idDanhMucTaiSan } = req.query;
    const results = await TaiSan.getTaiSan(req.query.idDanhMucTaiSan, req.user);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTaiSan = async (req, res) => {
  try {
    // req.body.id = 100;
    const newTaiSan = await TaiSan.addTaiSan(req.body, req.user);
    res.status(201).json(newTaiSan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateTaiSan = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTaiSan = await TaiSan.updateTaiSan(id, req.body, req.user);
    if (updatedTaiSan instanceof Error) {
      return res.status(404).json({ error: updatedTaiSan.message });
    }
    res.status(200).json(updatedTaiSan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteTaiSan = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TaiSan.deleteTaiSan(id, req.user);
    if (result instanceof Error) {
      return res.status(404).json({ error: result.message });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTaiSan, addTaiSan, updateTaiSan, deleteTaiSan };
