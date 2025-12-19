import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});

// Static method to find or create user from Clerk data
userSchema.statics.findOrCreateFromClerk = async function (clerkUser) {
    let user = await this.findOne({ clerkId: clerkUser.id });

    if (!user) {
        user = await this.create({
            clerkId: clerkUser.id,
            name: clerkUser.firstName && clerkUser.lastName
                ? `${clerkUser.firstName} ${clerkUser.lastName}`.trim()
                : clerkUser.username || 'User',
            email: clerkUser.emailAddresses[0]?.emailAddress || '',
            imageUrl: clerkUser.imageUrl || '',
        });
    }

    return user;
};

const User = mongoose.model('User', userSchema);

export default User;
