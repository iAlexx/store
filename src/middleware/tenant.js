function requireTenantContext(req, res, next) {
  const candidate = req.headers['x-store-id'] || req.params.storeId || req.query.storeId || req.body.storeId;
  if (!candidate) {
    return res.status(400).json({ message: 'storeId context is required' });
  }
  req.tenant = { storeId: Number(candidate) };
  return next();
}

module.exports = { requireTenantContext };
