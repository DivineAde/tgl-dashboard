import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FiUpload } from "react-icons/fi";
import Spinner from "./Spinner";
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
  const router = useRouter();
  const [goToProduct, setGoToProduct] = useState(false);
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    if (goToProduct) {
      router.push("/products");
    }
  }, [goToProduct, router]);

  const createProduct = async (ev) => {
    ev.preventDefault();
    const data = { title, description, price, images, category, properties: productProperties };

    try {
      if (_id) {
        // Update existing product
        await axios.put(`/api/products/`, {...data, _id});
        console.log("Product updated successfully");
      } else {
        // Create new product
        await axios.post("/api/products", data);
        console.log("Product created successfully");
      }
      setGoToProduct(true);
    } catch (error) {
      console.error("Error saving product:", error);
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
    <form onSubmit={createProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Enter name of product"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />

      <label>Category</label>
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length && categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      {propertiesToFill.length > 0 && (
        <div>
          {propertiesToFill.map(p => (
            <div key={p.name} className="">
              <div key={p.name} className="capitalize">{p.name}</div>
              <select value={productProperties[p.name]} onChange={ev => setProductProp(p.name,ev.target.value)}>
                {p.values.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          list={images}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}
        >
          {images.map((link) => (
            <div key={link} className="h-24 bg-white p-4 shadow-md rounded-sm border border-gray-200">
              <img src={link} alt={link} className="rounded-lg" />
            </div>
          ))}
        </ReactSortable>

        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}

        <label className="w-24 h-24 md:w-32 flex justify-center items-center font-medium text-gray-800 rounded-lg cursor-pointer bg-white shadow-md border border-blue-600">
          <span>
            <FiUpload />
          </span>
          <div>Upload</div>
          <input
            type="file"
            name="file"
            onChange={uploadImages}
            className="hidden"
          />
        </label>
      </div>

      <label>Product Description</label>
      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />

      <label>Price</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />

      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
