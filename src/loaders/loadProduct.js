export async function loadProduct({ params }) {
  const res = await fetch(`/api/products/${params.productId}`);
  if (!res.ok) {
    throw new Response('Product not found', { status: 404 });
  }
  return res.json();
}