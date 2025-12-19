// Get current user profile
export const getCurrentUser = async (req, res, next) => {
    try {
        res.json({
            success: true,
            data: req.user,
        });
    } catch (error) {
        next(error);
    }
};

// Update user profile
export const updateUserProfile = async (req, res, next) => {
    try {
        const { name, imageUrl } = req.body;
        const userId = req.user._id;

        const updateData = {};
        if (name) updateData.name = name;
        if (imageUrl) updateData.imageUrl = imageUrl;

        const user = await req.user.constructor.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};
