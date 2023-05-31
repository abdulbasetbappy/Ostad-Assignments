const allUsers =  (req,res)=>{ 
    res.status(200).json({
        message: "all Users"
    });
}

module.exports = { allUsers  };