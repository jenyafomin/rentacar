
// POST
export async function checkCategoryPost(req, res) {
  const { name } = req.body;
  if (!name) {
    return {code: 500, message: `invalid argument 'name'`};
  }
}
