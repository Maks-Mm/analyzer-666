import mongoose from 'mongoose';

const ArticleGeneralisationSchema = new mongoose.Schema({
    content: String,
    siteName: String,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
