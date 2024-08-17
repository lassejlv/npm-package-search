export const GET = async (req: Request, { params }: { params: { package: string } }) => {
  const pkg = params.package;

  return Response.redirect(new URL(`/pkg/${pkg}`, req.url).toString(), 301);
};
