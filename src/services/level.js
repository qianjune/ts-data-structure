import Level from "../db/models/level"

class LevelService {
  static async create(data) {
    const result = await Level.create(data)
    return result
  }
  static async edit(data) {
    const { id } = data
    if (!LevelService.isExist(is)) {
      return null
    }
    const result = await Level.update({ data }, {
      where: {
        id
      }
    })
    return result[0] > 0
  }
  static async isExist(id) {
    const result = Level.findOne({
      where: {
        id
      }
    })
    if (result) {
      return true
    }
    return false
  }
}

export {
  LevelService
}