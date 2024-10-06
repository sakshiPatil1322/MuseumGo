const user = require('../models/Booking');
async function handleFindUser(req,res){
    const {key} = req.body
    const currentUser = await user.findOne({uniqueKey:key});
    res.render('adminWebHandle',{user:req.session.user,currentUser});
}

module.exports={
    handleFindUser,
}