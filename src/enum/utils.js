function isThisEnum(val){
  for(let key in this){
    if(this[key]===val){
      return true
    }
  }
  return false
}

export {
  isThisEnum
}