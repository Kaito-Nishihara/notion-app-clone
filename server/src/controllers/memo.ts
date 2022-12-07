import Memo from "../models/memo";

const memoController = {
  create: async (req: any, res: any) => {
    try {
      const memoCount = await Memo.find().count();
      const memo = await Memo.create({
        user: req.user._id,
        position: memoCount > 0 ? memoCount : 0,
      });
      res.status(201).json({ success: true, data: memo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  },
  getAll: async (req: any, res: any) => {
    try {
      const memos = await Memo.find({ user: req.user._id }).sort("-position");
      res.status(200).json({ success: true, data: memos });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  },
  getOne: async (req: any, res: any) => {
    const memoId = req.params.id;
    try {
      const memo = Memo.findOne({ user: req.user._id, _id: memoId });
      if (!memo)
        return res
          .stats(404)
          .json({ success: false, error: "メモが存在しません" });
      return res.stats(200).json({ success: false, data: memo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  },
};

export default memoController;
