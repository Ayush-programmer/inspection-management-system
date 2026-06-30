const sanitizeUser = (user) => {
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
};

export default sanitizeUser;