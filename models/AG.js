import mongoose from "mongoose";

const ArticleGeneralizationsSchema = new mongoose.Schema({
  content: String,
  siteName: String,
});

export default mongoose.models.ArticleGeneralisation ||
  mongoose.model("ArticleGeneralisation", ArticleGeneralizationsSchema);
