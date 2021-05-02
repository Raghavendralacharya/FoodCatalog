module.exports = {
    isEmpty :(input)=>{
        if(input == null || input == undefined){
            return true;
        } else if(typeof input == "string"){
            if (input.trim() == "") {
                return true;
            }
            return false;
        } else if(typeof input == "number"){
                return isNaN(val);
        } else if(typeof input == "boolean"){
            if(input == true || input == false){
                return false;
            }
            return true;
        } else if(typeof input == "object"){
            for (var key in input) {
                if (Object.prototype.hasOwnProperty.call(input, key)) {
                  return false;
                }
            }
            return true;
        }
    }
}