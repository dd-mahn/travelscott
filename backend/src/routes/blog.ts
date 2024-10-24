import express from "express"
import * as blogController from "src/controllers/BlogControllers/BlogControllers"
import { validateRequest } from "src/utils/validation/validationMiddleware"
import { blogSchema } from "src/utils/validation/validationSchemas"

const router = express.Router()

router.post("/", validateRequest(blogSchema), blogController.createBlog)
router.get("/", blogController.getBlogs)
router.get("/:id", blogController.getBlogById)
router.put("/:id", validateRequest(blogSchema), blogController.updateBlog)
router.delete("/:id", blogController.deleteBlog)

export default router