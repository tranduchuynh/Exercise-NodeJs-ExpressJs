module.exports.postCreate = (req, res, next) => {
  const errors = [];
  if(!req.body.name || req.body.name.length > 30) {
     errors.push("Name is required and less than 30");
  }
  
  if(!req.body.phone){
    errors.push("Phone is required.");
  }
  
  console.log("erors", errors)
  
  if(errors.length) {
    res.render("users/create", {
      errors,
      values: req.body
    });
    return;
  }
  
  next();
}