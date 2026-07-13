import { Router } from "express"
import { createProduct, updateProductDetails, deleteProduct, getProductById, getAllproduct, toggleIsAvailable, updateProductAvatar} from "../controllers/product.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware.js"
import { upload } from "../middlewares/multer.middlerware.js"

const router = Router();

router.route("/").get(getAllproduct)

router.route("/:productId").get(getProductById)

router.route("/").post(verifyJWT, authorizeRoles("vendor"), upload.single("avatar"), createProduct)

router.route("/:productId").patch(verifyJWT, authorizeRoles("vendor"), updateProductDetails)

router.route("/:productId").delete(verifyJWT, authorizeRoles("vendor"), deleteProduct)

router.route("/toggle-availability/:productId").patch(verifyJWT, authorizeRoles("vendor"), toggleIsAvailable)

router.route("/avatar/:productId").patch(verifyJWT, authorizeRoles("vendor"), upload.single("avatar"), updateProductAvatar)

export default router;