const client = require("../db/redis").getClient();
const RedisService = require("../services/RedisService");

class RouteController {
  static async getHomePage(req, res, next) {
    try {
      const tasks = await RedisService.getList("tasks", 0, -1);
      const call = await RedisService.getHashMap("call");
      res.render("index", { tasks, call });
    } catch (error) {
      next(error);
    }
  }

  static async addTask(req, res, next) {
    try {
      const { task } = req.body;
      if (task && task.length > 0) await RedisService.listRPush("tasks", task);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req, res, next) {
    const { taskIndexes } = req.body;
    try {
      if (taskIndexes) {
        const tasks = await RedisService.getList("tasks", 0, -1);
        const newTasks = tasks.filter((task, index) => {
          if (taskIndexes.indexOf(String(index)) < 0) {
            return task;
          }
        });
        console.log(newTasks);
        await RedisService.listLTrim("tasks", tasks.length, tasks.length + 1);
        await RedisService.listRPush("tasks", newTasks);
      }
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }

  static async editCall(req, res, next) {
    try {
      const newCall = req.body;
      const args = [];

      Object.keys(newCall).map((key) => {
        args.push(key);
        args.push(newCall[key]);
      });
      await RedisService.setHashMap("call", args);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RouteController;
