import express from "express"
import * as blogController from "../controllers/BlogControllers"
import { validateRequest } from "../utils/validationMiddleware"
import { blogSchema } from "../utils/validationSchemas"

const router = express.Router()

router.post("/", validateRequest(blogSchema), blogController.createBlog)
router.get("/", blogController.getBlogs)
router.get("/:id", blogController.getBlogById)
router.put("/:id", validateRequest(blogSchema), blogController.updateBlog)
router.delete("/:id", blogController.deleteBlog)

export default router