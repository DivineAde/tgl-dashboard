import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useState, useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";
import { TiEdit } from "react-icons/ti"; // Corrected import statement
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [image, setImage] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    // Check if image property exists before accessing it
    if (category.image) {
      setImage(category.image);
    } else {
      setImage([]); // Set to empty array if no image
    }
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          axios.delete("/api/categories?_id=" + _id);
          fetchCategories();
        }
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", value: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return prev.filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  const handleImageUpload = async (ev) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      try {
        const res = await axios.post("/api/upload", data);
        setImage((oldImages) => [...oldImages, ...res.data.links]);
      } catch (error) {
        console.error("Error uploading images:", error);
      }

      setIsUploading(false);
    }
  };

  const saveCategory = async (ev) => {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      image,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id; // Check if editedCategory exists before accessing its properties
      await axios.put("/api/categories", { ...data, _id: editedCategory._id });
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    setImage([]);
    fetchCategories();
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit Category ${editedCategory.name}`
          : "Create New Category"}
      </label>
      <form onSubmit={saveCategory} className="">
        <div className="flex gap-1">
          <input
            className=""
            type="text"
            placeholder="Enter Categories"
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
          <select
            className=""
            onChange={(ev) => setParentCategory(ev.target.value)}
            value={parentCategory}
          >
            <option value="">No parent Category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label>Photos</label>
          {image.length > 0 &&
            image.map((link) => (
              <div
                key={link}
                className="h-24 w-fit bg-white p-4 shadow-md rounded-lg border border-gray-200 mb-6"
              >
                <img src={link} alt={link} className="rounded-lg" />
              </div>
            ))}
        </div>

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
            onChange={handleImageUpload}
            multiple
            className="hidden"
          />
        </label>
        <div className="">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={index} className="flex gap-1 mb-2">
                <input
                  type="text"
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                  value={property.name}
                  placeholder="property name (example: colour)"
                  className="mb-0"
                />
                <input
                  type="text"
                  onChange={(ev) =>
                    handlePropertyValuesChange(
                      index,
                      property,
                      ev.target.value
                    )
                  }
                  value={property.values}
                  placeholder="value , comma separated"
                  className="mb-0"
                />
                <button
                  type="button"
                  className="btn-default"
                  onClick={() => removeProperty(index)}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1 ">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setProperties([]);
              }}
              className="btn-default"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-2">
          <thead className="">
            <tr>
              <td>Categories</td>
              <td>Parent Category</td>
              <td>Edit or Delete</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category.name}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td className="flex">
                    <button
                      className="btn-primary mr-1 flex items-center gap-1"
                      onClick={() => editCategory(category)}
                    >
                      <TiEdit /> {/* Fixed icon import */}
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="btn-primary flex items-center gap-1"
                    >
                      <BiTrash />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
