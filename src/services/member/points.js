import { Points } from "@src/db/models";


class PointsService {
  static async createNewPointsRecording(data) {
    const points = await Points.create(data)
    return points
  }
}

export {
  PointsService
}