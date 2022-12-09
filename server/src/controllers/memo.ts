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
    const { memoId } = req.params;
    try {
      const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
      if (!memo) {
        return res
          .status(404)
          .json({ success: false, error: "メモが存在しません" });
      }
      return res.status(200).json({ success: false, data: memo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  },
  update: async (req: any, res: any) => {
    const { memoId } = req.params;
    const { title, description } = req.params;

    try {
      if (title === "") req.body.title = "無題";
      if (description === "")
        req.body.description = "ここに自由に記入してください";
      const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
      if (!memo) {
        return res
          .status(404)
          .json({ success: false, error: "メモが存在しません" });
      }
      const updateMemo = await Memo.findByIdAndUpdate(memoId, {
        $set: req.body,
      });
      return res.status(200).json({ success: true, data: updateMemo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  },
  delete: async (req: any, res: any) => {
    const { memoId } = req.params;
    try {
      const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
      if (!memo) {
        return res
          .status(404)
          .json({ success: false, error: "メモが存在しません" });
      }
      await Memo.deleteOne({ _id: memoId });
      return res
        .status(200)
        .json({ success: true, data: "メモを削除しました" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  },
};

export default memoController;
