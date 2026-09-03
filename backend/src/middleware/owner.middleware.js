import prisma from "../config/prisma.js";

export function requireOwnership(
  modelName,
  ownerField,
  notFoundMsg = "Resource not found",
) {
  return async (req, res, next) => {
    try {
      const resource = await prisma[modelName].findUnique({
        where: { id: req.params.id },
      });

      if (!resource) return res.status(404).json({ message: notFoundMsg });

      if (resource[ownerField] !== req.user.id)
        return res.status(403).json({ messahe: "Unautorized action" });
      
      req.resource = resource;
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log("Error at requireOwnership middleware", error);
    }
  };
}
