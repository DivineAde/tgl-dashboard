import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { 
  Upload, 
  X, 
  ImagePlus, 
  Save, 
  ArrowLeft,
  DollarSign,
  Tag,
  Layers,
  FileText,
  AlertCircle
} from "lucide-react";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  images: existingImages,
  description: existingDescription,
  price: existingPrice,
  category: assignedCategory,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(assignedProperties || {});
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const createProduct = async (ev) => {
    ev.preventDefault();
    
    // Validation
    if (!title) {
      setFormError("Product name is required");
      return;
    }
    
    if (!price || price <= 0) {
      setFormError("Please enter a valid price");
      return;
    }
    
    setFormError("");
    setIsSaving(true);
    
    const data = { title, description, price, images, category, properties: productProperties };

    try {
      if (_id) {
        // Update existing product
        await axios.put(`/api/products/`, {...data, _id});
      } else {
        // Create new product
        await axios.post("/api/products", data);
      }
      router.push("/products");
    } catch (error) {
      console.error("Error saving product:", error);
      setFormError("Failed to save product. Please try again.");
      setIsSaving(false);
    }
  };

  const uploadImages = async (ev) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      try {
        const res = await axios.post("/api/upload", data);
        setImages((oldImages) => [...oldImages, ...res.data.links]);
      } catch (error) {
        console.error("Error uploading images:", error);
      }

      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const updateImagesOrder = (images) => {
    setImages(images);
  };

  function setProductProp(propName, value) {
    setProductProperties(prev => {
      const newProductProps = {...prev};
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  // Using optional chaining operator
  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo?.properties || []);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id);
      propertiesToFill.push(...parentCat?.properties || []);
      catInfo = parentCat;
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => router.push("/products")}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {_id ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
        <button
          type="button"
          onClick={createProduct}
          disabled={isSaving}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all"
        >
          {isSaving ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </div>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              Save Product
            </>
          )}
        </button>
      </div>

      {formError && (
        <div className="mb-6 flex items-center p-4 text-red-800 border-l-4 border-red-500 bg-red-50 rounded-md">
          <AlertCircle className="w-5 h-5 mr-2" />
          <p>{formError}</p>
        </div>
      )}

      <form onSubmit={createProduct}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Layers className="w-4 h-4 mr-2" />
                Category
              </label>
              <select 
                value={category} 
                onChange={(ev) => setCategory(ev.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Uncategorized</option>
                {categories.length > 0 && categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {propertiesToFill.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Product Properties</h3>
                <div className="grid grid-cols-1 gap-4">
                  {propertiesToFill.map(p => (
                    <div key={p.name} className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-500 mb-1 capitalize">
                        {p.name}
                      </label>
                      <select 
                        value={productProperties[p.name]} 
                        onChange={ev => setProductProp(p.name, ev.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select {p.name}</option>
                        {p.values.map(v => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Price
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(ev) => setPrice(ev.target.value)}
                  className="w-full border border-gray-300 rounded-md pl-7 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <ImagePlus className="w-4 h-4 mr-2" />
                Product Images
              </label>
              <div className="border border-gray-300 border-dashed rounded-md p-4">
                <ReactSortable
                  list={images}
                  className="grid grid-cols-3 gap-2 mb-3"
                  setList={updateImagesOrder}
                >
                  {images.map((link, index) => (
                    <div key={link} className="relative group">
                      <img 
                        src={link} 
                        alt="Product" 
                        className="w-full h-24 object-cover rounded-md" 
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </ReactSortable>

                <div className="flex justify-center">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {isUploading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="ml-2 text-sm text-gray-500">Uploading...</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 mb-1 text-gray-500" />
                          <p className="mb-1 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                        </>
                      )}
                    </div>
                    <input 
                      type="file" 
                      className="hidden"
                      onChange={uploadImages}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Product Description
          </label>
          <textarea
            placeholder="Describe your product in detail..."
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            rows="6"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </form>
    </div>
  );
}