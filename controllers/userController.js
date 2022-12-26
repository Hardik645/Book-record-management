const User = require("../modals/user-modal");

//get all users
exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Users not found"
        });
    }
    res.status(200).json({
        success: true,
        message: users
    })
}
//get user by id
exports.getUsersById = async (req, res) => {
    const { id } = req.params;
    // const userById=id;
    const userById = await User.findById({ _id: id });

    if (!userById) {
        return res.status(404).json({
            success: false,
            message: "No user in db with this ID"
        });
    } else {
        return res.status(200).json({
            success: true,
            data: userById
        });
    }
};
//post user
exports.createNewUser = async (req, res) => {
    const { name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const result = await User.create({
        name, surname, email, subscriptionType, subscriptionDate
    });
    return res.status(201).json({
        success: true,
        message: result
    });
}
//put user by id
exports.updateUsersById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    // console.log({ ...data })
    const result = await User.findByIdAndUpdate(id, { ...data });
    return res.status(200).json({
        success: true,
        data: result
    });
};
//delete user by id
exports.deleteById = async (req, res) => {
    const { id } = req.params;
    const user = await User.deleteOne({ _id: id });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    return res.status(200).json({
        success: true,
        message: "Deleted the user successfully"
    })
}
//get Sub details
exports.getSubById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await User.findById(id);
        const subType = result.subscriptionType;
        const subDate =Math.floor(new Date(result.subscriptionDate)/(1000*60*60*24));
        const curDate =Math.floor(new Date()/(1000*60*60*24));

        let expDate=0;
            if (subType === "Basic") {
                expDate= subDate+90;
            }
            else if (subType === "Standard") {
                expDate= subDate+180;
            }
            else if (subType === "Premium") {
                expDate= subDate+365;
            }

        return res.status(200).json({
            suucess: true,
            message: {
                ...result._doc,
                SubscriptionExpired: curDate>expDate,
                DaysLeftForExpiration: curDate<expDate? expDate-curDate:0,
                Fine: curDate>expDate?100:0
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            success: false,
            message: "No user found with this id"
        });
    }
}