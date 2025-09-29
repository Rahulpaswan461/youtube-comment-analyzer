import express from "express"
import { handleCommentAnalysis } from "../controllers/handleCommentAnalysis.js"

const router = express.Router()

router.post("/analyze", handleCommentAnalysis)

export default router