export function errorHandler(err, req, res, next) {
  console.log("Erreur :", err);

  if (err.code === "P2025")
    return res.status(404).json({ message: "Resource not found" });
  if (err.code === "P2002")
    return res.status(409).json({ message: "Resource already exist" });
  if (err.code === "P2003")
    return res.status(400).json({ message: "Invalid reference" });
  if (err.code === "P2004")
    return res.status(404).json({ message: "Ressource not found" });
  if (err.code === "P2005")
    return res.status(404).json({ message: "Ressource not found" });
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
  res.status(500).json({ message: "Internal server error" });
}
