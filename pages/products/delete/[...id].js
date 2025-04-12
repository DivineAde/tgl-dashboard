import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AlertTriangle, ArrowLeft, Trash, XCircle, Check } from "lucide-react";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/products?id=${id}`);
        setProductInfo(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product information. The product might have been removed or you don't have permission to view it.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  function goBack() {
    router.push('/products');
  }

  async function deleteProduct() {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/products?id=${id}`);
      // Short delay to show the deletion state before redirecting
      setTimeout(() => {
        router.push({
          pathname: '/products',
          query: { deleted: productInfo?.title }
        });
      }, 500);
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product. Please try again.");
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading product information...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center text-red-500 mb-4">
            <XCircle className="h-6 w-6 mr-2" />
            <h2 className="text-lg font-medium">Error</h2>
          </div>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={goBack}
            className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto my-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-red-50 p-5 border-b border-red-100">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-full mr-4">
                <Trash className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h1 className="text-lg font-medium text-gray-800">Confirm Deletion</h1>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start mb-6">
              <div className="bg-amber-100 p-1 rounded-full mr-3 mt-0.5">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-gray-800 font-medium mb-1">Are you sure you want to delete this product?</p>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold text-gray-800">"{productInfo?.title}"</span> will be 
                  permanently removed from your inventory, including all its data and images.
                </p>
              </div>
            </div>

            {productInfo?.images && productInfo.images.length > 0 && (
              <div className="border border-gray-200 rounded-md p-3 mb-6 bg-gray-50">
                <p className="text-xs uppercase text-gray-500 font-medium mb-2">Product Preview</p>
                <div className="flex items-center">
                  <img
                    src={productInfo.images[0]}
                    alt={productInfo.title}
                    className="w-16 h-16 object-cover rounded-md mr-3 border border-gray-200 bg-white"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{productInfo.title}</h3>
                    {productInfo.price && (
                      <p className="text-sm text-gray-600">${parseFloat(productInfo.price).toFixed(2)}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={deleteProduct}
                disabled={isDeleting}
                className={`flex-1 flex items-center justify-center py-2.5 px-4 rounded-md transition-colors ${
                  isDeleting 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {isDeleting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash className="h-4 w-4 mr-2" />
                    Yes, Delete
                  </>
                )}
              </button>
              <button
                onClick={goBack}
                disabled={isDeleting}
                className="flex-1 flex items-center justify-center py-2.5 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button 
            onClick={goBack}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="h-3 w-3 mr-1" />
            Back to Products
          </button>
        </div>
      </div>
    </Layout>
  );
}